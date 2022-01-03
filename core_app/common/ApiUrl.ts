import {ENV} from '../config';

const API = {
  USER_LOGIN: (): string => {
    return `${ENV.HOST}/login`;
  },
  GET_IMEI_LIST: (): string => {
    return `${ENV.HOST}/IMEIUser`;
  },
  GET_IMEI_DETAIL: (imei: string): string => {
    return `${ENV.HOST}/InfoIMEIUser?imei=${imei}`;
  },
  KEEP_ALIVE: (): string => {
    return `${ENV.HOST}/IMEIUser/keep-alive`;
  },
};

export {API};
