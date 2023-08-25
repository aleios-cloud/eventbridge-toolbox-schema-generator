import path from "path";

import { writeDocumentation } from "./helpers/writeDocumentation.js";
import { generateAllContractInformation } from "./helpers/generateAllContractInformation.js";


export const getVersionedDocumentationFilePath = (
  pathToDocumentationFolder: string,
  detailType: string,
  detailVersion: number
) =>
  path.join(
    `${pathToDocumentationFolder}/${detailType}/versioned/${detailVersion}`
  );

export const getUnversionedDocumentationFilePath = (
  pathToDocumentationFolder: string,
  detailType: string
) => path.join(`${pathToDocumentationFolder}/${detailType}`);

export const generateDocumentation = async (
  pathToContractsFolder: string,
  pathToDocumentationFolder: string
): Promise<void> => {
  const { allSchemaDetails, newestVersionsRecord } =
    await generateAllContractInformation(pathToContractsFolder);

  allSchemaDetails.forEach((schemaDetails) => {
    const newestVersionOfContract =
      newestVersionsRecord[schemaDetails.detailType];

    if (newestVersionOfContract == schemaDetails.detailVersion) {
      const newDocumentationFilePath = getUnversionedDocumentationFilePath(
        pathToDocumentationFolder,
        schemaDetails.detailType
      );
      writeDocumentation(schemaDetails, newDocumentationFilePath);
    } else {
      const oldDocumentationFilePath = getVersionedDocumentationFilePath(
        pathToDocumentationFolder,
        schemaDetails.detailType,
        schemaDetails.detailVersion
      );
      writeDocumentation(schemaDetails, oldDocumentationFilePath);
    }
  });
};
