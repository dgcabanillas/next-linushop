import { UIState } from './';
import { UIActionType } from './ui.types';
import { ActionType } from '../../interfaces';

export const uiReducer = (state: UIState, action: ActionType): UIState => {
  switch(action.type) {
    case UIActionType.TOGGLE_SIDE_MENU:
      return {
        ...state,
        isMenuOpen: !state.isMenuOpen
      }
    default:
      return state;
  }
}
