import { API_METHOD } from '../common';

export interface ApiResult {
  data?: any | null;
  message: string;
  code: number;
  url: string;
  method: API_METHOD
}
