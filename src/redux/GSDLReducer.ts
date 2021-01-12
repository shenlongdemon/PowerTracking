import {AddIMEIData} from 'src/redux/models/AddIMEIData';
import {FieldData} from 'core_app/services';
import {IMEIData} from 'src/redux/models/IMEIData';
import {FieldIMEIData} from 'src/redux/models/FieldIMEIData';
import {GroupIMEIData} from 'src/redux/models/GroupIMEIData';
import {CONSTANTS} from 'core_app/common';

export enum GSDL_REDUCER_ACTION {
  UNKNOWN = 'UNKNOWN',
  SET_IMEI_DATA = 'SET_IMEI_DATA',
}

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

interface GSDLReduxState {
  type: GSDL_REDUCER_ACTION;
  data: AddIMEIData | null;
  list: IMEIData[];
  mainGroup: string;
}

const initialState: GSDLReduxState = {
  type: GSDL_REDUCER_ACTION.UNKNOWN,
  data: null,
  list: [],
  mainGroup: CONSTANTS.STR_EMPTY,
};

type GSDLAction = SetIMEIData;

const gsdlReducer = (
  state = initialState,
  action: GSDLAction,
): GSDLReduxState => {
  switch (action.type) {
    case GSDL_REDUCER_ACTION.SET_IMEI_DATA:
      const act: SetIMEIData = {...action};
      const fieldData: FieldData = act.data.data as FieldData;
      let imeiData: IMEIData | null =
        state.list.find((id: IMEIData): boolean => {
          return (
            id.imei === act.data.imei && id.mainGroup === act.data.mainGroup
          );
        }) || null;
      if (!!imeiData) {
        const groupIMEIData: GroupIMEIData | null =
          imeiData.groups.find((gid: GroupIMEIData): boolean => {
            return gid.group === act.data.group;
          }) || null;
        if (!!groupIMEIData) {
          groupIMEIData.fields = [...groupIMEIData.fields, fieldData].slice(
            -100,
          );
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
    default:
      return state;
  }
};

export default gsdlReducer;
