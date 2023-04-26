import { IUser } from "../../interfaces";
import { AuthState } from "./";

type AuthActionType =
  | {
      type: "[Auth] - Login";
      payload: IUser;
    }
  | {
      type: "[Auth] - Logout";
    }
  | {
      type: "[Auth] - Error";
      payload: string;
    };

export const authReducer = (
  state: AuthState,
  action: AuthActionType
): AuthState => {
  switch (action.type) {
    case "[Auth] - Error":
      return {
        ...state,
        errorMessage: action.payload,
        isAuthenticated: false,
        user: undefined,
      };

    case "[Auth] - Login":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        errorMessage: "",
      };

    case "[Auth] - Logout":
      return {
        ...state,
        isAuthenticated: false,
        user: undefined,
        errorMessage: "",
      };

    default:
      return state;
  }
};
