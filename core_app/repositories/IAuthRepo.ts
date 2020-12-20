/// <reference path="../infrastructure/repositories/AuthRepo.ts/" />

import {UserLoginSdo} from 'core_app/repositories/sdo';

export interface IAuthRepo {
  login(phone: string, password: string): Promise<UserLoginSdo>;
}
