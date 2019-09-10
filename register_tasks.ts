import { TaskManager } from '../../x-pack/legacy/plugins/task_manager';
import {
  RunContext,
  CancellableTask,
  RunResult,
} from '../../x-pack/legacy/plugins/task_manager/task';
import { Logger } from './server/lib/logger';

export function registerTaskDefinitions(server, taskManager: TaskManager, logger: Logger): void {
  taskManager.registerTaskDefinitions({
    updateReportingStats: {
      // this will be a task that gets a summary of reporting stuff, cache as last state for later retrieval by an API caller
      type: 'xpack_kibana_reporting',
      title: 'Update Reporting Stats',
      createTaskRunner({ taskInstance: { params: taskParams, state: taskState } }: RunContext): CancellableTask {
        return {
          async run(): Promise<RunResult> {
            logger.info(`Task is running: ${JSON.stringify({ taskParams, taskState })}`);
            return {
              state: {
                stats: ['task manager'],
              },
            };
          },
          async cancel(): Promise<void> {
            throw new Error('Can\'t cancel updateReportingStats!');
          },
        };
      },
    },
  });
}

