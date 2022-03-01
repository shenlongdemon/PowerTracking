import QRCodeScanner from 'react-native-qrcode-scanner';
import {BarCodeReadEvent} from 'react-native-camera';
import * as React from 'react';
import {useEffect} from 'react';
import usePermission from 'src/use_hooks/usePermission';
import {PERMISSIONS} from 'react-native-permissions';
import {AppUtil} from 'core_app/common';
import {View} from 'react-native';

const QRCodeScan = ({onRead}: {onRead: (data: QRCodeScanData) => void}) => {
  const {permissionGranted} = usePermission({
    permission: AppUtil.isAndroid()
      ? PERMISSIONS.ANDROID.CAMERA
      : PERMISSIONS.IOS.CAMERA,
  });
  useEffect(() => {});

  const onSuccess = (e: BarCodeReadEvent): void => {
    const data: QRCodeScanData = {
      data: e.data,
    };
    onRead(data);
  };

  return (
    <>
      {permissionGranted ? (
        <View>
          <QRCodeScanner onRead={onSuccess} />
        </View>
      ) : (
        <></>
      )}
    </>
  );
};

export interface QRCodeScanData {
  data: string;
}

export default QRCodeScan;
