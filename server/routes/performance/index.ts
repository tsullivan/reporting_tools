import { Browser } from 'puppeteer';
import { createBrowserDriverFactory } from '../../../../../x-pack/legacy/plugins/reporting/server/browsers';
import { LevelLogger } from '../../../../../x-pack/legacy/plugins/reporting/server/lib/level_logger';

interface ApiResult {
  ok: boolean;
}

export async function registerPerformanceTesting(server, logger: LevelLogger): Promise<void> {
  const browserFactory = await createBrowserDriverFactory(server);

  // get chromium instance
  server.route({
    path: '/api/reporting-performance/run',
    method: 'POST',
    async handler(): Promise<ApiResult> {
      return browserFactory
        .test({ viewport: { width: 800, height: 600 } }, logger)
        .then((browser: Browser | null): void => {
          if (browser && browser.close) {
            logger.info('The browser has opened. Closing now...');
            console.log(browser.close());
          } else {
            throw new Error('Could not close browser client handle!');
          }
        })
        .then((): ApiResult => ({ ok: true }));
    },
  });
}
