// types
import { IPageAnnotateToBdd } from "../interfaces/pageAnnotateToBdd.interface.ts";

import { APICalls } from "../APICalls.ts";
import { IUserCredentials } from "../interfaces/user.interface.ts";
const apiCalls = new APICalls();

export class PageAnnotateToBddService {
  postRequestEndpoint: string;

  constructor() {
    this.postRequestEndpoint = "/storedProcedure";
  }

  async postPageAnnotateToBdd(
    userCredentials: IUserCredentials,
    data: IPageAnnotateToBdd,
  ): Promise<void> {
    const params = {
      ...userCredentials,
      request: "create_edit_arbo_usv_page_components",
      args: data,
    };

    try {
      await apiCalls.postRequest(this.postRequestEndpoint, params);
      return window.history.back();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
