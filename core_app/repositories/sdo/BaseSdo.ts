import {API_METHOD} from 'core_app/common';

export interface BaseSdo {
  code: string;
  data: any | null | undefined;
  message: string;
  isSuccess: boolean;
  method: API_METHOD;
  __debug: any;
}
