import { Logger } from './lib/logger';
import { getExampleJson } from './lib/suricata';
import { getFeature } from './feature';
import { registerTaskDefinitions } from './register_tasks';
import { scheduleAutoTasks } from './schedule_auto';
import { registerRoutes } from './routes';

export function initPlugin(server): void {
  const logger = new Logger(server);

  logger.info('hello from reporting_schedulization plugin');

  const {
    plugins: { task_manager: taskManager, xpack_main: xpackMainPlugin },
  } = server;

  if (xpackMainPlugin) {
    xpackMainPlugin.registerFeature(getFeature('reporting_schedulization'));
    registerTaskDefinitions(server, taskManager, logger);
    registerRoutes(server);

    const { kbnServer } = server.plugins.xpack_main.status.plugin;
    kbnServer.afterPluginsInit((): void => {
      scheduleAutoTasks(taskManager, logger);
    });
  }
}

