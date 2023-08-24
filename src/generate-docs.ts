import { readdir } from "fs/promises";
import path from "path";

import { generateSchemaDetails } from "./helpers/generateSchemaDetails.js";

import { SchemaDetails } from "./types.js";
import { generateContractDocumentation } from "./helpers/generateContractDocumentation.js";

//Note: contract file name must include term 'Contract' to be parsed
const getContractFileNames = async (
  pathToContracts: string
): Promise<string[]> => {
  const files = await readdir(pathToContracts);

  return files.filter((fileName) => fileName.includes("Contract"));
};

export const generateDocumentation = async (
  pathToContractsFolder: string,
  pathToDocumentationFolder: string
): Promise<void> => {
  const contractFileNames = await getContractFileNames(pathToContractsFolder);

  let allContractDetails: SchemaDetails[] = [];

  let newestVersionsRecords: Record<string, number> = {};

  for (const contractFileName of contractFileNames) {
    const { detailType, detailVersion, schema } = generateSchemaDetails(
      pathToContractsFolder,
      contractFileName
    );
    allContractDetails.push({ detailType, detailVersion, schema });

    if (detailType in newestVersionsRecords) {
      const previousNewestContractVersionRecorded =
        newestVersionsRecords[detailType];
      if (previousNewestContractVersionRecorded < detailVersion) {
        console.log("new contract");
        newestVersionsRecords[detailType] = detailVersion;
      }
    } else {
      console.log("unseen contract");
      newestVersionsRecords[detailType] = detailVersion;
    }
  }

  allContractDetails.forEach((contractDetails) => {
    if (
      newestVersionsRecords[contractDetails.detailType] ==
      contractDetails.detailVersion
    ) {
      const pathToContractDocumentationFolder = path.join(
        `${pathToDocumentationFolder}/${contractDetails.detailType}`
      );
      generateContractDocumentation(
        contractDetails,
        pathToContractDocumentationFolder
      );
    } else {
      const pathToContractDocumentationFolder = path.join(
        `${pathToDocumentationFolder}/${contractDetails.detailType}/versioned/${contractDetails.detailVersion}`
      );
      generateContractDocumentation(
        contractDetails,
        pathToContractDocumentationFolder
      );
    }
  });
};
