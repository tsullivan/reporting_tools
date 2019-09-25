import { Logger } from './lib/logger';
import { getFeature } from './feature';
import { registerRoutes } from './routes';

export function initPlugin(server): void {
  const logger = new Logger(server);
  logger.info('hello from reporting_tools plugin');

  const { kbnServer } = server.plugins.xpack_main.status.plugin;
  const { plugins: { task_manager: taskManager, xpack_main: xpackMainPlugin } } = server;

  if (xpackMainPlugin) {
    xpackMainPlugin.registerFeature(getFeature('reporting_tools'));
    registerRoutes(server, logger);
  }
}

