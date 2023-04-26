import { createContext } from "react";

interface ContextProps {
  isSideMenuVisible: boolean;
  handleSideMenuVisibility: () => void;
}

export const UIContext = createContext({} as ContextProps);
