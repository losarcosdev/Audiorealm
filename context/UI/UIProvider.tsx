import { FC, ReactElement, useReducer } from "react";
import { UIContext, uiReducer } from "./";

export interface UIState {
  isSideMenuVisible: boolean;
}

const UI_INITIAL_STATE: UIState = {
  isSideMenuVisible: false,
};

interface Props {
  children: ReactElement | ReactElement[];
}

export const UIProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const handleSideMenuVisibility = () => {
    dispatch({ type: "[UI] - showSideMenu" });
  };

  return (
    <UIContext.Provider
      value={{
        ...state,
        handleSideMenuVisibility,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
