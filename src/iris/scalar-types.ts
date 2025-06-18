export type UpsertFormsFromJsonData = UpsertedFormDescriptor | UpsertedFormDescriptor[];
export type UpsertedFormDescriptor = {
  availability: UpsertedFormDescriptorAvailability | UpsertedFormDescriptorAvailability[];
  code: string;
  consumer: string;
  description: null | string;
  id: string;
  kind: string;
  name: string;
  title: string;
  version: string;
};
export type UpsertedFormDescriptorAvailability = {
  facility: string;
};

export type UpsertSironaPermissionsFromJsonData = UpsertSironaPermissionDescriptor | UpsertSironaPermissionDescriptor[];
export type UpsertSironaPermissionDescriptor = {
  code: string;
  description: null | string;
  facilities: null | string[];
  name: string;
  roles: null | string[];
};

export type UpsertSironaRolesFromJsonData = UpsertSironaRoleDescriptor | UpsertSironaRoleDescriptor[];
export type UpsertSironaRoleDescriptor = {
  code: string;
  description: null | string;
  name: string;
};
