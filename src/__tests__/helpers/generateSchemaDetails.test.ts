import { describe, expect, it } from "vitest";
import { isValidDirectoryName } from "../../helpers/generateSchemaDetails";

describe("Given a generate schema details script", () => {
  describe("With function isValidDirectoryName to get check if a string is a valid directory name", () => {
    it.each(["test", "testName", "TESTNAME123", "test-name", "test_name"])(
      "Function returns true if we have passed it a valid directory name without spaces",
      async (directoryName) => {
        expect(isValidDirectoryName(directoryName)).toStrictEqual(true);
      }
    );

    it.each(["test name", "test,name", "test.name"])(
      "Function returns false if we have passed it a invalid directory name",
      async (directoryName) => {
        expect(isValidDirectoryName(directoryName)).toStrictEqual(false);
      }
    );
  });
});
