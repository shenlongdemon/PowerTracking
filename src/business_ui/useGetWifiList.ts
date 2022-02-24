
import {useEffect, useState} from 'react';
import WifiManager, {reScanAndLoadWifiList, WifiEntry} from 'react-native-wifi-reborn';
import {WifiObject} from 'src/models/WifiObject';
import {Logger} from 'core_app/common';
const useGetWifiList = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [wifiList, setWifiList] = useState<WifiObject[]>([]);

  useEffect(() => {
    setIsLoading(true);
    (async (): Promise<void> => {
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
      setWifiList(wifiObjects);
      setIsLoading(false);
    })();
  }, []);

  return {isLoading, wifiList};
};

export default useGetWifiList;
