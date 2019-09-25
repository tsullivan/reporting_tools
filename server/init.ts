import { Logger } from './lib/logger';
import { getFeature } from './feature';
import { registerRoutes } from './routes';

export function initPlugin(server): void {
  const logger = new Logger(server);
  logger.info('hello from reporting_tools plugin');

  const { plugins: { xpack_main: xpackMainPlugin } } = server;

  if (xpackMainPlugin) {
    xpackMainPlugin.registerFeature(getFeature('reporting_tools'));
    registerRoutes(server, logger);
  }
}

