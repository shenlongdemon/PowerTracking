export class ENV {
  static HOST: string = '';
  static APP_NAME: string = '';
  static APP_TYPE: string = '';
  static VERSION: string = '';
  static BACKOFFICE_HOST: string = '';
  static REGISTER_HOST: string = '';
  static REGISTER_RETAIL_HOST: string = '';
  static REGISTER_HOSPITALITY_HOST: string = '';
  static IS_AUTOMATION_TEST: boolean = false;
  static IS_DEBUGGER: boolean = true;
  static TSE: boolean = true;
  static OFFLINE_MODE: boolean = true;
  static API_VERSION: string = '';
  static ENVIRONMENT: string = '';
  static config = (configuration: any): void => {
    Object.assign(ENV, configuration);
    ENV.HOST = configuration.HOST;
    ENV.APP_NAME = configuration.APP_NAME;
    ENV.APP_TYPE = configuration.APP_TYPE;
    ENV.VERSION = configuration.VERSION;
    ENV.BACKOFFICE_HOST = configuration.BACKOFFICE_HOST;
    ENV.REGISTER_HOST = configuration.REGISTER_HOST;
    ENV.REGISTER_RETAIL_HOST = configuration.REGISTER_RETAIL_HOST;
    ENV.REGISTER_HOSPITALITY_HOST = configuration.REGISTER_HOSPITALITY_HOST;
    ENV.IS_AUTOMATION_TEST = `${configuration.IS_AUTOMATION_TEST}` === 'true';
    ENV.IS_DEBUGGER = `${configuration.IS_DEBUGGER}` === 'true';
    ENV.TSE = `${configuration.TSE}` === 'true';
    ENV.API_VERSION = configuration.API_VERSION;
    ENV.ENVIRONMENT = configuration.ENVIRONMENT;
  };
}
