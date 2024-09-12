// types
import { IRequestForQuery } from "../interfaces/requestForQuery.interface.ts";
import { IUserCredentials } from "../interfaces/user.interface.ts";

import { APICalls } from "../APICalls.ts";
const apiCalls = new APICalls();

export class RequestForQueryService {
  postRequestForQueryEndpoint: string;
  constructor() {
    this.postRequestForQueryEndpoint = "/storedProcedure";
  }

  async postRequestForQuery(
    userCredentials: IUserCredentials,
    data: IRequestForQuery,
  ) {
    const params = {
      ...userCredentials,
      request: "create_edit_asp_page_request",
      args: {
        cle_page_asp: data.pageKey,
        description_ask: data.queryOverview,
        expected_results: data.expectedQueryResult,
      },
    };

    try {
      await apiCalls.postRequest(this.postRequestForQueryEndpoint, params);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
