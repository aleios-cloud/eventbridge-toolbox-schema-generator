import { readdir } from "fs/promises";
import path from "path";

import { generateSchemaDetails } from "./helpers/generateSchemaDetails.js";

import { SchemaDetails } from "./types.js";
import { generateContractDocumentation } from "./helpers/generateContractDocumentation.js";

//Note: contract file name must include term 'Contract' to be parsed
export const getContractFileNames = async (
  pathToContracts: string
): Promise<string[]> => {
  const files = await readdir(pathToContracts);

  return files.filter((fileName) =>
    fileName.toLowerCase().includes("contract")
  );
};

export const getOldDocumentationFilePath = (
  pathToDocumentationFolder: string,
  detailType: string,
  detailVersion: number
) =>
  path.join(
    `${pathToDocumentationFolder}/${detailType}/versioned/${detailVersion}`
  );

export const getNewDocumentationFilePath = (
  pathToDocumentationFolder: string,
  detailType: string
) => path.join(`${pathToDocumentationFolder}/${detailType}`);

export const generateDocumentation = async (
  pathToContractsFolder: string,
  pathToDocumentationFolder: string
): Promise<void> => {
  const contractFileNames = await getContractFileNames(pathToContractsFolder);

  let allSchemaDetails: SchemaDetails[] = [];
  let newestVersionsRecords: Record<string, number> = {};

  for (const contractFileName of contractFileNames) {
    const { detailType, detailVersion, schema } = generateSchemaDetails(
      pathToContractsFolder,
      contractFileName
    );
    allSchemaDetails.push({ detailType, detailVersion, schema });

    if (newestVersionsRecords[detailType] === detailVersion) {
      throw `Contracts types error. Multiple ${detailType} contracts have been assigned the same version.`;
    }

    if (
      !(detailType in newestVersionsRecords) ||
      newestVersionsRecords[detailType] < detailVersion
    ) {
      newestVersionsRecords[detailType] = detailVersion;
    }
  }

  allSchemaDetails.forEach((schemaDetails) => {
    const newestVersionOfContract =
      newestVersionsRecords[schemaDetails.detailType];

    if (newestVersionOfContract == schemaDetails.detailVersion) {
      const newDocumentationFilePath = getNewDocumentationFilePath(
        pathToDocumentationFolder,
        schemaDetails.detailType
      );
      generateContractDocumentation(schemaDetails, newDocumentationFilePath);
    } else {
      const oldDocumentationFilePath = getOldDocumentationFilePath(
        pathToDocumentationFolder,
        schemaDetails.detailType,
        schemaDetails.detailVersion
      );
      generateContractDocumentation(schemaDetails, oldDocumentationFilePath);
    }
  });
};
