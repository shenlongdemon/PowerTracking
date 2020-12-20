import {ENV} from '../config';

const API = {
  USER_LOGIN: (): string => {
    return `${ENV.HOST}/login`;
  },
};

export {API};
