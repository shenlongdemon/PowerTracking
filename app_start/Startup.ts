import {
  FactoryInjection,
  PUBLIC_TYPES,
  IMQTTService,
  ENV,
  Logger,
} from 'core_app';
import MQTTService from 'src/infrastructure/MQTTService';
import Config from 'react-native-config';

export default class Startup {
  static start(): void {
    Startup.config();
    Startup.inject();
    Startup.handleApi();
  }

  private static config(): void {
    ENV.config(Config);
  }

  private static inject(): void {
    FactoryInjection.bindSingleton<IMQTTService>(
      PUBLIC_TYPES.IMQTTService,
      MQTTService,
    );
  }

  private static handleApi = (): void => {};
}
