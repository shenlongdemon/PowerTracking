export interface ErrorResult {
  httpCode: number;
  businessCode: string;
  message: string;
  error: any;
  __debug?: any | null;
}
