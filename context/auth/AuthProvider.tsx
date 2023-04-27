import Cookies from "js-cookie";
import { FC, useReducer, useEffect } from "react";
import tesloApi from "../../axios/audioRealmApi";
import { IUser } from "../../interfaces";
import { AuthContext, authReducer } from "./";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";

export interface AuthState {
  isAuthenticated: boolean;
  user?: IUser;
  errorMessage: string;
}

const Auth_INITIAL_STATE: AuthState = {
  isAuthenticated: false,
  user: undefined,
  errorMessage: "",
};

export const AuthProvider: FC = ({ children }) => {
  const { data, status } = useSession();
  const [state, dispatch] = useReducer(authReducer, Auth_INITIAL_STATE);
  const router = useRouter();

  // Check if user has logged in using auth0
  useEffect(() => {
    if (status === "authenticated") {
      dispatch({ type: "[Auth] - Login", payload: data?.user as IUser });
    }
  }, [status, data]);

  // Check if user has logged in using custom made auth
  useEffect(() => {
    if (Cookies.get("user")) {
      const user = Cookies.get("user");
      if (user) {
        const userObj = JSON.parse(user);
        dispatch({ type: "[Auth] - Login", payload: userObj.user as IUser });
      }
    }
  }, []);

  // Custom Made
  const onLogin = async (email: string, password: string) => {
    try {
      const { data } = await tesloApi.post("/user/login", { email, password });

      const { token, user } = data;
      Cookies.set("token", token);
      Cookies.set("user", JSON.stringify({ user }));
      dispatch({ type: "[Auth] - Login", payload: user });
      return true;
    } catch (error: any) {
      dispatch({
        type: "[Auth] - Error",
        payload: error.response.data.message,
      });

      setTimeout(() => {
        dispatch({
          type: "[Auth] - Error",
          payload: "",
        });
      }, 2500);

      return false;
    }
  };

  // Custom Made
  const onRegister = async (email: string, password: string, name: string) => {
    try {
      const { data } = await tesloApi.post("/user/register", {
        email,
        password,
        name,
      });

      const { token, user } = data;
      Cookies.set("token", token);
      dispatch({ type: "[Auth] - Login", payload: user });

      return true;
    } catch (error: any) {
      dispatch({
        type: "[Auth] - Error",
        payload: error.response.data.message,
      });

      setTimeout(() => {
        dispatch({
          type: "[Auth] - Error",
          payload: "",
        });
      }, 2500);

      return false;
    }
  };

  const onLogout = () => {
    Cookies.remove("address");
    Cookies.remove("address2");
    Cookies.remove("city");
    Cookies.remove("country");
    Cookies.remove("lastName");
    Cookies.remove("name");
    Cookies.remove("phoneNumber");
    Cookies.remove("postalCode");
    Cookies.remove("cart");
    Cookies.remove("token");
    Cookies.remove("user");
    router.push("/");
    signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        onLogin,
        onRegister,
        onLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
