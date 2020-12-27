import {BaseSdo, IMEIInfoSdo} from 'core_app/repositories';

export interface IMEIListSdo extends BaseSdo {
  list: IMEIInfoSdo[];
}
