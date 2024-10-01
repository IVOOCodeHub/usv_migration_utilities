// types
import { Context, ReactElement } from "react";
import { IComponentDictionary } from "../../API/interfaces/componentsDictionary.interface.ts";
interface IDictionaryContext {
  componentsDictionary: IComponentDictionary[] | null;
  getComponentsDictionary: () => Promise<void>;
}

// hooks | libraries
import { createContext, useState } from "react";

// service
import { DictionaryService } from "../../API/services/dictionary.service.ts";
const dictionaryService = new DictionaryService();

export const DictionaryContext: Context<IDictionaryContext> =
  createContext<IDictionaryContext>({
    componentsDictionary: null,
    getComponentsDictionary: (): Promise<void> => {
      throw new Error("getComponentsDictionary not initialized");
    },
  });

export const DictionaryProvider = ({
  children,
}: {
  children: ReactElement;
}): ReactElement => {
  const [componentsDictionary, setComponentsDictionary] = useState<
    IComponentDictionary[]
  >([]);

  const getComponentsDictionary: () => Promise<void> =
    async (): Promise<void> => {
      const req: IComponentDictionary[] =
        await dictionaryService.getComponentsDictionary();
      setComponentsDictionary(req);
    };

  return (
    <DictionaryContext.Provider
      value={{ componentsDictionary, getComponentsDictionary }}
    >
      {children}
    </DictionaryContext.Provider>
  );
};
