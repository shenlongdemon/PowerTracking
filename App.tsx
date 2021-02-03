/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {app as PortraitApp} from './src/portrait/navgator';
import Startup from './app_start/Startup';
import {Provider} from 'react-redux';
import Store from 'src/redux/Store';
declare const global: {HermesInternal: null | {}};
import {BackHandler, LogBox} from 'react-native';
import Loading from 'src/shared_controls/Loading';
LogBox.ignoreLogs([]);

Startup.start();
function App() {
  const navigationRef = useRef(null);
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
    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () => {
      window.removeEventListener('hardwareBackPress', onBackPress);
    };
  }, [onBackPress]);
  return (
    <Provider store={Store}>
      <NavigationContainer ref={navigationRef}>
        <PortraitApp />
        <Loading />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
