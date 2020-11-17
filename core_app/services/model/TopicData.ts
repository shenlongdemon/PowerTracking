import {TopicUnitData} from 'core_app/services/model/TopicUnitData';

export interface TopicData {
  owner: string;
  topic: string;
  list: TopicUnitData[];
}
