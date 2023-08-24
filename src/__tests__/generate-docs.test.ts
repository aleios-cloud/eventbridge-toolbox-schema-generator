import { describe, expect, it, vi } from "vitest";
import { getContractFileNames, getNewDocumentationFilePath, getOldDocumentationFilePath } from "../generate-docs";

const { mockReaddir } = vi.hoisted(() => ({
  mockReaddir: vi.fn(),
}));

vi.mock("fs/promises", async () => {
  const actualFs = await vi.importActual<object>("fs/promises");

  return {
    ...actualFs,
    readdir: mockReaddir,
  };
});

describe("Given a generate docs script", () => {
  describe("With function getContractFileNames to get files with a file name containing the term 'contract", () => {
    it("Function returns empty array if no filenames found", async () => {
      mockReaddir.mockResolvedValueOnce([]);

      const result = await getContractFileNames(".");
      expect(result).toStrictEqual([]);
    });

    it("Function returns array of only valid filenames", async () => {
      mockReaddir.mockResolvedValueOnce([
        "file.ts",
        "fileContract.ts",
        "contract.ts",
        "con.tract",
      ]);

      const result = await getContractFileNames(".");
      expect(result).toStrictEqual(["fileContract.ts", "contract.ts"]);
    });
  });

  describe("With function getNewDocumentationFilePath to generate filepaths", () => {
    it("Returns a filepath based on its input", async () => {
      expect(
        getNewDocumentationFilePath(
          "mockPathToDocumentationFolder",
          "mockDetailType"
        )
      ).toStrictEqual("mockPathToDocumentationFolder/mockDetailType");
    });
  });

    describe("With function getOldDocumentationFilePath to generate filepaths", () => {
      it("Returns a filepath based on input", async () => {
        expect(
          getOldDocumentationFilePath(
            "mockPathToDocumentationFolder",
            "mockDetailType",
            100
          )
        ).toStrictEqual(
          "mockPathToDocumentationFolder/mockDetailType/versioned/100"
        );
      });
    });

  describe("Which generates documentation from contract types", () => {
    it("Function returns empty array if no filenames found", async () => {
      mockReaddir.mockResolvedValueOnce([]);

      const result = await getContractFileNames(".");
      expect(result).toStrictEqual([]);
    });

    it("Function returns array of only valid filenames", async () => {
      mockReaddir.mockResolvedValueOnce([
        "file.ts",
        "fileContract.ts",
        "contract.ts",
        "con.tract",
      ]);

      const result = await getContractFileNames(".");
      expect(result).toStrictEqual(["fileContract.ts", "contract.ts"]);
    });
  });
});
