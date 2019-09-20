import { registerListReports } from './list_reports';
import { registerSampleData } from './sample_data';

export function registerRoutes(server): void {
  const routes = [
    registerListReports,
    registerSampleData,
  ];

  routes.forEach((route): void => {
    route(server);
  });
}
