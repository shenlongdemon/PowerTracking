import BaseScreen from 'src/BaseScreen';
import {StyleSheet, View} from 'react-native';
import * as React from 'react';
import {useState} from 'react';
import Button from 'src/shared_controls/Button';
import {Text} from 'src/shared_controls/Text';
import {AppUtil} from 'core_app/common';
import WifiSelectedList from 'src/shared_controls/WifiSelectedList';
import {WifiObject} from 'src/models/WifiObject';
import {ROUTE} from 'src/portrait/route';
import {useNavigation} from '@react-navigation/native';
import Popup from 'src/shared_controls/Popup';
import QRCodeScan, {QRCodeScanData} from 'src/shared_controls/QRCodeScan';

const AddDeviceScreen = () => {
  const navigation = useNavigation();
  const [isAndroid] = useState(AppUtil.isAndroid());
  const [scanQRCode, setScanQRCode] = useState(false);

  const next = async (item: WifiObject): Promise<void> => {
    navigation.navigate(ROUTE.APP.ADD_DEVICE.CONFIG_DEVICE, {wifi: item});
  };

  const renderBody = (): any => {
    return isAndroid ? (
      <View style={{flex: 1}}>
        <Text H2 style={{alignSelf: 'center', marginBottom: 10}}>Chọn thiết bị theo tên wifi</Text>
        <WifiSelectedList onSelected={(item: WifiObject) => next(item)} />
      </View>
    ) : (
      <></>
    );
  };

  const startQRCode = (): void => {
    setScanQRCode(!scanQRCode);
  };

  const onQRCodeScan = (e: QRCodeScanData): void => {
    setScanQRCode(false);
    alert(JSON.stringify(e));
  };

  return (
    <BaseScreen>
      <View style={{flex: 1}}>{renderBody()}</View>
      <View style={{flexDirection: 'row'}}>
        <Button style={styles.btnAction} onPress={startQRCode}>
          QR Code
        </Button>
      </View>
      <Popup modalVisible={scanQRCode}>
        <View style={{flexDirection: 'column', flex: 1}}>
          <QRCodeScan onRead={onQRCodeScan} />
          <Button onPress={startQRCode}>Cancel</Button>
        </View>
      </Popup>
    </BaseScreen>
  );
};
export default AddDeviceScreen;

const styles = StyleSheet.create({
  btnAction: {
    margin: 5,
    flex: 1,
  },
  leftColumn: {
    flex: 0.4,
  },
});
