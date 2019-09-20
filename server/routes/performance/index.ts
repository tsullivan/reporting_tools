import { Browser } from 'puppeteer';
import { createBrowserDriverFactory } from '../../../../../x-pack/legacy/plugins/reporting/server/browsers';
import { Logger as LevelLogger } from '../../../../../x-pack/legacy/plugins/reporting/types';
import { Logger } from '../../lib/logger';

export async function registerPerformanceTesting(server, logger: Logger): Promise<void> {
  const browserFactory = await createBrowserDriverFactory(server);

  // get chromium instance
  server.route({
    path: '/api/reporting-performance/run',
    method: 'POST',
    async handler() {
    return browserFactory
      .test({ viewport: { width: 800, height: 600 } }, logger as unknown as LevelLogger)
      .then((browser: Browser | null) => {
        if (browser && browser.close) {
          logger.info('The browser has opened. Closing now...');
          browser.close();
        } else {
          throw new Error('Could not close browser client handle!');
        }
      })
      .then(() => ({ ok: true }));
    },
  });
}

