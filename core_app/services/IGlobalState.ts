///<reference path="../../src/middlewares/GlobalState.ts"/>

import {STATE_ACTION} from 'core_app/common';

export interface IGlobalState {
  do(action: STATE_ACTION, data: any): void;
}
