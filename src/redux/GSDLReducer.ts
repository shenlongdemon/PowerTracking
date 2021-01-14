import {AddIMEIData} from 'src/redux/models/AddIMEIData';
import {FieldData} from 'core_app/services';
import {IMEIData} from 'src/redux/models/IMEIData';
import {FieldIMEIData} from 'src/redux/models/FieldIMEIData';
import {GroupIMEIData} from 'src/redux/models/GroupIMEIData';
import {CONSTANTS} from 'core_app/common';
import {AUTH_REDUCER_ACTION, AuthReduxState} from 'src/redux/AuthReducer';

export enum GSDL_REDUCER_ACTION {
  UNKNOWN = 'UNKNOWN',
  SET_IMEI_DATA = 'SET_IMEI_DATA',
  SET_IMEI_S_INFO = 'SET_IMEI_S_INFO',
  MAIN_GROUP_SELECTED = 'MAIN_GROUP_SELECTED',
  IMEI_SELECTED = 'IMEI_SELECTED',
}

//#region IMEIData
export interface SetIMEIData {
  type: typeof GSDL_REDUCER_ACTION.SET_IMEI_DATA;
  data: AddIMEIData;
}

export const actSetIMEIData = (data: AddIMEIData): SetIMEIData => {
  return {
    type: GSDL_REDUCER_ACTION.SET_IMEI_DATA,
    data,
  };
};
//#endregion
// #region IMEI S Info
export interface SetIMEISInfo {
  type: typeof GSDL_REDUCER_ACTION.SET_IMEI_S_INFO;
  data: AddIMEIData;
}

export const actSetIMEISInfo = (data: AddIMEIData): SetIMEISInfo => {
  return {
    type: GSDL_REDUCER_ACTION.SET_IMEI_S_INFO,
    data,
  };
};
//#endregion

//#region IMEI
export interface SetIMEISelected {
  type: typeof GSDL_REDUCER_ACTION.IMEI_SELECTED;
  imei: string;
}

export const actIMEISelected = (imei: string): SetIMEISelected => {
  return {
    type: GSDL_REDUCER_ACTION.IMEI_SELECTED,
    imei,
  };
};
//#endregion

//#region MainGroup
export interface SetMainGroupSelected {
  type: typeof GSDL_REDUCER_ACTION.MAIN_GROUP_SELECTED;
  mainGroup: string;
}

export const actMainGroupSelected = (
  mainGroup: string,
): SetMainGroupSelected => {
  return {
    type: GSDL_REDUCER_ACTION.MAIN_GROUP_SELECTED,
    mainGroup,
  };
};
//#endregion

interface GSDLReduxState {
  type: GSDL_REDUCER_ACTION;
  data: AddIMEIData | null;
  list: IMEIData[];
  mainGroup: string;
  imei: string;
  imeiSInfo: {[key: string]: any};
}

const initialState: GSDLReduxState = {
  type: GSDL_REDUCER_ACTION.UNKNOWN,
  data: null,
  list: [],
  mainGroup: CONSTANTS.STR_EMPTY,
  imei: CONSTANTS.STR_EMPTY,
  imeiSInfo: {},
};

type GSDLAction =
  | SetIMEIData
  | SetMainGroupSelected
  | SetIMEISelected
  | SetIMEISInfo;

const gsdlReducer = (
  state = initialState,
  action: GSDLAction,
): GSDLReduxState => {
  switch (action.type) {
    case GSDL_REDUCER_ACTION.SET_IMEI_DATA:
      return handle_SET_IMEI_DATA(state, action);
    case GSDL_REDUCER_ACTION.SET_IMEI_S_INFO:
      return handle_SET_IMEI_S_INFO(state, action);
    case GSDL_REDUCER_ACTION.MAIN_GROUP_SELECTED:
      return {
        ...state,
        mainGroup: action.mainGroup,
      };
    case GSDL_REDUCER_ACTION.IMEI_SELECTED:
      return {
        ...state,
        imei: action.imei,
      };
    default:
      return state;
  }
};

const handle_SET_IMEI_S_INFO = (
  state: GSDLReduxState,
  action: GSDLAction,
): GSDLReduxState => {
  const act: SetIMEIData = {...action} as SetIMEIData;
  const fieldData: FieldData = act.data.data as FieldData;
  let imeiSInfo: any = state.imeiSInfo;
  if (!imeiSInfo) {
    imeiSInfo = {};
  }
  if (!imeiSInfo[act.data.imei]) {
    imeiSInfo[act.data.imei] = {};
  }
  imeiSInfo[act.data.imei][fieldData.field] = fieldData.data;
  return {
    ...state,
    imeiSInfo,
  };
};

const handle_SET_IMEI_DATA = (
  state: GSDLReduxState,
  action: GSDLAction,
): GSDLReduxState => {
  const act: SetIMEIData = {...action} as SetIMEIData;
  const fieldData: FieldData = act.data.data as FieldData;
  let imeiData: IMEIData | null =
    state.list.find((id: IMEIData): boolean => {
      return id.imei === act.data.imei && id.mainGroup === act.data.mainGroup;
    }) || null;
  if (!!imeiData) {
    const groupIMEIData: GroupIMEIData | null =
      imeiData.groups.find((gid: GroupIMEIData): boolean => {
        return gid.group === act.data.group;
      }) || null;
    if (!!groupIMEIData) {
      groupIMEIData.fields = [...groupIMEIData.fields, fieldData].slice(-100);
      // imeiData.groups = [...imeiData.groups, groupIMEIData];
    } else {
      imeiData.groups = [
        ...imeiData.groups,
        {
          group: act.data.group,
          fields: [fieldData],
        },
      ];
    }
    return {
      ...state,
      ...act,
    };
  } else {
    imeiData = {
      imei: act.data.imei,
      mainGroup: act.data.mainGroup,
      groups: [
        {
          group: act.data.group,
          fields: [fieldData],
        },
      ],
    };
    return {
      ...state,
      ...act,
      list: [...state.list, imeiData],
    };
  }
};

export default gsdlReducer;
