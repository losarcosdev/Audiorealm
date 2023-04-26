import { UIState } from "./";

type UIActionType = { type: "[UI] - showSideMenu" };

export const uiReducer = (state: UIState, action: UIActionType): UIState => {
  switch (action.type) {
    case "[UI] - showSideMenu":
      return {
        ...state,
        isSideMenuVisible: !state.isSideMenuVisible,
      };

    default:
      return state;
  }
};
