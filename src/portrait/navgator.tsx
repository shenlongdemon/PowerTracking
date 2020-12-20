import * as React from 'react';
import {
  createCompatNavigatorFactory,
  createSwitchNavigator,
} from '@react-navigation/compat';
import {createStackNavigator} from '@react-navigation/stack';

import UserLogin from './UserLogin';
import {ROUTE} from './route';
import Splash from './Splash';
import Main from './app/Main';
import {createDrawerNavigator} from '@react-navigation/drawer';
import IMEIInfo from 'src/portrait/app/IMEIInfo';

const mainStack = createCompatNavigatorFactory(createDrawerNavigator)(
  {
    [ROUTE.APP.MAIN]: Main,
    [ROUTE.APP.IMEI_INFO]: IMEIInfo,
  },
  {
    initialRouteName: ROUTE.APP.IMEI_INFO,
  },
);

const appStack = createSwitchNavigator(
  {
    [ROUTE.SPLASH]: Splash,
    [ROUTE.AUTH]: UserLogin,
    [ROUTE.APP.ROUTE]: mainStack,
  },
  {
    initialRouteName: ROUTE.SPLASH,
  },
);
const app = appStack;

export {app};
