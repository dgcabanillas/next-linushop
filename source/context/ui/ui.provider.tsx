import React, { FC, ReactNode, useReducer } from 'react'
import { UIContext } from './';
import { uiReducer } from './ui.reducer';
import { UIActionType } from './ui.types';

export interface UIState {
  isMenuOpen: boolean
}

const UI_INITIAL_STATE: UIState = {
  isMenuOpen: false
}

interface IProps {
  children?: ReactNode | undefined;
}

export const UIProvider: FC<IProps> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const toggleSideMenu = () => {
    dispatch({ type: UIActionType.TOGGLE_SIDE_MENU })
  }

  return (
    <UIContext.Provider
      value={{ 
        ...state,
        toggleSideMenu
      }}
    >
      { children }
    </UIContext.Provider>
  )
}
