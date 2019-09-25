export function getFeature(featureId: string): object {
  return {
    id: featureId,
    name: 'reporting-tools',
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
