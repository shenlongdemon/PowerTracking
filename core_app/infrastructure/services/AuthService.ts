import {
  BaseService,
  IAuthService,
  IStore,
  User,
  UserLoginDto,
} from 'core_app/services';

import {inject, injectable} from 'inversify';
import {PRIVATE_TYPES, PUBLIC_TYPES} from 'core_app/infrastructure/Identifiers';
import {IAuthRepo, UserLoginSdo} from 'core_app/repositories';
import {CONSTANTS, Logger, STATE_ACTION} from 'core_app/common';

@injectable()
export class AuthService extends BaseService implements IAuthService {
  @inject(PRIVATE_TYPES.IAuthRepo) private authRepo!: IAuthRepo;
  @inject(PUBLIC_TYPES.IStore) private store!: IStore;

  async login(phone: string, password: string): Promise<UserLoginDto> {
    Logger.log(`AuthService login ${phone} ${password}`);
    const sdo: UserLoginSdo = await this.authRepo.login(phone, password);
    let isLoggedIn: boolean = false;
    let user: User | null = null;
    if (sdo.isSuccess && !!sdo.user) {
      isLoggedIn = true;
      user = {
        ...sdo.user,
      };
      await this.store.setUser(user);
    }
    return {
      ...this.populateAction(sdo, user, STATE_ACTION.UPDATE_USER),
      isLoggedIn,
      user,
    };
  }

  async isLoggedIn(): Promise<boolean> {
    const user: User | null = await this.store.getUser();
    Logger.log(`AuthService isLoggedIn user`, user);
    return !!this.populateData(user, STATE_ACTION.UPDATE_USER);
  }

  async logOut(): Promise<boolean> {
    await this.store.setUser(null);
    return true;
  }
}
