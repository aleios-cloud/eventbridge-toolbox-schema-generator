import { writeFile } from "fs/promises";

import { ContractSchemaType } from "../types.js";

export const writeSchemaFile = async (
  pathToContractDocumentationFolder: string,
  schema: ContractSchemaType
): Promise<void> => {
  const jsonSchemaWhiteSpace = 2;
  const schemaString = JSON.stringify(
    schema,
    null,
    jsonSchemaWhiteSpace
  );

  await writeFile(
    `${pathToContractDocumentationFolder}/schema.json`,
    schemaString
  );
};
