import {combineReducers} from 'redux';
import authReducer from 'src/redux/AuthReducer';
import gsdlReducer from 'src/redux/GSDLReducer';
import uiReducer from 'src/redux/UIReducer';

export const rootReducer = combineReducers({
  gsdlReducer: gsdlReducer,
  ui: uiReducer,
  auth: authReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
