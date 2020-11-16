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
declare const global: {HermesInternal: null | {}};
Startup.start();
const App = () => {
  return (
    <NavigationContainer>
      <PortraitApp />
    </NavigationContainer>
  );
};

export default App;
