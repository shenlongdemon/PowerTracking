import {
  BaseService,
  IMEIInfo,
  IMEIListDto,
} from 'core_app/services';

import {PRIVATE_TYPES} from 'core_app/infrastructure/Identifiers';
import {BaseSdo, IMEIListSdo} from 'core_app/repositories';
import {IIMEIService} from 'core_app/services/IIMEIService';
import {IIMEIRepo} from 'core_app/repositories/IIMEIRepo';

import {inject, injectable} from 'inversify';
import {Logger} from "core_app/common";

@injectable()
export class IMEIService extends BaseService implements IIMEIService {
  @inject(PRIVATE_TYPES.IIMEIRepo) private IMEIRepo!: IIMEIRepo;
  async getIMEIs(): Promise<IMEIListDto> {
    const sdo: IMEIListSdo = await this.IMEIRepo.getIMEIList();
    let list: IMEIInfo[] = [];
    if (sdo.isSuccess && sdo.list !== null) {
      list = this.mappingList<IMEIInfo>(sdo.list);
    }
    return {...this.populate(sdo), list};
  }

  async keepAlive(imei: string): Promise<void> {
    Logger.logF(()=>[`IMEIService keepAlive`]);
    // await this.IMEIRepo.keepAlive(imei);
  }
}
