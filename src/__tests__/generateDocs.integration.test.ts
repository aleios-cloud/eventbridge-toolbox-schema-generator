import { describe, expect, it, afterEach } from "vitest";
import { generateDocumentation } from "../generateDocs";
import path from "path";
import { rimraf } from "rimraf";
import { readdir } from "fs/promises";
import { existsSync, readFileSync } from "fs";

const testContractsPath = path.join(
  process.cwd(),
  "/src/__tests__/fixtures/contracts"
);
const testDocsPath = path.join(process.cwd(), "/src/__tests__/fixtures/docs");

describe("Create documentation for contract types, standardised for use with event catalog", () => {
  afterEach(async () => {
    const files = await readdir(testDocsPath);
    for (const file of files) {
      await rimraf(path.join(testDocsPath, file));
    }
  });

  it("Creates documentation without error when passed valid contract types", async () => {
    await generateDocumentation(testContractsPath, testDocsPath);
    var savedVersionedDocs = readFileSync(
      path.join(
        testDocsPath,
        "/PersonRegisteredContract/versioned/1/schema.json"
      ),
      {
        encoding: "utf8",
      }
    );
    expect(savedVersionedDocs).toMatch(/("const": "PersonRegisteredContract")/);
    expect(savedVersionedDocs).toMatch(/("const": 1)/);
    expect(
      existsSync(
        path.join(
          testDocsPath,
          "/PersonRegisteredContract/versioned/1/index.md"
        )
      )
    ).toStrictEqual(true);
    var savedUnversionedDocs = readFileSync(
      path.join(testDocsPath, "/PersonRegisteredContract/schema.json"),
      {
        encoding: "utf8",
      }
    );
    expect(savedUnversionedDocs).toMatch(
      /("const": "PersonRegisteredContract")/i
    );
    expect(savedUnversionedDocs).toMatch(/("const": 2)/i);
    expect(
      existsSync(path.join(testDocsPath, "/PersonRegisteredContract/index.md"))
    ).toStrictEqual(true);
  });
});
