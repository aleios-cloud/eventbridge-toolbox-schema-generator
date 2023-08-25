import { Contract } from "../../types";

export interface PersonSignedInContract extends Contract {
  "detail-type": "PersonSignedInContract";
  detail: {
    "detail-version": 1;
    data: {
      userName: string;
      password: string;
    };
  };
}
