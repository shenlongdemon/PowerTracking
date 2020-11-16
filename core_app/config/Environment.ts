import {Logger} from 'core_app/common';

export class ENV {
  static HOST: string = '';
  static MQTT_HOST: string = '';
  static IS_DEBUGGER: boolean = true;
  static config = (configuration: any): void => {
    Object.assign(ENV, configuration);
    ENV.HOST = configuration.HOST;
    ENV.MQTT_HOST = configuration.MQTT_HOST;
    ENV.IS_DEBUGGER = `${configuration.IS_DEBUGGER}` === 'true';
    Logger.log(`ENVIRONMENT`, {
      HOST: ENV.HOST,
      MQTT_HOST: ENV.MQTT_HOST,
      IS_DEBUGGER: ENV.IS_DEBUGGER,
    });
  };
}
