import {
  BaseRepository,
  IAuthRepo,
  UserLoginRequest,
  UserLoginSdo,
} from 'core_app/repositories';
import {inject, injectable} from 'inversify';
import {PUBLIC_TYPES} from 'core_app/infrastructure/Identifiers';
import {ApiResult, IWebApi} from 'core_app/webapi';
import {API, CONSTANTS} from 'core_app/common';

@injectable()
export class AuthRepo extends BaseRepository implements IAuthRepo {
  @inject(PUBLIC_TYPES.IWebApi) private api!: IWebApi;

  async login(phone: string, password: string): Promise<UserLoginSdo> {
    const url: string = API.USER_LOGIN();
    const req: UserLoginRequest = {phone, pass: password};
    const res: ApiResult = await this.api.post(url, req);
    return {
      ...this.populate(res),
      accessToken: res.data || CONSTANTS.STR_EMPTY,
    };
  }
}
