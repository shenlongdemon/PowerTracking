/// <reference path="../../src/infrastructure/AxiosWebApi.ts" />

import { ApiResult } from './ApiResult';
import { ErrorResult } from '../models';

export interface IWebApi {
  /**
   * set header on runtime
   * @param genHeader
   */
  setHeader(genHeader: () => Promise<any>): void;

  /**
   * If we didn't set it, please handle after webapi returns data
   * @param handle callback function to handle error for business error.
   */
  handleBusinessError(handle: (error: ErrorResult | null) => void): void;

  /**
   * If we didn't set it, please handle after webapi returns data
   * @param handle callback function to handle error for http error.
   */
  handleExceptionError(handle: (error: ErrorResult | null) => void): void;

  /**
   * Make GET request
   * @param url
   */
  get(url: string): Promise<ApiResult>;

  /**
   * Make POST request
   * @param url
   * @param data
   */
  post(url: string, data: any): Promise<ApiResult>;

  /**
   * Make Put request
   * @param url
   * @param data
   */
  put(url: string, data: any): Promise<ApiResult>;

  /**
   * Make DELETE request
   * @param url
   */
  delete(url: string): Promise<ApiResult>;

  /**
   * upload file
   * @param url url of server
   * @param fileUri uri of file
   * @param fileName name of file
   * @param fileType type of file
   */
  uploadFile(url: string, fileUri: string, fileName: string, fileType: string): Promise<ApiResult>;

  uploadS3(signedUrl: string, fileData: Buffer, dataType: string): Promise<ApiResult>;
}
