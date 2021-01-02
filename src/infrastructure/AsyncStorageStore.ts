import {CONSTANTS, IStore, STORAGE_KEYS, User} from 'core_app';

import {injectable} from 'inversify';
import {BaseAsyncStorage} from 'src/infrastructure/BaseAsyncStorage';

@injectable()
export class AsyncStorageStore extends BaseAsyncStorage implements IStore {
  async setUser(user: User | null): Promise<void> {
    await this.saveObject(STORAGE_KEYS.USER, user);
  }
  async getUser(): Promise<User | null> {
    return this.getObject<User>(STORAGE_KEYS.USER);
  }
}
