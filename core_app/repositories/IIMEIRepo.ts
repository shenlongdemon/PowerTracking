/// <reference path="../infrastructure/repositories/IMEIRepo.ts/" />

import {BaseSdo, IMEIListSdo} from 'core_app/repositories/sdo';

export interface IIMEIRepo {
  getIMEIList(): Promise<IMEIListSdo>;
  getIMEIDetail(imei: string): Promise<BaseSdo>;
}
