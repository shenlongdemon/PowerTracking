import {injectable} from 'inversify';
import {IGlobalState} from 'core_app/services';
import {STATE_ACTION} from 'core_app/common';
import {actUpdateUser} from 'src/redux/AuthReducer';
import store from 'src/redux/Store';
import {actSetIMEIData, actSetIMEISInfo} from 'src/redux/GSDLReducer';
import {
  actFieldSelected,
  actFieldUnSelected,
  actIMEISelected,
  actMainGroupSelected,
} from 'src/redux/ActionGSDLReducer';

@injectable()
export default class GlobalState implements IGlobalState {
  private map: Map<STATE_ACTION, any[]> = new Map<STATE_ACTION, any[]>([
    [STATE_ACTION.UPDATE_USER, [actUpdateUser]],
    [STATE_ACTION.MAIN_GROUP_SELECTED, [actMainGroupSelected]],
    [STATE_ACTION.IMEI_SELECTED, [actIMEISelected]],
    [STATE_ACTION.SET_IMEI_DATA, [actSetIMEIData]],
    [STATE_ACTION.SET_IMEI_S_INFO, [actSetIMEISInfo]],
    [STATE_ACTION.FIELD_SELECTED, [actFieldSelected]],
    [STATE_ACTION.FIELD_UNSELECTED, [actFieldUnSelected]],
  ]);

  do(action: STATE_ACTION, data: any): void {
    const func: any[] | null | undefined = this.map.get(action);
    if (!!func) {
      func.forEach((f: any): void => {
        store.dispatch(f(data));
      });
    }
  }
}
