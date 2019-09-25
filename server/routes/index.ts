import { registerPerformanceTesting } from './performance';

export function registerRoutes(server, logger): void {
  const routes = [registerPerformanceTesting];

  routes.forEach((route): void => {
    route(server, logger);
  });
}
