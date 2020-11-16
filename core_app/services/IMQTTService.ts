/// <reference path="../../src/infrastructure/MQTTService.ts" />

import {BaseDto, IHandleDataService, MqttData} from 'core_app';

export interface IMQTTService extends IHandleDataService {
  subscribe(onData: (data: MqttData) => Promise<void>): Promise<BaseDto>;
}
