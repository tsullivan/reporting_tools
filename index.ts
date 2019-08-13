import { resolve } from 'path';
import { existsSync } from 'fs';
import { i18n } from '@kbn/i18n';

export default function(kibana): void {
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

    async init(server): Promise<void> {
      const xpackMainPlugin = server.plugins.xpack_main;
      if (xpackMainPlugin) {
        const featureId = 'reporting_tools';

        xpackMainPlugin.registerFeature({
          id: featureId,
          name: i18n.translate('reportingTools.featureRegistry.featureName', {
            defaultMessage: 'reporting-tools',
          }),
          navLinkId: featureId,
          icon: 'questionInCircle',
          app: [featureId, 'kibana'],
          catalogue: [],
          privileges: {
            all: {
              api: [],
              savedObject: {
                all: [],
                read: [],
              },
              ui: ['show'],
            },
            read: {
              api: [],
              savedObject: {
                all: [],
                read: [],
              },
              ui: ['show'],
            },
          },
        });
      }
    },
  });
}
