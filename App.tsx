/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {app as PortraitApp} from './src/portrait/navgator';
import Startup from './app_start/Startup';
import {Provider} from 'react-redux';
import Store from 'src/redux/Store';
declare const global: {HermesInternal: null | {}};
import {YellowBox} from 'react-native';
import Loading from 'src/shared_controls/Loading';
YellowBox.ignoreWarnings([]);

Startup.start();
const App = () => {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <PortraitApp />
        <Loading />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
