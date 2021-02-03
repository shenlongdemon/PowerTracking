import {AddIMEIData} from 'src/redux/models/AddIMEIData';
import {FieldData} from 'core_app/services';
import {IMEIData} from 'src/redux/models/IMEIData';
import {GroupIMEIData} from 'src/redux/models/GroupIMEIData';
import {AppUtil, CONSTANTS} from 'core_app/common';
import {GSDL_REDUCER_ACTION, GSDLAction} from './GSDLReducer';

export enum ACTION_GSDL_REDUCER_ACTION {
  UNKNOWN = 'UNKNOWN',
  FIELD_SELECTED = 'FIELD_SELECTED',
  FIELD_UNSELECTED = 'FIELD_UNSELECTED',
  MAIN_GROUP_SELECTED = 'MAIN_GROUP_SELECTED',
  IMEI_SELECTED = 'IMEI_SELECTED',
}

export interface ActionGSDLAction<T> {
  type: any;
  data: T;
}

export const actFieldSelected = (field: string): ActionGSDLAction<string> => {
  return {
    type: ACTION_GSDL_REDUCER_ACTION.FIELD_SELECTED,
    data: field,
  };
};
export const actFieldUnSelected = (field: string): ActionGSDLAction<string> => {
  return {
    type: ACTION_GSDL_REDUCER_ACTION.FIELD_UNSELECTED,
    data: field,
  };
};

export const actIMEISelected = (imei: string): GSDLAction<string> => {
  return {
    type: ACTION_GSDL_REDUCER_ACTION.IMEI_SELECTED,
    data: imei,
  };
};

export const actMainGroupSelected = (mainGroup: string): GSDLAction<string> => {
  return {
    type: ACTION_GSDL_REDUCER_ACTION.MAIN_GROUP_SELECTED,
    data: mainGroup,
  };
};
interface ActionGSDLReduxState {
  type: ACTION_GSDL_REDUCER_ACTION;
  fields: string[];
  mainGroup: string;
  imei: string;
}

const initialState: ActionGSDLReduxState = {
  type: ACTION_GSDL_REDUCER_ACTION.UNKNOWN,
  fields: [],
  mainGroup: CONSTANTS.STR_EMPTY,
  imei: CONSTANTS.STR_EMPTY,
};

const actionGSDLReducer = (
  state = initialState,
  action: ActionGSDLAction<any>,
): ActionGSDLReduxState => {
  switch (action.type) {
    case ACTION_GSDL_REDUCER_ACTION.MAIN_GROUP_SELECTED:
      const mainGroup: string = action.data as string;
      return {
        ...state,
        fields: [],
        mainGroup,
      };
    case ACTION_GSDL_REDUCER_ACTION.IMEI_SELECTED:
      const imei: string = action.data as string;
      return {
        ...state,
        imei,
        fields: [],
        mainGroup: CONSTANTS.STR_EMPTY,
      };
    case ACTION_GSDL_REDUCER_ACTION.FIELD_SELECTED: {
      const field: string = action.data as string;
      return {
        ...state,
        fields: AppUtil.distinct([...state.fields, field]),
      };
    }
    case ACTION_GSDL_REDUCER_ACTION.FIELD_UNSELECTED: {
      const field: string = action.data as string;
      return {
        ...state,
        fields: state.fields.filter((f: string): boolean => {
          return f !== field;
        }),
      };
    }
    default:
      return state;
  }
};

export default actionGSDLReducer;
