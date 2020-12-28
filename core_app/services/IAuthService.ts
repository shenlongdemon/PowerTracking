/// <reference path="../infrastructure/services/AuthService.ts" />

import {UserLoginDto} from 'core_app/services/dto';

export interface IAuthService {
  login(phone: string, password: string): Promise<UserLoginDto>;

  isLoggedIn(): Promise<boolean>;

  logOut(): Promise<boolean>;
}
