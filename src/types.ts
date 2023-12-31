export type SchemaDetails = {
  detailType: string;
  detailVersion: number;
  schema: ContractSchemaType;
};

export type ContractSchemaType = {
  properties: DetailTypeSchemaType & DetailVersionSchemaType;
};

export type DetailTypeSchemaType = {
  "detail-type": {
    const: string;
  };
};

export type DetailVersionSchemaType = {
  detail: {
    properties: {
      "detail-version": {
        const: number;
      };
    };
  };
};
