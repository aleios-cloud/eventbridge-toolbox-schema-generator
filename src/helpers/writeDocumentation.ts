import { mkdirSync } from "fs";
import { SchemaDetails } from "src/types.js";
import { writeIndexFile } from "./writeIndexFile.js";
import { writeSchemaFile } from "./writeSchemaFile.js";

export const writeDocumentation = async (
  schemaDetails: SchemaDetails,
  pathToContractDocumentationFolder: string
) => {
  const { detailType, detailVersion, schema } = schemaDetails;

  mkdirSync(pathToContractDocumentationFolder, { recursive: true });

  await writeIndexFile(
    pathToContractDocumentationFolder,
    detailType,
    detailVersion
  );

  await writeSchemaFile(pathToContractDocumentationFolder, schema);
};
