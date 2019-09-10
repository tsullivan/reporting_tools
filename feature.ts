import { i18n } from '@kbn/i18n';

export function getFeature(featureId: string): object {
  return {
    id: featureId,
    name: i18n.translate('reportingSchedulizations.featureRegistry.featureName', {
      defaultMessage: 'reporting-schedulization',
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
  };
}
