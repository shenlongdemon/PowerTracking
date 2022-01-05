/// <reference path="../../src/infrastructure/MQTTService.ts" />

import {IHandleDataService} from 'core_app/services/IHandleDataService';
import {MqttData} from 'core_app/services/model';
import {BaseDto} from 'core_app/services/dto';

export interface IMQTTService extends IHandleDataService {
  setOnData (onData: (data: MqttData) => Promise<void>) : void,

  subscribeIMEI(
    imei: string,
    clearAll: boolean
  ): Promise<BaseDto>;

  unsubscribeIMEI(imei: string, shouldClose: boolean): Promise<void>;

  close(): Promise<BaseDto>;

  subscribeRSSIIMEIS(
    imeiList: string[]
  ): Promise<BaseDto>;
}
