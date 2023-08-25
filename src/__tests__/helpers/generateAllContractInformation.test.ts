import { describe, expect, it, type MockedFunction, vi } from "vitest";

import {
  generateAllContractInformation,
  getContractFileNames,
  getUpdatedNewestVersionRecord,
} from "../../helpers/generateAllContractInformation.js";
import { generateSchemaDetails } from "../../helpers/generateSchemaDetails.js";

const { mockReaddir } = vi.hoisted(() => ({
  mockReaddir: vi.fn(),
}));

vi.mock("fs/promises", () => {
  return {
    readdir: mockReaddir,
  };
});

vi.mock("../../helpers/generateSchemaDetails");
const mockGenerateSchemaDetails = generateSchemaDetails as MockedFunction<
  typeof generateSchemaDetails
>;

const mockSchemaDetails = {
  detailType: "mockDetailTypeConst",
  detailVersion: 100,
  schema: {
    properties: {
      "detail-type": {
        const: "mockDetailTypeConst",
      },
      detail: {
        properties: {
          "detail-version": {
            const: 100,
          },
        },
      },
    },
  },
};

mockGenerateSchemaDetails.mockReturnValue(mockSchemaDetails);

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
          100,
        ),
      ).toStrictEqual({ testContract: 10, testContract2: 100 });
    });

    it("Returns an updated record if we have a newer version of the contract", () => {
      expect(
        getUpdatedNewestVersionRecord(
          { testContract: 10 },
          "testContract",
          100,
        ),
      ).toStrictEqual({ testContract: 100 });
    });

    it("Returns the same record if we do not have a newer contract or a new contract type", () => {
      expect(
        getUpdatedNewestVersionRecord({ testContract: 10 }, "testContract", 1),
      ).toStrictEqual({ testContract: 10 });
    });
  });

  describe("Which generates contract information by reading contract files", () => {
    it("Returns an array of all schemas and the record of the newest version if input is valid", async () => {
      mockReaddir.mockResolvedValueOnce(["singleMockContractFileName"]);
      expect(
        await generateAllContractInformation("mockPathToContractsFolder"),
      ).toStrictEqual({
        allSchemaDetails: [mockSchemaDetails],
        newestVersionsRecord: { mockDetailTypeConst: 100 },
      });
    });

    it("Throws an error if it detects duplicate schemas", async () => {
      mockReaddir.mockResolvedValueOnce([
        "mockContractFileNameOne",
        "mockContractFileNameTwo",
      ]);
      await expect(
        generateAllContractInformation("mockPathToContractsFolder"),
      ).rejects.toThrow(
        "Contracts types error. Multiple mockDetailTypeConst contracts have been assigned the same version.",
      );
    });
  });
});
