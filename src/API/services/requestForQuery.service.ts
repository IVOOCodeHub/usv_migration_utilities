// types
import { IRequestForQuery } from "../interfaces/requestForQuery.interface.ts";

import { APICalls } from "../APICalls.ts";
const apiCalls = new APICalls();

export class RequestForQueryService {
  postRequestForQueryEndpoint: string;
  constructor() {
    this.postRequestForQueryEndpoint = "/postRequestForQuery.php";
  }

  async postRequestForQuery(data: IRequestForQuery) {
    const params = {
      request: null,
      args: {
        pageKey: data.pageKey,
        pageName: data.pageName,
        queryOverview: data.queryOverview,
        expectedQueryResult: data.expectedQueryResult,
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
