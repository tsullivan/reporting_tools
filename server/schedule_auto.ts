import { Logger } from './lib/logger';
import { TaskManager } from '../../../x-pack/legacy/plugins/task_manager/task_manager';

export async function scheduleAutoTasks(taskManager: TaskManager, logger: Logger): Promise<void> {
  const existingTask = await taskManager.fetch({
    query: { match: { _id: 'xpack_kibana_reporting_updateReportingStats'} },
  });

  if (existingTask.docs.length === 0) {
    try {
      const task = await taskManager.schedule({
        id: 'xpack_kibana_reporting_updateReportingStats',
        taskType: 'updateReportingStats',
        params: {},
        state: {},
      });
      logger.info(`Task was scheduled: ${task.id}`);

    } catch(err) {
      logger.info('task schedulnmg failede');
    }
  }
}
