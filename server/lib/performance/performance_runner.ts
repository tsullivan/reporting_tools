import { Browser } from 'puppeteer';
import { HeadlessChromiumDriverFactory } from '../../../../../x-pack/legacy/plugins/reporting/server/browsers/chromium/driver_factory';
import { LevelLogger } from '../../../../../x-pack/legacy/plugins/reporting/server/lib/level_logger';
import { PerformanceMetrics } from './';

export class PerformanceRunner {
  private logger: LevelLogger;
  private browserFactory: HeadlessChromiumDriverFactory;

  public constructor(server, logger: LevelLogger, browserFactory: HeadlessChromiumDriverFactory) {
    this.logger = logger;
    this.browserFactory = browserFactory;
  }

  public async run(url: string): Promise<PerformanceMetrics> {
    this.logger.info('Launching browser...');
    const browser: Browser = await this.browserFactory.test(
      { viewport: { width: 800, height: 600 } },
      this.logger
    );

    // TODO intercept requests to set auth headers and get taken to login page
    try {
      const page = await browser.newPage();
      this.logger.info('Opening URL...');
      await page.goto(url, {
        timeout: 30000,
        waitUntil: 'networkidle0',
      });

      const pageMetrics = await page.metrics();
      this.logger.info('Closing browser...');
      await browser.close();

      return {
        pageUrl: page.url(),
        timestamp: new Date(),
        puppeteer: pageMetrics,
      };
    } catch(err) {
      this.logger.error(err);
      throw err;
    }
  }
}
