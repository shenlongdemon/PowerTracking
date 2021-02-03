import {AddIMEIData} from 'src/redux/models/AddIMEIData';
import {FieldData} from 'core_app/services';
import {IMEIData} from 'src/redux/models/IMEIData';
import {GroupIMEIData} from 'src/redux/models/GroupIMEIData';
import {AppUtil} from 'core_app/common';
export enum GSDL_REDUCER_ACTION {
  UNKNOWN = 'UNKNOWN',
  SET_IMEI_DATA = 'SET_IMEI_DATA',
  SET_IMEI_S_INFO = 'SET_IMEI_S_INFO',
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

interface GSDLReduxState {
  type: GSDL_REDUCER_ACTION;
  data: AddIMEIData | null;
  list: IMEIData[];
  imeiSInfo: {[key: string]: any};
  imeiSInfoProperties: string[];
}

const initialState: GSDLReduxState = {
  type: GSDL_REDUCER_ACTION.UNKNOWN,
  data: null,
  list: [],
  imeiSInfo: {},
  imeiSInfoProperties: [],
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
  const properties: string[] = AppUtil.getProperties(imeiSInfo[data.imei]);
  return {
    ...state,
    imeiSInfo,
    imeiSInfoProperties: properties,
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
        imeiData.imei === data.currentIMEI &&
        imeiData.mainGroup === data.currentMainGroup &&
        (data.currentFields || []).indexOf(fieldData.field) > -1;
      groupIMEIData.fields = [...groupIMEIData.fields, fieldData].slice(
        needDetail ? -200 : -10,
      );
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
