import {BaseSdo} from 'core_app/repositories';

export interface UserLoginSdo extends BaseSdo {
  accessToken: string;
}
