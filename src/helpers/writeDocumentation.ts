import { mkdirSync } from "fs";

import { writeIndexFile } from "./writeIndexFile.js";
import { writeSchemaFile } from "./writeSchemaFile.js";
import { SchemaDetails } from "../types.js";

export const writeDocumentation = async (
  schemaDetails: SchemaDetails,
  pathToContractDocumentationFolder: string,
): Promise<void> => {
  const { detailType, detailVersion, schema } = schemaDetails;

  mkdirSync(pathToContractDocumentationFolder, { recursive: true });

  await writeIndexFile(
    pathToContractDocumentationFolder,
    detailType,
    detailVersion,
  );

  await writeSchemaFile(pathToContractDocumentationFolder, schema);
};
