import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import * as React from 'react';
import {useEffect} from 'react';
import usePermission from 'src/use_hooks/usePermission';
import {PERMISSIONS} from 'react-native-permissions';
import {AppUtil} from 'core_app/common';
import {View} from 'react-native';

const QRCodeScan = () => {
  const {permissionGranted} = usePermission({
    permission: AppUtil.isAndroid()
      ? PERMISSIONS.ANDROID.CAMERA
      : PERMISSIONS.IOS.CAMERA,
  });
  useEffect(() => {});

  const onSuccess = (): void => {};

  return (
    <>
      {permissionGranted ? (
        <View>
          <QRCodeScanner
            onRead={onSuccess}
            flashMode={RNCamera.Constants.FlashMode.torch}
          />
        </View>
      ) : (
        <View />
      )}
    </>
  );
};

export default QRCodeScan;
