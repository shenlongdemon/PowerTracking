/// <reference path="../infrastructure/repositories/IMEIRepo.ts/" />

import {IMEIListSdo} from 'core_app/repositories/sdo';

export interface IIMEIRepo {
  getIMEIList(): Promise<IMEIListSdo>;
}
