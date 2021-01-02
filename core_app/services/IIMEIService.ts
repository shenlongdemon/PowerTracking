/// <reference path="../infrastructure/services/IMEIService.ts" />

import {IMEIDetailDto, IMEIListDto} from 'core_app/services/dto';

export interface IIMEIService {
  getIMEIs(): Promise<IMEIListDto>;
}
