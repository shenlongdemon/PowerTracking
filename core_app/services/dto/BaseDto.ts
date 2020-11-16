import {IObject} from 'core_app/services';

export class BaseDto {
  code: string;
  data: any | null;
  message: string;
  isSuccess: boolean;
  constructor(
    code: string,
    data: any | null,
    message: string,
    isSuccess: boolean,
  ) {
    this.code = code;
    this.data = data;
    this.message = message;
    this.isSuccess = isSuccess;
  }
}
