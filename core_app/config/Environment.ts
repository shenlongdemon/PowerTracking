import {Logger} from 'core_app/common';

export class ENV {
  static HOST: string = '';
  static MQTT_HOST: string = '';
  static ENVIRONMENT: string = '';
  static IS_DEBUGGER: boolean = true;
  static VERSION_CODE: string = '';
  static VERSION: string = '';
  static WEB_SITE: string = '';
  static LOGO: string = '';
  static WEB_SITE_NAME: string = '';
  static config = (configuration: any): void => {
    Object.assign(ENV, configuration);
    ENV.HOST = configuration.HOST;
    ENV.MQTT_HOST = configuration.MQTT_HOST;
    ENV.ENVIRONMENT = configuration.ENVIRONMENT;
    ENV.IS_DEBUGGER = `${configuration.IS_DEBUGGER}` === 'true';
    ENV.VERSION_CODE = configuration.VERSION_COD;
    ENV.VERSION = configuration.VERSION;
    ENV.WEB_SITE = configuration.WEB_SITE;
    ENV.WEB_SITE_NAME = configuration.WEB_SITE_NAME;
    ENV.LOGO = configuration.LOGO;
    Logger.log(`ENVIRONMENT`, {
      HOST: ENV.HOST,
      MQTT_HOST: ENV.MQTT_HOST,
      IS_DEBUGGER: ENV.IS_DEBUGGER,
      LOGO: ENV.LOGO,
    });
  };
}
