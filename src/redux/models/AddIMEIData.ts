export interface AddIMEIData {
  mainGroup: string;
  group: string;
  unit: string;
  imei: string;
  data: {
    field: string;
    data: any;
    time: number;
  };
  currentMainGroup?: string;
  currentIMEI?: string;
  currentFields?: string[];
}
