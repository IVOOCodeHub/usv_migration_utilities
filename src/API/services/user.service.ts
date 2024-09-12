// types
import { IUserCredentials } from "../interfaces/user.interface.ts";


export class UserService {
  postUserEndpoint: string;

  constructor() {
    this.postUserEndpoint = "http://192.168.0.112/Public/script_tlv_v14/getTOIdent.php";
  }

  async getUser(userMatricule: IUserCredentials["userID"]) {
    const response = await fetch(this.postUserEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        matricule: userMatricule,
      }),
    });

    if (!response.ok) {
      const error: Error = new Error("Network response was not ok");
      console.error(error);
      throw error;
    }

    return response.json();
  }
}
