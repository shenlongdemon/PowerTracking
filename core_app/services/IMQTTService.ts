/// <reference path="../../src/infrastructure/MQTTService.ts" />

import {IHandleDataService} from 'core_app/services/IHandleDataService';
import {MqttData} from 'core_app/services/model';
import {BaseDto} from 'core_app/services/dto';

export interface IMQTTService extends IHandleDataService {
  subscribeIMEI(
    imei: string,
    clearAll: boolean,
    onData: (data: MqttData) => Promise<void>,
  ): Promise<BaseDto>;

  close(): Promise<BaseDto>;

  subscribeRSSIIMEIS(
    imeiList: string[],
    clearAll: boolean,
    onData: (data: MqttData) => Promise<void>,
  ): Promise<BaseDto>;
}
