import GSDLReducer from 'src/redux/GSDLReducer';
import {combineReducers} from 'redux';

export const rootReducer = combineReducers({
  gsdlReducer: GSDLReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
