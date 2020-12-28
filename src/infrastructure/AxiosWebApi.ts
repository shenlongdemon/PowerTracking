/*
    Using Axios
*/

import {injectable} from 'inversify';
import {
  API_METHOD,
  API_STATUS_CODE,
  ApiResult,
  CONSTANTS,
  HTTP_CODE,
  IWebApi,
  Logger,
} from 'core_app';
import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {ErrorResult} from 'core_app/models';

@injectable()
export default class AxiosWebApi implements IWebApi {
  private static handleBusiness?: (error: ErrorResult | null) => void;
  private static handleException?: (error: ErrorResult | null) => void;
  private static genHeader?: () => Promise<any>;

  constructor() {}

  setHeader(genHeader: () => Promise<any>): void {
    AxiosWebApi.genHeader = genHeader;
  }

  handleExceptionError = (
    handle: (error: ErrorResult | null) => void,
  ): void => {
    AxiosWebApi.handleException = handle;
  };

  handleBusinessError = (handle: (error: ErrorResult | null) => void): void => {
    AxiosWebApi.handleBusiness = handle;
  };

  async get(url: string): Promise<ApiResult> {
    let apiResult: ApiResult;
    let response: AxiosResponse<ApiResult> | null = null;
    try {
      const instance: AxiosInstance = await this.getInstance();
      response = await instance.get<ApiResult>(url);
      apiResult = this.handle(url, API_METHOD.GET, response);
    } catch (e) {
      apiResult = this.catchException(url, API_METHOD.GET, e, response);
    }
    Logger.log('callAPI_GET', url, response, apiResult);
    return apiResult;
  }

  async post(url: string, data: any): Promise<ApiResult> {
    let apiResult: ApiResult;
    let response: AxiosResponse<ApiResult> | null = null;
    try {
      const instance: AxiosInstance = await this.getInstance();
      response = await instance.post<ApiResult>(url, data);
      apiResult = this.handle(url, API_METHOD.POST, response);
    } catch (e) {
      apiResult = this.catchException(url, API_METHOD.POST, e, response);
    }
    Logger.log('callAPI_POST', url, data, response, apiResult);

    return apiResult;
  }

  async put(url: string, data: any): Promise<ApiResult> {
    let apiResult: ApiResult;
    let response: AxiosResponse<ApiResult> | null = null;
    try {
      const instance: AxiosInstance = await this.getInstance();
      response = await instance.put<ApiResult>(url, data);
      apiResult = this.handle(url, API_METHOD.PUT, response);
    } catch (e) {
      apiResult = this.catchException(url, API_METHOD.PUT, e, response);
    }
    Logger.log('callAPI_PUT', url, data, response, apiResult);
    return apiResult;
  }

  async delete(url: string): Promise<ApiResult> {
    let apiResult: ApiResult;
    let response: AxiosResponse<ApiResult> | null = null;
    try {
      const instance: AxiosInstance = await this.getInstance();
      response = await instance.delete<ApiResult>(url);
      apiResult = this.handle(url, API_METHOD.DELETE, response);
    } catch (e) {
      apiResult = this.catchException(url, API_METHOD.DELETE, e, response);
    }
    Logger.log('callAPI_DELETE', url, response, apiResult);
    return apiResult;
  }

  private catchException(
    url: string,
    method: API_METHOD,
    e: any,
    response: AxiosResponse<ApiResult> | null,
  ): ApiResult {
    const errorResult: ErrorResult | null = this.transform(e, response);
    if (AxiosWebApi.handleException) {
      AxiosWebApi.handleException(errorResult);
    }
    const apiResult: ApiResult = {
      data: e,
      message: CONSTANTS.STR_EMPTY,
      code: !!errorResult
        ? errorResult.businessCode
        : API_STATUS_CODE.EXCEPTION,
      url,
      method,
    };
    return apiResult;
  }

  private handle(
    url: string,
    method: API_METHOD,
    response: AxiosResponse<ApiResult>,
  ): ApiResult {
    let apiResult: ApiResult;

    if (response.status !== HTTP_CODE.OK && AxiosWebApi.handleException) {
      AxiosWebApi.handleException({
        businessCode: API_STATUS_CODE.EXCEPTION,
        error: response.data,
        httpCode: response.status,
        message: response.statusText,
        __debug: response,
      });
      apiResult = {
        data: response.data,
        message: response.statusText,
        code: API_STATUS_CODE.EXCEPTION,
        url,
        method,
      };
    } else {
      apiResult = {...response.data, url, method};
      if (apiResult.code !== API_STATUS_CODE.OK && AxiosWebApi.handleBusiness) {
        AxiosWebApi.handleBusiness({
          businessCode: apiResult.code,
          error: apiResult.data,
          httpCode: HTTP_CODE.OK,
          message: apiResult.message,
          __debug: response,
        });
      }
    }
    return apiResult;
  }

  private transform(
    error: any | null,
    response: AxiosResponse<ApiResult> | null,
  ): ErrorResult | null {
    let errorResult: ErrorResult | null = null;
    if (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // error.response.data;
        // error.response.status;
        // error.response.headers;
        if (error.response.status === 404) {
          errorResult = {
            businessCode: error.response.status,
            error: error.response.data,
            httpCode: error.response.status,
            message: error.response.statusText,
            __debug: error,
          };
        } else if (error.response.status === 500) {
          errorResult = {
            businessCode: error.response.status,
            error: error.response.data,
            httpCode: error.response.status,
            message: error.response.statusText,
            __debug: error,
          };
        } else {
          errorResult = {
            businessCode: !!error.response.data
              ? error.response.data.code
              : error.response.status,
            error: error.response.data,
            httpCode: error.response.status,
            message: error.response.statusText,
            __debug: error,
          };
        }
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        errorResult = {
          businessCode: API_STATUS_CODE.NOT_RECEIVED,
          error: error.request,
          httpCode: HTTP_CODE.NOT_RECEIVED,
          message: error.message,
          __debug: error,
        };
      } else {
        // Something happened in setting up the request that triggered an Error
        errorResult = {
          businessCode: API_STATUS_CODE.EXCEPTION,
          error,
          httpCode: HTTP_CODE.EXCEPTION,
          message: error.message,
          __debug: error,
        };
      }
    } else if (response) {
      errorResult = {
        businessCode: API_STATUS_CODE.EXCEPTION,
        error: response,
        httpCode: response.status,
        message: response.statusText,
        __debug: response,
      };
    }
    return errorResult;
  }

  private async getInstance(): Promise<AxiosInstance> {
    let headers: any = {};
    if (AxiosWebApi.genHeader) {
      headers = await AxiosWebApi.genHeader();
    }
    const config: AxiosRequestConfig = {
      headers,
      adapter: require('axios/lib/adapters/xhr'),
    };
    const timeOut: number = 15 * 10000;
    axios.defaults.timeout = timeOut;
    const instance: AxiosInstance = axios.create(config);
    instance.defaults.adapter = require('axios/lib/adapters/xhr'); // Force set to xhr adapter

    instance.defaults.timeout = timeOut;
    return instance;
  }
}
