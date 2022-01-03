/// <reference path="../infrastructure/services/IMEIService.ts" />

import { IMEIListDto} from 'core_app/services/dto';

export interface IIMEIService {
  getIMEIs(): Promise<IMEIListDto>;
  keepAlive(imei: string): Promise<void>;
}
