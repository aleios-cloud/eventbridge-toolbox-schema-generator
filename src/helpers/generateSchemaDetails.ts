import path from "path";
import { createGenerator } from "ts-json-schema-generator";

//TODO: We have to use relative paths here as apparently ts-node doesn't support esm :(
// I think we should investigate a proper fix for this.
import { isValidJsonSchemaContract } from "./utils.js";
import { SchemaDetails } from "../types.js";

export const isValidDirectoryName = (detailType: string) =>
  new RegExp(/^[a-z0-9-_]+$/i).test(detailType);

export const generateSchemaDetails = (
  pathToContractsFolder: string,
  contractFilename: string
): SchemaDetails => {
  const pathToContractFile = path.join(pathToContractsFolder, contractFilename);

  const typeToSchemaConfig = {
    path: pathToContractFile,
    tsconfig: path.join(process.cwd(), "/tsconfig.json"),
    topRef: false,
    type: "*",
  };

  const contractSchema = createGenerator(typeToSchemaConfig).createSchema(
    typeToSchemaConfig.type
  );

  if (isValidJsonSchemaContract(contractSchema)) {
    if (!isValidDirectoryName(contractSchema.properties["detail-type"].const)) {
      throw `Contracts types error. Detail type for file ${contractFilename} must be a valid directory name.`;
    }

    return {
      detailType: contractSchema.properties["detail-type"].const,
      detailVersion:
        contractSchema.properties.detail.properties["detail-version"].const,
      schema: contractSchema,
    };
  } else {
    throw `Contracts types error. File ${contractFilename} does not contain a const value for both 'detail-type' and 'detail-version'.`;
  }
};
