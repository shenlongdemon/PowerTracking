import builder from './Ioc';

export class FactoryInjection {
  public static bindSingleton = <T>(
    type: string,
    constructor: {new (...args: any[]): T},
  ): void => {
    builder.bind<T>(type).to(constructor).inSingletonScope();
  };
  public static bind = <T>(
    type: string,
    constructor: {new (...args: any[]): T},
  ): void => {
    builder.bind<T>(type).to(constructor).inRequestScope()
  };

  public static get = <T>(type: string): T => {
    return builder.get<T>(type);
  };
}
