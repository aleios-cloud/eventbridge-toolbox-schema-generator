import { readdir } from "fs/promises";

import { generateSchemaDetails } from "./generateSchemaDetails.js";

import { SchemaDetails } from "../types.js";

//Note: contract file name must include term 'Contract' to be parsed
export const getContractFileNames = async (
  pathToContracts: string
): Promise<string[]> => {
  const files = await readdir(pathToContracts);

  return files.filter((fileName) =>
    fileName.toLowerCase().includes("contract")
  );
};

export const getUpdatedNewestVersionRecord = (
  newestVersionsRecord: Record<string, number>,
  detailType: string,
  detailVersion: number
): Record<string, number> => {
  if (
    !(detailType in newestVersionsRecord) ||
    newestVersionsRecord[detailType] < detailVersion
  ) {
    newestVersionsRecord[detailType] = detailVersion;
  }
  return newestVersionsRecord;
};

export const generateAllContractInformation = async (
  pathToContractsFolder: string
): Promise<{
  allSchemaDetails: SchemaDetails[];
  newestVersionsRecord: Record<string, number>;
}> => {
  const contractFileNames = await getContractFileNames(pathToContractsFolder);

  let allSchemaDetails: SchemaDetails[] = [];
  let newestVersionsRecord: Record<string, number> = {};

  for (const contractFileName of contractFileNames) {
    const { detailType, detailVersion, schema } = generateSchemaDetails(
      pathToContractsFolder,
      contractFileName
    );
    allSchemaDetails.push({ detailType, detailVersion, schema });

    if (newestVersionsRecord[detailType] === detailVersion) {
      throw `Contracts types error. Multiple ${detailType} contracts have been assigned the same version.`;
    }

    newestVersionsRecord = getUpdatedNewestVersionRecord(
      newestVersionsRecord,
      detailType,
      detailVersion
    );
  }

  return { allSchemaDetails, newestVersionsRecord };
};
