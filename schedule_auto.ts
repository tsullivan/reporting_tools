import { Logger } from './server/lib/logger';
import { TaskManager } from '../../x-pack/legacy/plugins/task_manager/task_manager';

export async function scheduleAutoTasks(taskManager: TaskManager, logger: Logger): Promise<void> {
  const existingTask = await taskManager.fetch({
    query: { match: { _id: 'xpack_kibana_reporting_updateReportingStats'} },
  });

  if (existingTask.docs.length === 0) {
    try {
      await taskManager.schedule({
        id: 'xpack_kibana_reporting_updateReportingStats',
        taskType: 'updateReportingStats',
        params: {},
        state: {},
      });
      logger.info('task was scheduled');
    } catch(err) {
      logger.info('task schedulnmg failede');
    }
  }
}
