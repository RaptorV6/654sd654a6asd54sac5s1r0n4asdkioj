import type { LinkedField, LinkedType } from "./client/runtime/types";

import { customScalars } from "./scalar-codecs";

const isObject = (v: any): v is Record<string, any> => v != null && typeof v === "object";
const isScalarType = (type: LinkedType) => isObject(type.fields) && Object.keys(type.fields).length === 0;

export const decodeResponse = (root: LinkedType, response: any) => {
  const nextResponse = decodeTraverseType(root, response);
  return nextResponse;
};

export const encodeRequest = (root: LinkedType, request: Record<string, any>) => {
  const nextRequest = encodeTraverseType(root, request);
  return nextRequest;
};

function decodeTraverseType(parentType: LinkedType, response: any): any {
  if (response == null) return response;

  if (isScalarType(parentType)) {
    return decodeScalarValue(parentType, response);
  }

  const parentTypeFields = parentType.fields!;
  return Object.fromEntries(
    Object.entries(response).map(([resFieldKey, resFieldValue]) => {
      const resultType = parentTypeFields[resFieldKey]?.type;
      if (resultType == null) return [resFieldKey, resFieldValue];
      const nextValue = Array.isArray(resFieldValue)
        ? resFieldValue.map((item) => decodeTraverseType(resultType, item))
        : decodeTraverseType(resultType, resFieldValue);
      return [resFieldKey, nextValue];
    }),
  );
}

function encodeTraverseType(parentType: LinkedType, request: any): any {
  if (isScalarType(parentType)) {
    return encodeScalarValue(parentType, request);
  }

  const parentTypeFields = parentType.fields!;
  return Object.fromEntries(
    Object.entries(request).map(([fieldKey, fieldValue]) => {
      const linkedField = parentTypeFields[fieldKey];
      return [fieldKey, linkedField == null ? fieldValue : encodeTraverseField(linkedField, fieldValue)];
    }),
  );
}

function encodeTraverseField(linkedField: LinkedField, request: any): any {
  if (isScalarType(linkedField.type)) {
    return encodeScalarValue(linkedField.type, request);
  }

  return Object.fromEntries(
    Object.entries(request).map(([key, val]) => {
      if (key === "__args") {
        if (linkedField.args != null) {
          return [key, encodeArgs(linkedField.args, val)];
        }
        return [key, val];
      }

      return [key, encodeTraverseType(linkedField.type, val)];
    }),
  );
}

function encodeArgs(
  argType: {
    [arg: string]: [LinkedType, string] | undefined;
  },
  args: any,
) {
  return Object.fromEntries(
    Object.entries(args).map(([argKey, argVal]) => {
      if (argType[argKey]) {
        const argSpec = argType[argKey][0];
        if (isScalarType(argSpec)) {
          return [argKey, encodeScalarValue(argSpec, argVal)];
        }
        return [argKey, encodeTraverseType(argSpec, argVal)];
      }
      return [argKey, argVal];
    }),
  );
}

function decodeScalarValue(scalarType: LinkedType, value: any): any {
  const scalarTypeName = scalarType.name;
  if (scalarTypeName in customScalars) {
    const codec = customScalars[scalarTypeName as keyof typeof customScalars];
    return codec.decode(value);
  }
  return value;
}

function encodeScalarValue(scalarType: LinkedType, value: any): any {
  const scalarTypeName = scalarType.name;
  if (scalarTypeName in customScalars) {
    const codec = customScalars[scalarTypeName as keyof typeof customScalars];
    return codec.encode(value);
  }
  return value;
}
