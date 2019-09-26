import { HeadlessChromiumDriverFactory } from '../../../../../x-pack/legacy/plugins/reporting/server/browsers/chromium/driver_factory';
import { LevelLogger } from '../../../../../x-pack/legacy/plugins/reporting/server/lib/level_logger';
import { PerformanceRunner } from './performance_runner';

export interface PerformanceMetrics {
  pageUrl: string;
  timestamp: Date;
  puppeteer: {
    Timestamp: number;
    Documents: number;
    Frames: number;
    JSEventListeners: number;
    Nodes: number;
    LayoutCount: number;
    RecalcStyleCount: number;
    LayoutDuration: number; // float
    RecalcStyleDuration: number; // float
    ScriptDuration: number; // float
    TaskDuration: number; // float
    JSHeapUsedSize: number;
  };
}

export function getRunner(server, logger: LevelLogger): PerformanceRunner {
  return new PerformanceRunner(server, logger);
}
