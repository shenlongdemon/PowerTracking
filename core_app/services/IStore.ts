///<reference path="../../src/infrastructure/AsyncStorageStore.ts"/>

/**
 * Because it is local storage so i need to be implemented on RN or ReactJS
 *      - RN        uses AsyncStorage follow https://facebook.github.io/react-native/docs/asyncstorage
 *      - ReactJS   uses LocalStorage
 * Scope: singleton
 */
import {User} from 'core_app/services/model';

export interface IStore {
  getUser(): Promise<User | null>;
  setUser(user: User | null): Promise<void>;
}
