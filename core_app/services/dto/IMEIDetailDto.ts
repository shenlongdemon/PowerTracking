import {BaseDto, IMEIDetail} from 'core_app/services';

export interface IMEIDetailDto extends BaseDto {
  imei: IMEIDetail | null;
}
