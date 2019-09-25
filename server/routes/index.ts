import { registerSampleData } from './sample_data';
import { registerPerformanceTesting } from './performance';

export function registerRoutes(server, logger): void {
  const routes = [registerSampleData, registerPerformanceTesting];

  routes.forEach((route): void => {
    route(server, logger);
  });
}
