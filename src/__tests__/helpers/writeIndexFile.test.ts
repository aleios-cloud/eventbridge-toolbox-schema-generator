import { describe, expect, it, vi } from "vitest";

import { writeIndexFile } from "../../helpers/writeIndexFile.js";

const { mockWriteFile } = vi.hoisted(() => ({
  mockWriteFile: vi.fn(),
}));

vi.mock("fs/promises", () => {
  return {
    writeFile: mockWriteFile,
  };
});

const mockEventMarkdown =
  "---\n" +
  "name: mockDetailType\n" +
  "version: 100\n" +
  "summary: |\n" +
  "  A summary\n" +
  "producers:\n" +
  "  - Producer\n" +
  "consumers:\n" +
  "  - Consumer\n" +
  "owners:\n" +
  "  - Name\n" +
  "---\n\n" +
  "<Admonition>Some information</Admonition>\n\n" +
  "### Details\n\n" +
  "Some details...\n\n" +
  "<Schema />";

describe("Given a write index file helper", () => {
  describe("Which creates an index markdown file from a template", () => {
    it("The writeFile function is called with the expected input", async () => {
      await writeIndexFile("mockDocsPath", "mockDetailType", 100);
      expect(mockWriteFile).toBeCalledWith(
        "mockDocsPath/index.md",
        mockEventMarkdown,
      );
    });
  });
});
