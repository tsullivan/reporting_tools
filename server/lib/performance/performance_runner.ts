import { Observable } from 'rxjs';
import { ConditionalHeaders } from '../../../../../x-pack/legacy/plugins/reporting/types';
import {
  ScreenshotObservableOpts,
  Screenshot,
  PerformanceMetrics,
} from '../../../../../x-pack/legacy/plugins/reporting/export_types/common/lib/screenshots/types';
import { LevelLogger } from '../../../../../x-pack/legacy/plugins/reporting/server/lib/level_logger';
import { screenshotsObservableFactory } from '../../../../../x-pack/legacy/plugins/reporting/export_types/common/lib/screenshots';
import { PreserveLayout } from '../../../../../x-pack/legacy/plugins/reporting/export_types/common/layouts/preserve_layout';

function getConditionals(server): ConditionalHeaders['conditions'] {
  const config = server.config();
  const [hostname, port, basePath, protocol] = [
    config.get('xpack.reporting.kibanaServer.hostname') || config.get('server.host'),
    config.get('xpack.reporting.kibanaServer.port') || config.get('server.port'),
    config.get('server.basePath'),
    config.get('xpack.reporting.kibanaServer.protocol') || server.info.protocol,
  ] as [string, number, string, string];
  return { hostname: hostname.toLowerCase(), port, basePath, protocol };
}

type PluginScreenshotObservable =  ({ logger, url, conditionalHeaders, layout, browserTimezone, }: ScreenshotObservableOpts) => Observable<{ metrics: PerformanceMetrics }>

export class PerformanceRunner {
  private logger: LevelLogger;
  private headerConditionals: ConditionalHeaders['conditions'];
  private getHeaders: () => ConditionalHeaders['headers'];
  private screenshotsObservable: PluginScreenshotObservable;

  public constructor(server, logger: LevelLogger) {
    this.logger = logger;
    this.headerConditionals = getConditionals(server);
    this.screenshotsObservable = screenshotsObservableFactory(server) as unknown as PluginScreenshotObservable;

    const config = server.config();
    this.getHeaders = (): ConditionalHeaders['headers'] => ({
      authorization: config.get('reporting_tools.pageLoadAuth'),
    });
  }

  public async run(url: string): Promise<Partial<PerformanceMetrics>> {
    this.logger.info('Launching browser...');

    return new Promise((resolve): object => {
      const screenLogger = this.logger.clone(['screenshots']);
      const layout = new PreserveLayout({ width: 1200, height: 900 });
      const headers = this.getHeaders();
      const conditionalHeaders = {
        headers,
        conditions: this.headerConditionals,
      };

      return this.screenshotsObservable({
        url,
        conditionalHeaders,
        layout,
        browserTimezone: 'UTC',
        logger: screenLogger,
      })
        .subscribe(
          ({ metrics }: TestResults): PerformanceMetrics => {
            resolve(metrics);
            return metrics;
          },
          (err: Error): void => {
            this.logger.error(err);
          },
          (): void => {
            this.logger.info('Test complete.');
          }
        );
    });
  }
}

interface TestResults {
  screenshots: Screenshot[];
  metrics: PerformanceMetrics;
}
