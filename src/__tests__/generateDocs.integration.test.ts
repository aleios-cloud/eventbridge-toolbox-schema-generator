import { describe, expect, it, vi, afterEach, beforeEach } from "vitest";
import mock from "mock-fs";
import { generateDocumentation } from "../generateDocs";
import path from "path";

const mockFileSystem = {
  "mock/contracts/directory": {
    "testContract.ts": mock.load(
      path.join(
        process.cwd(),
        "/example-architecture/events/contracts/personRegisteredContractV1.ts"
      )
    ),
    "testContract2.ts": mock.load(
      path.join(
        process.cwd(),
        "/example-architecture/events/contracts/personRegisteredContractV2.ts"
      )
    ),
  },
  "mock/events/directory": {},
};

describe("Create documentation for contract types, standardised for use with event catalog", () => {
  beforeEach(function () {
    mock(mockFileSystem);
  });
  afterEach(mock.restore);

  it("Creates documentation without error when passed valid contract types", () => {
    generateDocumentation("mock/contracts/directory", "mock/events/directory");
    expect(true);
  });
});
