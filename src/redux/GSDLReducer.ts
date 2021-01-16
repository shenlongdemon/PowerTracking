import {AddIMEIData} from 'src/redux/models/AddIMEIData';
import {FieldData} from 'core_app/services';
import {IMEIData} from 'src/redux/models/IMEIData';
import {GroupIMEIData} from 'src/redux/models/GroupIMEIData';
import {AppUtil, CONSTANTS} from 'core_app/common';

export enum GSDL_REDUCER_ACTION {
  UNKNOWN = 'UNKNOWN',
  SET_IMEI_DATA = 'SET_IMEI_DATA',
  SET_IMEI_S_INFO = 'SET_IMEI_S_INFO',
  MAIN_GROUP_SELECTED = 'MAIN_GROUP_SELECTED',
  IMEI_SELECTED = 'IMEI_SELECTED',
  FIELD_SELECTED = 'FIELD_SELECTED',
  FIELD_UNSELECTED = 'FIELD_UNSELECTED',
}

export interface GSDLAction<T> {
  type: any;
  data: T;
}

export const actSetIMEIData = (data: AddIMEIData): GSDLAction<AddIMEIData> => {
  return {
    type: GSDL_REDUCER_ACTION.SET_IMEI_DATA,
    data,
  };
};

export const actSetIMEISInfo = (data: AddIMEIData): GSDLAction<AddIMEIData> => {
  return {
    type: GSDL_REDUCER_ACTION.SET_IMEI_S_INFO,
    data,
  };
};

export const actIMEISelected = (imei: string): GSDLAction<string> => {
  return {
    type: GSDL_REDUCER_ACTION.IMEI_SELECTED,
    data: imei,
  };
};

export const actMainGroupSelected = (mainGroup: string): GSDLAction<string> => {
  return {
    type: GSDL_REDUCER_ACTION.MAIN_GROUP_SELECTED,
    data: mainGroup,
  };
};
export const actFieldSelected = (field: string): GSDLAction<string> => {
  return {
    type: GSDL_REDUCER_ACTION.FIELD_SELECTED,
    data: field,
  };
};
export const actFieldUnSelected = (field: string): GSDLAction<string> => {
  return {
    type: GSDL_REDUCER_ACTION.FIELD_UNSELECTED,
    data: field,
  };
};

interface GSDLReduxState {
  type: GSDL_REDUCER_ACTION;
  data: AddIMEIData | null;
  list: IMEIData[];
  mainGroup: string;
  imei: string;
  imeiSInfo: {[key: string]: any};
  fields: string[];
}

const initialState: GSDLReduxState = {
  type: GSDL_REDUCER_ACTION.UNKNOWN,
  data: null,
  list: [],
  mainGroup: CONSTANTS.STR_EMPTY,
  imei: CONSTANTS.STR_EMPTY,
  imeiSInfo: {},
  fields: [],
};

const gsdlReducer = (
  state = initialState,
  action: GSDLAction<any>,
): GSDLReduxState => {
  switch (action.type) {
    case GSDL_REDUCER_ACTION.SET_IMEI_DATA:
      return handle_SET_IMEI_DATA(state, action.data);
    case GSDL_REDUCER_ACTION.SET_IMEI_S_INFO:
      return handle_SET_IMEI_S_INFO(state, action.data);
    case GSDL_REDUCER_ACTION.MAIN_GROUP_SELECTED:
      const mainGroup: string = action.data as string;
      return {
        ...state,
        mainGroup,
        fields: [],
      };
    case GSDL_REDUCER_ACTION.IMEI_SELECTED:
      const imei: string = action.data as string;
      return {
        ...state,
        imei,
        mainGroup: CONSTANTS.STR_EMPTY,
        fields: [],
      };
    case GSDL_REDUCER_ACTION.FIELD_SELECTED: {
      const field: string = action.data as string;
      return {
        ...state,
        fields: AppUtil.distinct([...state.fields, field]),
      };
    }
    case GSDL_REDUCER_ACTION.FIELD_UNSELECTED: {
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

const handle_SET_IMEI_S_INFO = (
  state: GSDLReduxState,
  data: AddIMEIData,
): GSDLReduxState => {
  const fieldData: FieldData = data.data as FieldData;
  let imeiSInfo: any = state.imeiSInfo;
  if (!imeiSInfo) {
    imeiSInfo = {};
  }
  if (!imeiSInfo[data.imei]) {
    imeiSInfo[data.imei] = {};
  }
  imeiSInfo[data.imei][fieldData.field] = fieldData.data;
  return {
    ...state,
    imeiSInfo,
  };
};

const handle_SET_IMEI_DATA = (
  state: GSDLReduxState,
  data: AddIMEIData,
): GSDLReduxState => {
  const fieldData: FieldData = data.data as FieldData;
  let imeiData: IMEIData | null =
    state.list.find((id: IMEIData): boolean => {
      return id.imei === data.imei && id.mainGroup === data.mainGroup;
    }) || null;
  if (!!imeiData) {
    const groupIMEIData: GroupIMEIData | null =
      imeiData.groups.find((gid: GroupIMEIData): boolean => {
        return gid.group === data.group;
      }) || null;
    if (!!groupIMEIData) {
      const needDetail: boolean =
        imeiData.imei === state.imei &&
        imeiData.mainGroup === state.mainGroup &&
        state.fields.indexOf(fieldData.field) > -1;
      groupIMEIData.fields = [...groupIMEIData.fields, fieldData].slice(
        needDetail ? -200000 : -10,
      );
      // imeiData.groups = [...imeiData.groups, groupIMEIData];
    } else {
      imeiData.groups = [
        ...imeiData.groups,
        {
          group: data.group,
          unit: data.unit,
          fields: [fieldData],
        },
      ];
    }
    return {
      ...state,
    };
  } else {
    imeiData = {
      imei: data.imei,
      mainGroup: data.mainGroup,
      groups: [
        {
          group: data.group,
          unit: data.unit,
          fields: [fieldData],
        },
      ],
    };
    return {
      ...state,
      list: [...state.list, imeiData],
    };
  }
};

export default gsdlReducer;
