import {AddIMEIData} from 'src/redux/models/AddIMEIData';
import {Action} from 'redux';
import {User} from 'core_app/services';
export enum AUTH_REDUCER_ACTION {
  UNKNOWN = 'UNKNOWN',
  UPDATE_USER = 'UPDATE_USER',
}

export const actUpdateUser = (user: User | null): AuthReduxState => {
  return {
    type: AUTH_REDUCER_ACTION.UPDATE_USER,
    user,
  };
};

export interface AuthReduxState {
  type: AUTH_REDUCER_ACTION;
  user: User | null;
}

const initialState: AuthReduxState = {
  type: AUTH_REDUCER_ACTION.UNKNOWN,
  user: null,
};

const authReducer = (
  state = initialState,
  action: AuthReduxState,
): AuthReduxState => {
  switch (action.type) {
    case AUTH_REDUCER_ACTION.UPDATE_USER:
      const act: AuthReduxState = {...action};
      return {
        ...act,
      };
    default:
      return state;
  }
};

export default authReducer;
