import { ENV } from '../config';

const API = {
  GET_TRACKING_DEVICE_STATUS: (trackingDeviceId: string): string => {
    return `${ENV.HOST}/company/tse-status/${trackingDeviceId}`;
  }
};

export { API };
