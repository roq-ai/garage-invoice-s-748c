const mapping: Record<string, string> = {
  garages: 'garage',
  invoices: 'invoice',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
