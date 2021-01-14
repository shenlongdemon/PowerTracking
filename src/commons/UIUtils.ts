import {AppUtil, Logger} from 'core_app/common';
import {Toast} from 'native-base';
import {color} from 'src/stylesheet';

export default class UIUtils {
  static toast(data: any): void {
    Toast.show({
      text: AppUtil.toJONString(data),
      buttonText: 'close',
      duration: 4000,
      style: {
        backgroundColor: color.button,
      },
      textStyle: {
        color: color.buttonText,
      },
    });
  }
}
