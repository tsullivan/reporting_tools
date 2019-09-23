import { TaskManager } from '../../../x-pack/legacy/plugins/task_manager';
import { Logger } from './lib/logger';
import { fakeSuricataIngestTask } from './lib/suricata';

export function registerTaskDefinitions(server, taskManager: TaskManager, logger: Logger): void {

  taskManager.registerTaskDefinitions({
    ...fakeSuricataIngestTask(server, logger),
  });
}

