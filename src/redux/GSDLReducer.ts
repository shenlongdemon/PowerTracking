import {AddIMEIData} from 'src/redux/models/AddIMEIData';
import {Action} from 'redux';
export enum GSDL_REDUCER_ACTION {
  UNKNOWN = 'UNKNOWN',
  ADD_IMEI_DATA = 'ADD_IMEI_DATA',
}

export const addIMEIDataAction = (data: AddIMEIData): GSDLReduxState => {
  return {
    type: GSDL_REDUCER_ACTION.ADD_IMEI_DATA,
    data,
  };
};

export interface GSDLReduxState {
  type: GSDL_REDUCER_ACTION;
  data: AddIMEIData | null;
}

const initialState: GSDLReduxState = {
  type: GSDL_REDUCER_ACTION.UNKNOWN,
  data: null,
};

const GSDLReducer = (
  state = initialState,
  action: GSDLReduxState,
): GSDLReduxState => {
  switch (action.type) {
    case GSDL_REDUCER_ACTION.ADD_IMEI_DATA:
      const act: GSDLReduxState = {...action};
      return {
        ...act,
      };
    default:
      return state;
  }
};

export default GSDLReducer;
