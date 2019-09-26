import * as Rx from 'rxjs';
import { catchError, concatMap, take } from 'rxjs/operators';
import { ConditionalHeaders } from '../../../../../x-pack/legacy/plugins/reporting/types';
import { ScreenshotObservableOpts } from '../../../../../x-pack/legacy/plugins/reporting/export_types/common/lib/screenshots/types';
import { LevelLogger } from '../../../../../x-pack/legacy/plugins/reporting/server/lib/level_logger';
import { HeadlessChromiumDriverFactory } from '../../../../../x-pack/legacy/plugins/reporting/server/browsers/chromium/driver_factory';
import { HeadlessChromiumDriver } from '../../../../../x-pack/legacy/plugins/reporting/server/browsers/chromium/driver/chromium_driver';
import { screenshotsObservableFactory } from '../../../../../x-pack/legacy/plugins/reporting/export_types/common/lib/screenshots';
import { PreserveLayout } from '../../../../../x-pack/legacy/plugins/reporting/export_types/common/layouts/preserve_layout';
import { PerformanceMetrics } from './';

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

export class PerformanceRunner {
  private logger: LevelLogger;
  private headerConditionals: ConditionalHeaders['conditions'];
  private getHeaders: () => ConditionalHeaders['headers'];
  private screenshotsObservable: ({ logger, url, conditionalHeaders, layout, browserTimezone, }: ScreenshotObservableOpts) => Rx.Observable<void>;

  public constructor(server, logger: LevelLogger) {
    this.logger = logger;
    this.headerConditionals = getConditionals(server);
    this.screenshotsObservable = screenshotsObservableFactory(server);

    const config = server.config();
    this.getHeaders = (): ConditionalHeaders['headers'] => ({
      authorization: config.get('reporting_tools.pageLoadAuth'),
    });
  }

  public async run(url: string): Promise<Partial<PerformanceMetrics>> {
    this.logger.info('Launching browser...');

    return new Promise((resolve): object => {
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
        logger: this.logger,
      }).pipe(
        take(1),
        concatMap((data: any) => {
          resolve(data);
          return data;
        }),
        catchError(err => {
          this.logger.error(err);
          throw err;
        })
      );
    });
  }
}
