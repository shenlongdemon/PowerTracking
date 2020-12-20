import {BaseDto} from 'core_app/services';

export interface UserLoginDto extends BaseDto {
  isLoggedIn: boolean;
}
