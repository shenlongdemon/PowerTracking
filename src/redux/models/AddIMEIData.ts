export interface AddIMEIData {
  group: string;
  imei: string;
  data: {
    field: string;
    data: any;
    time: number;
  };
}
