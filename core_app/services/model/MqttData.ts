import {MQTT_MESSAGE_TYPE} from 'core_app/common';

export interface MqttData {
  type: MQTT_MESSAGE_TYPE;
  topic: string;
  data: any | null;
  obj: any | null;
}
