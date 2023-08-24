import { describe, expect, it, vi } from "vitest";
import { getNewDocumentationFilePath, getOldDocumentationFilePath } from "../generate-docs";

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
});
