import { Contract } from "../../types.js";
export interface PersonRegisteredContract extends Contract {
  "detail-type": "PersonRegisteredContract";
  detail: {
    "detail-version": 1;
    data: {
      firstName: string;
      lastName: string;
    };
  };
}
