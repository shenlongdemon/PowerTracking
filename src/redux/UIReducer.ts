export enum UI_REDUCER_ACTION {
  SET_LOADING = 'SET_LOADING',
}
export interface UIReduxState {
  isLoading: boolean;
}

export const actSetLoading = (isLoading: boolean): SetLoadingAction => ({
  type: UI_REDUCER_ACTION.SET_LOADING,
  isLoading,
});

export interface SetLoadingAction {
  type: UI_REDUCER_ACTION;
  isLoading: boolean;
}

export type LoadingAction = SetLoadingAction;

const UIReducer = (
  state = {
    isLoading: false,
  },
  action: LoadingAction,
): UIReduxState => {
  switch (action.type) {
    case UI_REDUCER_ACTION.SET_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    default:
      return {...state};
  }
};

export default UIReducer;
