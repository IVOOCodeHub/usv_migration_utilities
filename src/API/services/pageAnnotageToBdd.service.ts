// types
import { IPageAnnotateToBdd } from "../interfaces/pageAnnotateToBdd.interface.ts";

import { APICalls } from "../APICalls.ts";
const apiCalls = new APICalls();

export class PageAnnotateToBddService {
  postRequestEndpoint: string;

  constructor() {
    this.postRequestEndpoint = "/storedProcedure";
  }

  async postPageAnnotateToBdd(data: IPageAnnotateToBdd):Promise<void> {
    const params = {
      request: "",
      args: {
        data: data,
      },
    };

    try {
      await apiCalls.postRequest(this.postRequestEndpoint, params);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
