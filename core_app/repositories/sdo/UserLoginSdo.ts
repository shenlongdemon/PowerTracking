import {BaseSdo} from 'core_app/repositories';

export interface UserLoginSdo extends BaseSdo {
  user: any | null;
}
