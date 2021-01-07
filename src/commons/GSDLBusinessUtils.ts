import {AddIMEIData} from 'src/redux/models/AddIMEIData';
import {FieldData} from 'core_app/services';

export default class GSDLBusinessUtils {
  static getFieldDataList(list: AddIMEIData[], imei: string): AddIMEIData[] {
    return list.filter((aid: AddIMEIData): boolean => {
      return aid.imei === imei;
    });
  }
}
