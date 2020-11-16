import {FactoryInjection, PUBLIC_TYPES, IMQTTService} from 'core_app';
import MQTTService from 'src/infrastructure/MQTTService';

export default class Startup {
  static start = (): void => {
    Startup.config();
    Startup.inject();
    Startup.handleApi();
  };

  private static config = (): void => {};

  private static inject = (): void => {
    FactoryInjection.bindSingleton<IMQTTService>(
      PUBLIC_TYPES.IMQTTService,
      MQTTService,
    );
  };

  private static handleApi = (): void => {};
}
