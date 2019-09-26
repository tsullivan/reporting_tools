import { HeadlessChromiumDriverFactory } from '../../../../../x-pack/legacy/plugins/reporting/server/browsers/chromium/driver_factory';
import { LevelLogger } from '../../../../../x-pack/legacy/plugins/reporting/server/lib/level_logger';
import { PerformanceRunner } from './performance_runner';

export function getRunner(server, logger: LevelLogger): PerformanceRunner {
  return new PerformanceRunner(server, logger);
}
