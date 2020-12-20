import {API_METHOD} from 'core_app/common';

export interface ApiResult {
  data?: any | null;
  message: string;
  code: string;
  url: string;
  method: API_METHOD;
}
