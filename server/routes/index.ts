import { registerListReports } from './list_reports';

export function registerRoutes(server): void {
  const routes = [
    registerListReports,
  ];

  routes.forEach((route): void => {
    route(server);
  });
}
