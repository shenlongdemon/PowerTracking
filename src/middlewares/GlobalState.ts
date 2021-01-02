import {injectable} from 'inversify';
import {IGlobalState, User} from 'core_app/services';
import {STATE_ACTION} from 'core_app/common';
import {actUpdateUser} from 'src/redux/AuthReducer';
import store from 'src/redux/Store';

@injectable()
export default class GlobalState implements IGlobalState {
  private map: Map<STATE_ACTION, any> = new Map<STATE_ACTION, any>([
    [STATE_ACTION.UPDATE_USER, actUpdateUser],
  ]);

  do(action: STATE_ACTION, data: any): void {
    const func: any | null | undefined = this.map.get(action);
    if (!!func) {
      store.dispatch(func(data));
    }
  }
}
