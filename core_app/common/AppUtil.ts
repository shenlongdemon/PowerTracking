// @ts-ignore
import {CONSTANTS} from './Constants';
import {Logger} from './Logger';
const safeJsonStringify = require('safe-json-stringify');

export class AppUtil {
  static genAppKey = (): string => {
    return `{uuidv4()}`;
  };

  static parseValidNumber = (val: number): number => {
    if (!!val) {
      return isNaN(val) ? 0 : val;
    }

    return 0;
  };

  static now = (): number => {
    const date: Date = new Date();
    return date.getTime();
  };
  static dateTimeNow = (): number => {
    const date: number = AppUtil.now() / 1000;
    return Math.round(date);
  };

  static transformByJSON = <T, U>(sdo: U): T | null => {
    try {
      return JSON.parse(JSON.stringify(sdo)) as T;
    } catch (e) {
      return null;
    }
  };

  static cloneObject<T>(obj: T, type: {new (): T}): T {
    const t: T = new type();
    Object.assign(t, obj);
    return t;
  }

  static clone = (src: any): any => {
    const cloneObj: any = {};
    for (const attr in src) {
      if (typeof src[attr] === 'object') {
        cloneObj[attr] = AppUtil.clone(src[attr]);
      } else {
        cloneObj[attr] = src[attr];
      }
    }
    return cloneObj;
  };

  static cmpVersion = (cmpVersion: any, latestVersion: any): boolean => {
    const a = `${cmpVersion}`.split('.');
    const b = `${latestVersion}`.split('.');
    let cmp;
    const len = Math.max(a.length, b.length);
    for (let i = 0; i < len; i += 1) {
      if (a[i] === undefined) {
        a[i] = '0';
      }
      if (b[i] === undefined) {
        b[i] = '0';
      }
      cmp = parseInt(a[i], 10) - parseInt(b[i], 10);
      if (cmp !== 0) {
        return cmp < 0;
      }
    }
    return false;
  };

  static isEmail = (email: string): boolean => {
    return CONSTANTS.EMAIL_REGEX.test(email);
  };

  static isEmoji = (text: string): boolean => {
    return CONSTANTS.EMOJI_REGEX.test(text);
  };

  static sleep = async (ms: number): Promise<{}> => {
    Logger.log(`================= DELAY : ${ms} ==============`);
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  static checkInteger = (val: string): string => {
    try {
      let str = val.trim();
      if (!str) {
        return CONSTANTS.STR_EMPTY;
      }
      str = str.replace(/^0+/, '') || '0';
      const n: number = Math.floor(Number(str));
      return n !== Infinity && String(n) === str && n >= 0 && !isNaN(n)
        ? str
        : CONSTANTS.STR_EMPTY;
    } catch (e) {
      return CONSTANTS.STR_EMPTY;
    }
  };

  static parseNumber = (data: string): number => {
    return Number(data);
  };

  static formatDefaultNumber = (num: number): string => {
    const str: string = new Intl.NumberFormat(CONSTANTS.EN_LOCALE, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
    return str;
  };

  static parseInt = (str: string): number => {
    return parseInt(str, 10);
  };

  static sortLatestItemsByID(items: any[]): any[] {
    items.sort((a, b) => {
      const aId = parseInt(a.id, 10);
      const bId = parseInt(b.id, 10);

      return aId < bId ? 1 : aId > bId ? -1 : 0;
    });

    return items;
  }

  static formatPrice = (price: number): string => {
    const str: string = new Intl.NumberFormat(CONSTANTS.DEFAULT_LOCALE, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      style: 'currency',
      currency: CONSTANTS.DEFAULT_CURRENCY,
    }).format(price);
    return str;
  };

  static mappingList = <T>(
    items: any[] | null | undefined,
    type: {new (): T} | null = null,
  ): T[] => {
    const ts: T[] = [];
    if (!!items) {
      const tData: (T | null)[] = items.map((d: any | null | undefined) => {
        return AppUtil.mappingObject(d, type);
      });

      tData.forEach((o: T | null) => {
        if (o) {
          ts.push(o);
        }
      });
    }
    return ts;
  };

  static mappingObject = <T>(
    data: any | null | undefined,
    type: {new (): T} | null = null,
  ): T | null => {
    if (!data) {
      return null;
    }
    if (type) {
      const t: T = new type();
      Object.assign(t, data);
      return t;
    }
    return AppUtil.transformByJSON(data);
  };

  static toJONString(obj: any): string {
    try {
      return JSON.stringify(obj);
    } catch (e) {
      return safeJsonStringify(obj);
    }
  }

  static toJSON(str: string): any | null {
    try {
      return JSON.parse(str);
    } catch (e) {}
    return null;
  }
  static tryParseNumber(value: any, defaultVal: number): number {
    if (AppUtil.isNumber(value)) {
      const num: number = AppUtil.parseInt(`${value}`);
      if (isNaN(num)) {
        return defaultVal;
      }
      return num;
    }
    return defaultVal;
  }

  static isNumber(value: any): boolean {
    return (
      value !== undefined &&
      value !== null &&
      value !== CONSTANTS.STR_EMPTY &&
      !isNaN(Number(value.toString()))
    );
  }

  static isInteger(value: any): boolean {
    return AppUtil.isNumber(value) && Number.isInteger(value);
  }

  static convertStringToIntString(value: string, separator: string): string {
    const str: string[] = [];
    for (let i = 0; i < value.length; i += 1) {
      str.push(`${value.charCodeAt(i)}`);
    }
    return str.join(separator);
  }
  static convertStringToTotalInt(value: string): number {
    let num: number = 0;
    for (let i = 0; i < value.length; i += 1) {
      num += value.charCodeAt(i);
    }
    return num;
  }

  static isObjectEmpty(obj: Object | null) {
    return !obj || Object.keys(obj).length === 0;
  }

  static parallel(values: Iterable<any | PromiseLike<any>>): void {
    Promise.all(values);
  }

  static runTimeOut<TAll>(value: () => Promise<TAll>): void {
    setTimeout(async (): Promise<void> => {
      await value();
    }, 1000);
  }
  static runAfter<TAll>(value: () => Promise<TAll>, mili: number): void {
    setTimeout(async (): Promise<void> => {
      await value();
    }, mili);
  }

  static async resolve<T>(value: any): Promise<T> {
    return Promise.resolve<T>(value);
  }

  static groupBy(items: any[], key: string): any {
    return items.reduce(
      (result, item) => ({
        ...result,
        [item[key]]: [...(result[item[key]] || []), item],
      }),
      {},
    );
  }

  static runAsync(promise: Promise<void>): void {
    setTimeout(async (): Promise<void> => {
      await promise;
    }, 1);
  }

  static distinct(array: any[]): any[] {
    return [...new Set(array)];
  }

  static getProperties(obj: any): string[] {
    if (!obj) {
      return [];
    }
    return Object.keys(obj);
  }
  static flatArray(arrayOfArray: any[][]): any[] {
    return [].concat(
      ...arrayOfArray.map((d: any[]): any => {
        return d;
      }),
    );
  }
}
