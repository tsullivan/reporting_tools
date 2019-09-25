import { HeadlessChromiumDriverFactory } from '../../../../../x-pack/legacy/plugins/reporting/server/browsers/chromium/driver_factory';
import { LevelLogger } from '../../../../../x-pack/legacy/plugins/reporting/server/lib/level_logger';
import { PerformanceRunner } from './performance_runner';

export interface PerformanceMetrics {
  pageUrl: string;
  timestamp: Date;
  puppeteer: {
    Timestamp: number;
    Documents: 8;
    Frames: 4;
    JSEventListeners: 476;
    Nodes: 646;
    LayoutCount: 11;
    RecalcStyleCount: 167;
    LayoutDuration: 0.071242;
    RecalcStyleDuration: 0.048641;
    ScriptDuration: 0.523818;
    TaskDuration: 2.138324;
    JSHeapUsedSize: 127920088;
  };
}

export function getRunner(server, logger: LevelLogger, browserFactory: HeadlessChromiumDriverFactory): PerformanceRunner {
  return new PerformanceRunner(server, logger, browserFactory);
}
