import { Contract } from "../../types";
export interface Test extends Contract {
  "detail-type": "Test";
  detail: {
    "detail-version": 1;
    data: {
      test: string;
    };
  };
}
