import {
  FactoryInjection,
  IMQTTService,
  ENV,
  IWebApi,
  IStore,
  IGlobalState,
} from 'core_app';
import MQTTService from 'src/infrastructure/MQTTService';
import Config from 'react-native-config';
import {PUBLIC_TYPES} from 'core_app/infrastructure/Identifiers';
import {AsyncStorageStore} from 'src/infrastructure/AsyncStorageStore';
import AxiosWebApi from 'src/infrastructure/AxiosWebApi';
import {
  generateHeader,
  handleBusinessError,
  handleExceptionError,
} from './ApiHandle';
import GlobalState from 'src/middlewares/GlobalState';
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
    FactoryInjection.bind<IMQTTService>(PUBLIC_TYPES.IMQTTService, MQTTService);
    FactoryInjection.bindSingleton<IStore>(
      PUBLIC_TYPES.IStore,
      AsyncStorageStore,
    );
    FactoryInjection.bindSingleton<IWebApi>(PUBLIC_TYPES.IWebApi, AxiosWebApi);

    FactoryInjection.bindSingleton<IGlobalState>(
      PUBLIC_TYPES.IGlobalState,
      GlobalState,
    );
  }

  private static handleApi(): void {
    const webApi: IWebApi = FactoryInjection.get<IWebApi>(PUBLIC_TYPES.IWebApi);
    webApi.handleBusinessError(handleBusinessError);
    webApi.handleExceptionError(handleExceptionError);
    webApi.setHeader(generateHeader);
  }
}
