
export class DateUtils {
  static now = (): Date => {
    return new Date();
  };
  static nowStr = (): string => {
    return DateUtils.toString(DateUtils.now());
  };
  static toString = (date: Date): string => {
    return `moment(date).format(CONSTANTS.DATE_FORMAT)`;
  };
}
