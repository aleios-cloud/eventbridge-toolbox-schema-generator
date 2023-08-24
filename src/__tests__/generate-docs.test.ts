import { MockedFunction, describe, expect, it, vi } from "vitest";
import {
  generateDocumentation,
  getNewDocumentationFilePath,
  getOldDocumentationFilePath,
} from "../generate-docs";
import { generateAllContractInformation } from "../helpers/generateAllContractInformation";
import { writeDocumentation } from "../helpers/writeDocumentation";

describe("Given a generate docs script", () => {
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

  describe("With function compileContractInformation to compile information from the contracts", () => {
    it("Returns schema details and newest version information for a set of contracts", async () => {
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

  vi.mock("../helpers/generateAllContractInformation");
  const mockGenerateAllContractInformation =
    generateAllContractInformation as MockedFunction<
      typeof generateAllContractInformation
    >;
  const mockSchemaDetails = {
    detailType: "mockDetailTypeConst",
    detailVersion: 10,
    schema: {
      properties: {
        "detail-type": {
          const: "mockDetailTypeConst",
        },
        detail: {
          properties: {
            "detail-version": {
              const: 10,
            },
          },
        },
      },
    },
  };

  vi.mock("../helpers/writeDocumentation");
  const mockWriteDocumentation = writeDocumentation as MockedFunction<
    typeof writeDocumentation
  >;

  describe("Which handles the creating on documentation", () => {
    it("Calls writeDocumentation with a versioned filepath if handling an old contract", async () => {
      mockGenerateAllContractInformation.mockResolvedValueOnce({
        allSchemaDetails: [mockSchemaDetails],
        newestVersionsRecord: { mockDetailTypeConst: 100 },
      });
      await generateDocumentation(
        "mockPathToContractsFolder",
        "mockPathToDocumentationFolder"
      );
      expect(mockWriteDocumentation).toBeCalledWith(
        mockSchemaDetails, `mockPathToDocumentationFolder/mockDetailTypeConst/versioned/10`
      );
    });

    it("Calls writeDocumentation with a unversioned filepath if handling a new contract", async () => {
      mockGenerateAllContractInformation.mockResolvedValueOnce({
        allSchemaDetails: [mockSchemaDetails],
        newestVersionsRecord: { mockDetailTypeConst: 10 },
      });
      await generateDocumentation(
        "mockPathToContractsFolder",
        "mockPathToDocumentationFolder"
      );
      expect(mockWriteDocumentation).toBeCalledWith(
        mockSchemaDetails, `mockPathToDocumentationFolder/mockDetailTypeConst`
      );
    });
  });
});
