import {BaseDto, User} from 'core_app/services';

export interface UserLoginDto extends BaseDto {
  isLoggedIn: boolean;
  user: User | null;
}
