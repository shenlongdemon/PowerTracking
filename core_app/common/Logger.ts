export class Logger {
  static log(..._data: any): void {
    _data.forEach((_d: any): void => {
      console.log(_d);
    });
  }
}
