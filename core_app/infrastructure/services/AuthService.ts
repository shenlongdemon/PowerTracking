import {
  BaseService,
  IAuthService,
  IStore,
  UserLoginDto,
} from 'core_app/services';

import {inject, injectable} from 'inversify';
import {PRIVATE_TYPES, PUBLIC_TYPES} from 'core_app/infrastructure/Identifiers';
import {IAuthRepo, UserLoginSdo} from 'core_app/repositories';
import {CONSTANTS, Logger} from 'core_app/common';

@injectable()
export class AuthService extends BaseService implements IAuthService {
  @inject(PRIVATE_TYPES.IAuthRepo) private authRepo!: IAuthRepo;
  @inject(PUBLIC_TYPES.IStore) private store!: IStore;
  async login(phone: string, password: string): Promise<UserLoginDto> {
    Logger.log(`AuthService login ${phone} ${password} `);
    const sdo: UserLoginSdo = await this.authRepo.login(phone, password);
    let isLoggedIn: boolean = false;
    if (sdo.isSuccess && sdo.accessToken !== CONSTANTS.STR_EMPTY) {
      isLoggedIn = true;
      await this.store.setAccessToken(sdo.accessToken);
    }
    return {...this.populate(sdo), isLoggedIn};
  }
  async isLoggedIn(): Promise<boolean> {
    const token: string = await this.store.getAccessToken();
    Logger.log(`AuthService isLoggedIn token ${token}`);
    return token !== CONSTANTS.STR_EMPTY;
  }
}
