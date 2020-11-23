import {IMEIGroupData} from 'core_app/services';

export interface GroupData {
  group: string;
  subGroup: IMEIGroupData[];
}
