import { resolve } from 'path';
import { existsSync } from 'fs';
import { LegacyPluginSpec } from '../../src/legacy/plugin_discovery/types';
import { initPlugin } from './server/init';

export default function(kibana): LegacyPluginSpec {
  return new kibana.Plugin({
    require: ['elasticsearch'],
    name: 'reporting_tools',
    uiExports: {
      app: {
        title: 'Reporting Tools',
        description: 'This is a tools UI for Reporting',
        main: 'plugins/reporting_tools/app',
      },
      styleSheetPaths: [
        resolve(__dirname, 'public/app.scss'),
        resolve(__dirname, 'public/app.css'),
      ].find((p: string): boolean => existsSync(p)),
    },

    config(Joi): void {
      return Joi.object({
        enabled: Joi.boolean().default(true),
      }).default();
    },

    init: initPlugin,
  });
}
