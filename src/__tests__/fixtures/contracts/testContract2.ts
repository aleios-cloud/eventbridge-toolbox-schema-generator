import { Contract } from "../types.js";
export interface PersonRegisteredContract extends Contract {
  "detail-type": "PersonRegisteredContract";
  detail: {
    "detail-version": 2;
    data: {
      firstName: string;
    };
  };
}
