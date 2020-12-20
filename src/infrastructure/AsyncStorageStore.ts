import {CONSTANTS, IStore, STORAGE_KEYS} from 'core_app';

import {injectable} from 'inversify';
import {BaseAsyncStorage} from 'src/infrastructure/BaseAsyncStorage';

@injectable()
export class AsyncStorageStore extends BaseAsyncStorage implements IStore {
  getAccessToken(): Promise<string> {
    return this.getItem(STORAGE_KEYS.ACCESS_TOKEN, CONSTANTS.STR_EMPTY);
  }

  async setAccessToken(accessToken: string): Promise<void> {
    await this.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
  }
}
