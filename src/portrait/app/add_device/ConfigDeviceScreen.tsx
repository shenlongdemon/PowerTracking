import BaseScreen from 'src/BaseScreen';
import {
  NavigationContainerRef,
  Route,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {Text} from 'src/shared_controls/Text';
import * as React from 'react';
import {View} from 'react-native';
import Button from 'src/shared_controls/Button';
import {WifiObject} from 'src/models/WifiObject';
import WifiSelectedList from 'src/shared_controls/WifiSelectedList';
import {useState} from 'react';
import {AppUtil} from 'core_app/common';
export interface Navigation extends NavigationContainerRef {}

const ConfigDeviceScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [isAndroid] = useState(AppUtil.isAndroid());
  const [selectedWifi, setSelectedWifi] = useState<WifiObject | null>(null);
  // @ts-ignore
  const {wifi}: {wifi: WifiObject} = route.params;
  navigation.setOptions({
    title: wifi.name,
  });
  const skip = (): void => {
    navigation.navigate('');
  };
  const renderBody = (): any => {
    return isAndroid ? (
      <WifiSelectedList
        onSelected={(item: WifiObject) => setSelectedWifi(item)}
      />
    ) : (
      <View />
    );
  };
  return (
    <BaseScreen>
      <View style={{flex: 1}}>
        <Text>Please select modern</Text>
        {renderBody()}
      </View>
      <Button onPress={skip}>Skip</Button>
    </BaseScreen>
  );
};
export default ConfigDeviceScreen;
