import {BaseDto, Subscribe} from 'core_app/services';

export interface SubscribeTopicDto extends BaseDto {
  subscribe: Subscribe | null;
}
