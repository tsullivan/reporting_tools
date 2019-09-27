import { LevelLogger as Logger } from '../../../x-pack/legacy/plugins/reporting/server/lib/level_logger';
import { getFeature } from './feature';
import { registerRoutes } from './routes';

export function initPlugin(server): void {
  const serverLog = (tgs: string[], msg: string): void => server.log(tgs, msg);
  const logger = new Logger(serverLog, ['reporting-tools-plugin']);
  logger.info('hello from reporting_tools plugin');

  const { plugins: { xpack_main: xpackMainPlugin } } = server;

  if (xpackMainPlugin) {
    xpackMainPlugin.registerFeature(getFeature('reporting_tools'));
    registerRoutes(server, logger);
  }
}
