import {BaseDto, IMEIInfo} from 'core_app/services';

export interface IMEIListDto extends BaseDto {
  list: IMEIInfo[];
}
