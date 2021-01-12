export interface AddIMEIData {
  mainGroup: string;
  group: string;
  imei: string;
  data: {
    field: string;
    data: any;
    time: number;
  };
}
