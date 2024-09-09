// types
import { IQueryToBDD } from "../interfaces/queryToBDD.interface.ts";

import { APICalls } from "../APICalls.ts";
const apiCalls = new APICalls();

export class QueryToBDDService {
  postQueryEndpoint: string;
  constructor() {
    this.postQueryEndpoint = "/postQuery.php";
  }

  async postQuery(data: IQueryToBDD) {
    const params = {
      request: null,
      args: {
        aspPageName: data.aspPageName,
        queryComment: data.queryComment,
        query: data.query,
      },
    };

    try {
      await apiCalls.postRequest(this.postQueryEndpoint, params);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
