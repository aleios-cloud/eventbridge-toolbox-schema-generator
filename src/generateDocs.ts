import path from "path";

import { generateAllContractInformation } from "./helpers/generateAllContractInformation.js";
import { writeDocumentation } from "./helpers/writeDocumentation.js";

export const getVersionedDocumentationFilePath = (
  pathToDocumentationFolder: string,
  detailType: string,
  detailVersion: number,
): string =>
  path.join(
    `${pathToDocumentationFolder}/${detailType}/versioned/${detailVersion}`,
  );

export const getUnversionedDocumentationFilePath = (
  pathToDocumentationFolder: string,
  detailType: string,
): string => path.join(`${pathToDocumentationFolder}/${detailType}`);

export const generateDocumentation = async (
  pathToContractsFolder: string,
  pathToDocumentationFolder: string,
): Promise<void> => {
  const { allSchemaDetails, newestVersionsRecord } =
    await generateAllContractInformation(pathToContractsFolder);

  allSchemaDetails.map(async (schemaDetails) => {
    const newestVersionOfContract =
      newestVersionsRecord[schemaDetails.detailType];

    if (newestVersionOfContract === schemaDetails.detailVersion) {
      const newDocumentationFilePath = getUnversionedDocumentationFilePath(
        pathToDocumentationFolder,
        schemaDetails.detailType,
      );
      await writeDocumentation(schemaDetails, newDocumentationFilePath);
    } else {
      const oldDocumentationFilePath = getVersionedDocumentationFilePath(
        pathToDocumentationFolder,
        schemaDetails.detailType,
        schemaDetails.detailVersion,
      );
      await writeDocumentation(schemaDetails, oldDocumentationFilePath);
    }
  });
};
