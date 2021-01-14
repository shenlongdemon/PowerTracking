import {ErrorResult} from 'core_app/models';
import {CONSTANTS, HTTP_CODE} from 'core_app/common';
import {FactoryInjection} from 'core_app/infrastructure';
import {IStore, User} from 'core_app/services';
import {PUBLIC_TYPES} from 'core_app/infrastructure/Identifiers';
import UIUtils from 'src/commons/UIUtils';

const handleBusinessError = (error: ErrorResult | null): void => {
  // UIUtils.toast(
  //   !!error
  //     ? `${error.httpCode} - ${error.businessCode} - ${error.message}`
  //     : CONSTANTS.STR_EMPTY,
  // );
};

const handleExceptionError = (error: ErrorResult | null): void => {
  // UIUtils.toast(
  //   !!error
  //     ? `${error.httpCode} - ${error.businessCode} - ${error.message}`
  //     : CONSTANTS.STR_EMPTY,
  // );
  if (!!error) {
    if (error.httpCode === HTTP_CODE.EXCEPTION) {
      // BusinessUtil.showAlert(error.message);
    }
  }
};

const generateHeader = async (): Promise<any> => {
  const store: IStore = FactoryInjection.get<IStore>(PUBLIC_TYPES.IStore);
  const user: User | null = await store.getUser();
  return {
    Authorization: `Bearer ${user?.token || CONSTANTS.STR_EMPTY}`,
    'Content-Type': 'application/json',
    Accept: `application/json`,
    'Accept-Encoding': 'deflate, gzip;q=1.0, *;q=0.5, ',
  };
};

export {handleBusinessError, handleExceptionError, generateHeader};
