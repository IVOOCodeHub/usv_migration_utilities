// types
import {
  IComponentsDictionary,
  IComponentDictionary,
} from "../interfaces/componentsDictionary.interface.ts";

export class DictionaryService {
  getDictionaryEndpoint: string;
  constructor() {
    this.getDictionaryEndpoint =
      "http://192.168.0.112/Public/usv_migration_utilities/getComponentsDictionary.php";
  }

  async getComponentsDictionary(): Promise<IComponentDictionary[]> {
    return fetch(this.getDictionaryEndpoint)
      .then(
        (response: Response): Promise<IComponentsDictionary> => response.json(),
      )
      .then(
        (data: IComponentsDictionary): IComponentDictionary[] =>
          data.components,
      )
      .catch((error): never => {
        console.error(error);
        throw error;
      });
  }
}
