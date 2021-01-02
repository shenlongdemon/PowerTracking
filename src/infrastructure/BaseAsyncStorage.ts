import {CONSTANTS, Logger} from '../../core_app/common';
import {injectable} from 'inversify';
import AsyncStorage from '@react-native-async-storage/async-storage';

@injectable()
export class BaseAsyncStorage {
  static STORE_STATE = {};

  async setItem(key: string, value: string): Promise<void> {
    await AsyncStorage.setItem(key, value);
    BaseAsyncStorage.STORE_STATE[key] = value;
  }

  setItems = async (
    keyValuePairs: {key: string; data: any}[],
  ): Promise<number> => {
    await AsyncStorage.multiSet(
      keyValuePairs.map((i: {key: string; data: any}): string[] => {
        return [i.key, this.toString(i.data)];
      }),
    );
    return keyValuePairs.length;
  };

  async saveObject(key: string, data: any | null): Promise<void> {
    const json: string = !!data ? this.toString(data) : CONSTANTS.STR_EMPTY;
    await this.setItem(key, json);
  }

  getItem = async (key: string, defaultValue: string): Promise<string> => {
    const value: string | null = await AsyncStorage.getItem(key);
    return value || defaultValue;
  };

  getObjectsByWildcard = async <T>(wildcard: string): Promise<T[]> => {
    return this.getObjectsByWildcards<T>([wildcard]);
  };

  protected getObjectsByKeys = async <T>(keys: string[]): Promise<T[]> => {
    const data: [string, string | null][] = await AsyncStorage.multiGet(keys);
    const res: T[] = [];
    for (let i = 0; i < data.length; i = i + 1) {
      const d: [string, string | null] = data[i];
      if (!!d[1]) {
        const obj: T | null = this.parseJsonToObject(d[1]);
        if (!!obj) {
          res.push(obj!);
        }
      }
    }
    return res;
  };

  getObjectsByWildcards = async <T>(wildcards: string[]): Promise<T[]> => {
    const keys: string[] = await this.getKeysByEveryWildcards(wildcards);
    return this.getObjectsByKeys<T>(keys);
  };

  getObjectClassesByWildCard = async <T>(
    wildcard: string,
    type: {new (): T} | null = null,
  ): Promise<T[]> => {
    const data: T[] = await this.getObjectsByWildcard<T>(wildcard);
    return data.map(
      (d: T): T => {
        return !!type ? Object.assign(new type(), d) : d;
      },
    );
  };
  getObjectClassesByWildCards = async <T>(
    wildcards: string[],
    type: {new (): T} | null = null,
  ): Promise<T[]> => {
    const keys: string[] = await this.getKeysByEveryWildcards(wildcards);
    const data: T[] = await this.getObjectsByKeys<T>(keys);
    return data.map(
      (d: T): T => {
        return !!type ? Object.assign(new type(), d) : d;
      },
    );
  };

  getObject = async <T>(key: string): Promise<T | null> => {
    const json: string = await this.getItem(key, CONSTANTS.STR_EMPTY);
    const item: T | null = this.parseJsonToObject(json);
    return item;
  };

  getObjectClass = async <T>(
    key: string,
    type: {new (): T} | null = null,
  ): Promise<T | null> => {
    const json: string = await this.getItem(key, CONSTANTS.STR_EMPTY);
    const item: T | null = this.parseJsonToObject(json);
    if (!!item && !!type) {
      return Object.assign(new type(), item);
    }
    return item;
  };

  removeItemsByWildCard = async (wildCards: string[]): Promise<void> => {
    const keys: string[] = await this.getKeysBySomeWildcards(wildCards);
    await AsyncStorage.multiRemove(keys);
  };

  removeItem = async (key: string): Promise<void> => {
    await AsyncStorage.removeItem(key);
  };

  protected getKeysByEveryWildcards = async (
    wildcard: string[],
  ): Promise<string[]> => {
    if (wildcard.length === 0) {
      return [];
    }
    const keys: string[] = await AsyncStorage.getAllKeys();

    const matchedKeys: string[] = keys.filter((key: string): boolean => {
      return wildcard.every((element) => key.indexOf(element) !== -1);
    });
    Logger.log(
      `BaseAsyncStorage getKeysByEveryWildcards`,
      wildcard,
      matchedKeys,
    );
    return matchedKeys;
  };

  protected getKeysBySomeWildcards = async (
    wildcard: string[],
  ): Promise<string[]> => {
    if (wildcard.length === 0) {
      return [];
    }
    const keys: string[] = await AsyncStorage.getAllKeys();

    const matchedKeys: string[] = keys.filter((key: string): boolean => {
      return wildcard.some((element) => key.indexOf(element) !== -1);
    });
    return matchedKeys;
  };

  protected parseJsonToObject = <T>(json: string | null): T | null => {
    let item: T | null = null;

    if (!!json && json !== CONSTANTS.STR_EMPTY) {
      try {
        item = JSON.parse(json);
      } catch (e) {
        item = null;
      }
    }
    return item;
  };

  protected toString = (data: any) => {
    const json: string = JSON.stringify(data);
    return json;
  };
  // type: { new (): T }
  protected parseJsonToObjectClass = <T>(
    json: string | null,
    type: {new (): T},
  ): T | null => {
    let item: T | null = null;

    if (!!json && json !== CONSTANTS.STR_EMPTY) {
      try {
        item = JSON.parse(json);
        item = this.mappingObjectClass<T>(item, type);
      } catch (e) {
        item = null;
      }
    }
    return item;
  };

  protected mappingObjectClass<T>(obj: any, type: {new (): T}): T {
    return Object.assign(new type(), obj);
  }
}
