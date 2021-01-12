import {GroupIMEIData} from 'src/redux/models/GroupIMEIData';

export interface IMEIData {
  imei: string;
  mainGroup: string;
  groups: GroupIMEIData[];
}
