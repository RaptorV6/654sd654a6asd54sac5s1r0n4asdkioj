import type {
  UpsertFormsFromJsonData,
  UpsertSironaPermissionsFromJsonData,
  UpsertSironaRolesFromJsonData,
} from "./scalar-types";

import * as scalarCodec from "./scalar-common-codecs";

export const customScalars = {
  // Int: number,
  // Float: number,
  // String: string,
  // Boolean: boolean,
  // ID: string,
  CmsDate: scalarCodec.date(),
  CmsDateTime: scalarCodec.dateTime(),
  CmsI18NLocaleCode: scalarCodec.ident<string>("string"),
  CmsJSON: scalarCodec.json(),
  Date: scalarCodec.json(),
  DateTime: scalarCodec.dateTime(),
  FormSubmissionData: scalarCodec.json(),
  NaiveDate: scalarCodec.date(),
  NaiveTime: scalarCodec.time(),
  Time: scalarCodec.time(),
  UpsertFormsFromJsonData: scalarCodec.json<UpsertFormsFromJsonData>("UpsertFormsFromJsonData"),
  UpsertSironaPermissionDescriptor: scalarCodec.json<UpsertSironaPermissionsFromJsonData>(
    "UpsertSironaPermissionsFromJsonData",
  ),
  UpsertSironaRolesFromJsonData: scalarCodec.json<UpsertSironaRolesFromJsonData>("UpsertSironaRolesFromJsonData"),
};
