import {MQTT_MESSAGE_TYPE} from 'core_app/common';
import {FieldData} from 'core_app/services';

export interface MqttData {
  type: MQTT_MESSAGE_TYPE;
  topicPath: string;
  imei: string;
  mainGroup: string;
  group: string;
  unit: string;
  data: FieldData | null;
  obj: any | null;
}
