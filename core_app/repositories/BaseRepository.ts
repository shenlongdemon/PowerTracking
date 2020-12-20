import {injectable} from 'inversify';
import {ApiResult} from 'core_app/webapi';
import {BaseSdo} from 'core_app/repositories/sdo';
import {SDO_CODE} from 'core_app/common';

@injectable()
export class BaseRepository {
  protected populate = (apiResult: ApiResult): BaseSdo => {
    return {
      code: apiResult.code,
      data: apiResult.data,
      isSuccess: apiResult.code === SDO_CODE.OK,
      message: apiResult.message,
      method: apiResult.method,
      __debug: apiResult,
    };
  };
}
