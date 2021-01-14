/// <reference path="../infrastructure/services/AuthService.ts" />

import {UserLoginDto} from 'core_app/services/dto';
import {IHandleDataService} from 'core_app/services/IHandleDataService';

export interface IAuthService extends IHandleDataService {
  login(phone: string, password: string): Promise<UserLoginDto>;

  isLoggedIn(): Promise<boolean>;

  logOut(): Promise<boolean>;
}
