import { registerListReports } from './list_reports';
import { registerSampleData } from './sample_data';
import { registerPerformanceTesting } from './performance';

export function registerRoutes(server, logger): void {
  const routes = [registerListReports, registerSampleData, registerPerformanceTesting];

  routes.forEach((route): void => {
    route(server, logger);
  });
}
