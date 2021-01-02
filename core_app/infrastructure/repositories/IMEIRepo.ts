import {
  BaseRepository,
  BaseSdo,
  IAuthRepo,
  IMEIListSdo,
  UserLoginRequest,
  UserLoginSdo,
} from 'core_app/repositories';
import {inject, injectable} from 'inversify';
import {PUBLIC_TYPES} from 'core_app/infrastructure/Identifiers';
import {ApiResult, IWebApi} from 'core_app/webapi';
import {API, CONSTANTS} from 'core_app/common';
import {IIMEIRepo} from 'core_app/repositories/IIMEIRepo';

@injectable()
export class IMEIRepo extends BaseRepository implements IIMEIRepo {
  @inject(PUBLIC_TYPES.IWebApi) private api!: IWebApi;

  async getIMEIList(): Promise<IMEIListSdo> {
    const url: string = API.GET_IMEI_LIST();
    const res: ApiResult = await this.api.get(url);
    return {
      ...this.populate(res),
      list: res.data || [],
    };
  }
}
