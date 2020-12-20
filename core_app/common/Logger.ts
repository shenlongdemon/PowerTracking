import {ENV} from 'core_app/config';

export class Logger {
  static log(..._data: any): void {
    if (ENV.IS_DEBUGGER) {
      _data.forEach((_d: any): void => {
        console.log(_d);
      });
    }
  }
}
