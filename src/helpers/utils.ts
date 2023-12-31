import {
  ContractSchemaType,
  DetailTypeSchemaType,
  DetailVersionSchemaType,
} from "../types.js";

const isObject = (field: unknown): field is object =>
  typeof field === "object" && field !== null;

const hasConst = (field: object, constType: string): boolean =>
  "const" in field && typeof field.const === constType;

const hasDetailTypeConst = (field: object): field is DetailTypeSchemaType =>
  "detail-type" in field &&
  isObject(field["detail-type"]) &&
  hasConst(field["detail-type"], "string");

const hasDetailVersionConst = (
  field: object,
): field is DetailVersionSchemaType => {
  if ("detail" in field && isObject(field.detail)) {
    if ("properties" in field.detail && isObject(field.detail.properties)) {
      if (
        "detail-version" in field.detail.properties &&
        isObject(field.detail.properties["detail-version"]) &&
        hasConst(field.detail.properties["detail-version"], "number")
      ) {
        return true;
      }
    }
  }

  return false;
};

export const isValidJsonSchemaContract = (
  contractSchema: object,
): contractSchema is ContractSchemaType => {
  if ("properties" in contractSchema && isObject(contractSchema.properties)) {
    if (
      hasDetailTypeConst(contractSchema.properties) &&
      hasDetailVersionConst(contractSchema.properties)
    ) {
      return true;
    }
  }

  return false;
};

export const isInvalidDirectoryName = (detailType: string): boolean => {
  const containsLinuxReservedRegex = new RegExp(/[<>:"/\\|?*]/g).test(
    detailType,
  );

  const containsWindowsReservedRegex = new RegExp(
    /^(con|prn|aux|nul|com\d|lpt\d)$/i,
  ).test(detailType);

  const containsWhitespace = new RegExp(/[\s]/g).test(detailType);

  if (
    containsLinuxReservedRegex ||
    containsWindowsReservedRegex ||
    containsWhitespace ||
    detailType.length > 255 ||
    detailType === "." ||
    detailType === ".."
  ) {
    return true;
  }

  return false;
};
