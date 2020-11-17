import {MQTT_MESSAGE_TYPE} from 'core_app/common';
import {TopicUnitData} from 'core_app/services';

export interface MqttData {
  type: MQTT_MESSAGE_TYPE;
  topicPath: string;
  topic: string;
  owner: string;
  data: TopicUnitData | null;
  obj: any | null;
}
