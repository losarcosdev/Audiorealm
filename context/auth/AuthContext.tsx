import { createContext } from "react";
import { IUser } from "../../interfaces/user";

interface ContextProps {
  isAuthenticated: boolean;
  user?: IUser;
  errorMessage: string;
  onLogin: (email: string, password: string) => Promise<boolean>;
  onRegister: (
    email: string,
    password: string,
    name: string
  ) => Promise<boolean>;
  onLogout: () => void;
}

export const AuthContext = createContext({} as ContextProps);
