interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Business Owner'],
  customerRoles: [],
  tenantRoles: ['Business Owner', 'Garage Manager', 'Mechanic', 'Accountant'],
  tenantName: 'Garage',
  applicationName: 'garage invoice system',
  addOns: [],
};
