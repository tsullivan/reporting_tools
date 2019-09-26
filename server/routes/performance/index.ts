import * as Joi from 'joi';
import { boomify } from 'boom';
import { Request } from 'hapi';
import { LevelLogger } from '../../../../../x-pack/legacy/plugins/reporting/server/lib/level_logger';
import { PerformanceMetrics } from '../../../../../x-pack/legacy/plugins/reporting/export_types/common/lib/screenshots/types';
import { getRunner } from '../../lib/performance';

export async function registerPerformanceTesting(server, logger: LevelLogger): Promise<void> {
  const runner = getRunner(server, logger);

  // get chromium instance
  server.route({
    path: '/api/reporting-performance/run',
    method: 'POST',
    config: {
      validate: {
        payload: Joi.object({
          'test_url': Joi.string().required(),
        }).required(),
      },
    },
    handler(req: Request): Promise<PerformanceMetrics | void> {
      const { test_url: testUrl } = req.payload as { test_url: string };
      return runner
        .run(testUrl)
        .then((metrics: PerformanceMetrics): PerformanceMetrics => metrics)
        .catch((err): void => {
          throw boomify(err);
        });
    },
  });
}
