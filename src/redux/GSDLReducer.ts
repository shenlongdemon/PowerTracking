import {AddIMEIData} from 'src/redux/models/AddIMEIData';
import {FieldData} from 'core_app/services';

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
  list: AddIMEIData[];
}

const initialState: GSDLReduxState = {
  type: GSDL_REDUCER_ACTION.UNKNOWN,
  data: null,
  list: [],
};

type GSDLAction = SetIMEIData;

const gsdlReducer = (
  state = initialState,
  action: GSDLAction,
): GSDLReduxState => {
  switch (action.type) {
    case GSDL_REDUCER_ACTION.SET_IMEI_DATA:
      const act: SetIMEIData = {...action};
      return {
        ...state,
        ...act,
        list: [...state.list, act.data],
      };
    default:
      return state;
  }
};

export default gsdlReducer;
