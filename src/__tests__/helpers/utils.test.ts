import { describe, expect, it } from "vitest";

import {
  isInvalidDirectoryName,
  isValidJsonSchemaContract,
} from "../../helpers/utils.js";

const invalidDetailTypeSchema: object = {
  "detail-type": {
    const: 234,
  },
};

const validDetailTypeSchema: object = {
  "detail-type": {
    const: "PersonRegisteredContract",
  },
};

const invalidDetailVersionSchema: object = {
  detail: {
    properties: {
      "detail-version": {
        const: "invalidConst",
      },
    },
  },
};

const validDetailVersionSchema: object = {
  detail: {
    properties: {
      "detail-version": {
        const: 1,
      },
    },
  },
};

export const createJsonObject = (partialData?: object): object => ({
  properties: {
    ...partialData,
  },
});

const createJsonObjectWithDefinitions = (partialData?: object): object => ({
  definitions: {
    ContractSchemaType: {
      properties: {
        ...partialData,
      },
    },
  },
});

describe("Given a set of utils functions", () => {
  describe("We can validate a jsonSchema", () => {
    it("Returns true if given a jsonObject contains required fields", () => {
      expect(
        isValidJsonSchemaContract(
          createJsonObject({
            ...validDetailVersionSchema,
            ...validDetailTypeSchema,
          }),
        ),
      ).toStrictEqual(true);
    });

    it("Returns false if given a jsonObject is missing detailVersion", () => {
      expect(
        isValidJsonSchemaContract(
          createJsonObject({
            ...validDetailTypeSchema,
          }),
        ),
      ).toStrictEqual(false);
    });

    it("Returns false if given a jsonObject is missing detailType", () => {
      expect(
        isValidJsonSchemaContract(
          createJsonObject({
            ...validDetailVersionSchema,
          }),
        ),
      ).toStrictEqual(false);
    });

    it("Returns false if given a jsonObject contains invalid detailType", () => {
      expect(
        isValidJsonSchemaContract(
          createJsonObject({
            ...validDetailVersionSchema,
            ...invalidDetailTypeSchema,
          }),
        ),
      ).toStrictEqual(false);
    });

    it("Returns false if given a jsonObject contains invalid detailVersion", () => {
      expect(
        isValidJsonSchemaContract(
          createJsonObject({
            ...invalidDetailVersionSchema,
            ...validDetailTypeSchema,
          }),
        ),
      ).toStrictEqual(false);
    });

    it("Returns false if given a jsonObject contains definitions", () => {
      expect(
        isValidJsonSchemaContract(
          createJsonObjectWithDefinitions(
            createJsonObject({
              ...validDetailVersionSchema,
              ...validDetailTypeSchema,
            }),
          ),
        ),
      ).toStrictEqual(false);
    });
  });

  describe("With function isInvalidDirectoryName to get check if a string is a valid directory name", () => {
    it.each(["test", "testName", "TESTNAME123", "test-name", "test_name"])(
      "Function returns true if we have passed it a valid directory name without spaces",
      (directoryName) => {
        expect(isInvalidDirectoryName(directoryName)).toStrictEqual(false);
      },
    );

    it.each(["test name", "test?name", "test*name", ".", ".."])(
      "Function returns false if we have passed it a invalid directory name",
      (directoryName) => {
        expect(isInvalidDirectoryName(directoryName)).toStrictEqual(true);
      },
    );
  });
});
