import { getExampleJson } from '../lib/suricata';
import { ExampleData } from '../lib/suricata/index.d';

export function registerSampleData(server): void {
  server.route({
    path: '/api/reporting-sampledata',
    method: 'GET',
    async handler(): Promise<ExampleData> {
      return getExampleJson();
    },
  });
}

