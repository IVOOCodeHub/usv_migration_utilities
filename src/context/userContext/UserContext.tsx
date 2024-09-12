import { ReactElement, Dispatch, SetStateAction, Context } from "react";
import { createContext, useState, useEffect } from "react";
import { IUserCredentials } from "../../API/interfaces/user.interface.ts";
import { UserService } from "../../API/services/user.service";

// services
const userService = new UserService();

// Define IUserContext interface
interface IUserContext {
  matricule: string;
  setMatricule: Dispatch<SetStateAction<string>>;
  getUserCredentials: () => Promise<void>;
  userCredentials: IUserCredentials | null;
  setUserCredentials: Dispatch<SetStateAction<IUserCredentials | null>>;
}

// Set up context with proper default values
export const UserContext: Context<IUserContext> = createContext<IUserContext>({
  matricule: "",
  setMatricule: () => {
    throw new Error("setMatricule not initialized");
  },
  getUserCredentials: () => {
    throw new Error("getUserCredentials not initialized");
  },
  userCredentials: null,
  setUserCredentials: () => {
    throw new Error("setUserCredentials not initialized");
  },
});

export const UserProvider = ({ children }: { children: ReactElement }) => {
  const [matricule, setMatricule] = useState<string>("");
  const [userCredentials, setUserCredentials] =
    useState<IUserCredentials | null>(null);

  useEffect(() => {
    getUserCredentials();
  }, [matricule]);

  const getUserCredentials = async () => {
    if (matricule) {
      const request = await userService.getUser(matricule);
      setUserCredentials({
        userID: request.Ident,
        password: request.Password,
      });
    }
  };

  return (
    <UserContext.Provider
      value={{
        matricule,
        setMatricule,
        getUserCredentials,
        userCredentials,
        setUserCredentials,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
