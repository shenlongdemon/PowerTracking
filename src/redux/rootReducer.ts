import GSDLReducer from 'src/redux/GSDLReducer';
import uiReducer from 'src/redux/UIReducer';
import {combineReducers} from 'redux';

export const rootReducer = combineReducers({
  gsdlReducer: GSDLReducer,
  ui: uiReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
