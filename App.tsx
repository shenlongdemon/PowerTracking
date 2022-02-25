/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useRef, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {app as PortraitApp} from './src/portrait/navgator';
import Startup from './app_start/Startup';
import {Provider} from 'react-redux';
import Store from 'src/redux/Store';
declare const global: {HermesInternal: null | {}};
import {BackHandler, LogBox, NativeEventSubscription} from 'react-native';
import Loading from 'src/shared_controls/Loading';
import {PermissionsAndroid} from 'react-native';
import {Logger} from 'core_app/common';

LogBox.ignoreLogs([]);

Startup.start();
function App() {
  const navigationRef = useRef(null);
  const [permissionGranted, setPermissionGranted] = useState(false);
  let hardwareBackPressEvent: NativeEventSubscription | null = null;
  const onBackPress = () => {
    // const navigation = navigationRef.current;
    // if (!!navigation) {
    //   // @ts-ignore
    //   !!navigation.goBack && navigation.goBack();
    // }
    // return true;
    return false;
  };

  React.useEffect(() => {
    Logger.logF(() => [`App addEventListener`]);
    hardwareBackPressEvent = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress,
    );

    return () => {
      !!hardwareBackPressEvent &&
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    };
  }, [hardwareBackPressEvent]);

  useEffect(() => {
    checkPermissions();
  }, [permissionGranted]);

  const checkPermissions = async (): Promise<void> => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location permission is required for WiFi connections',
        message:
          'This app needs location permission as this is required  ' +
          'to scan for wifi networks.',
        buttonNegative: 'DENY',
        buttonPositive: 'ALLOW',
      },
    );
    setPermissionGranted(granted === PermissionsAndroid.RESULTS.GRANTED);
  };

  return (
    <Provider store={Store}>
      <NavigationContainer ref={navigationRef}>
        {permissionGranted && (
          <>
            <PortraitApp />
            <Loading />
          </>
        )}
      </NavigationContainer>
    </Provider>
  );
}

export default App;
