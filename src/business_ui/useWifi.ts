import WifiManager, {WifiEntry} from 'react-native-wifi-reborn';
import {WifiObject} from 'src/models/WifiObject';
import {Logger} from 'core_app/common';
const useWifi = () => {
  const getWifiList = async (): Promise<WifiObject[]> => {
    Logger.logF(() => [`useGetWifiList `]);
    const wifiList: WifiEntry[] = await WifiManager.reScanAndLoadWifiList();
    Logger.logF(() => [`useGetWifiList `, wifiList]);
    const wifiObjects: WifiObject[] = wifiList.map(
      (wifi: WifiEntry): WifiObject => {
        return {
          name: wifi.SSID,
          SSID: wifi.SSID,
          BSSID: wifi.BSSID,
        };
      },
    );
    return wifiObjects;
  };

  const connect = async (ssid: string, password: string): Promise<any> => {
    try {
      Logger.logF(() => [`userWifi connect ${ssid} ${password}`]);
      await WifiManager.connectToProtectedSSID(ssid, password, false);
      return null;
    } catch (e) {
      return e;
    }
  };

  const disconnect = async (): Promise<void> => {
    await WifiManager.disconnect();
  };

  return {getWifiList, connect, disconnect};
};

export default useWifi;
