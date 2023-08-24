import { describe, expect, it, vi } from "vitest";
import { getContractFileNames } from "../generate-docs";

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
});
