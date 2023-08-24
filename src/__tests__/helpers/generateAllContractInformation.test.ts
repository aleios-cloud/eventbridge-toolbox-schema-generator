import { describe, expect, it, vi } from "vitest";
import {
  getContractFileNames,
  getUpdatedNewestVersionRecord,
} from "../../helpers/generateAllContractInformation";

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
  describe("With function getContractFileNames to get files with a file name containing the term 'contract'", () => {
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

  describe("With function getUpdatedNewestVersionRecord to get an updated record of which version of each contract is the newest", () => {
    it("Returns an updated record if this is a new contract", () => {
      expect(
        getUpdatedNewestVersionRecord(
          { testContract: 10 },
          "testContract2",
          100
        )
      ).toStrictEqual({ testContract: 10, testContract2: 100 });
    });

    it("Returns an updated record if we have a newer version of the contract", () => {
      expect(
        getUpdatedNewestVersionRecord({ testContract: 10 }, "testContract", 100)
      ).toStrictEqual({ testContract: 100 });
    });

    it("Returns the same record if we do not have a newer contract or a new contract type", () => {
      expect(
        getUpdatedNewestVersionRecord({ testContract: 10 }, "testContract", 1)
      ).toStrictEqual({ testContract: 10 });
    });
  });

  //   describe("Which generates contract information by reading contract files", () => {
  //     it("Returns an array of all schemas and the record of the newest version", async () => {
  //       mockReaddir.mockResolvedValueOnce(['singleMockFileName']);

  //     });
  //   });
});
