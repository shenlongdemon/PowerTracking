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
import IMEIInfoScreen from 'src/portrait/app/IMEIInfoScreen';
import DrawerMenu from 'src/portrait/DrawerMenu';

const drawerStack = createCompatNavigatorFactory(createDrawerNavigator)(
  {
    [ROUTE.APP.MAIN]: {
      screen: Main,
      navigationOptions: {
        title: 'IMEI List',
        headerTitleStyle: {alignSelf: 'center', marginLeft: -40},
      },
    },
  },
  {
    initialRouteName: ROUTE.APP.MAIN,
    drawerContent: (props) => <DrawerMenu {...props} />,
    defaultNavigationOptions: {
      headerStyle: {},
      headerTitleStyle: {
        textAlign: 'center',
        // backgroundColor: 'red',
        // flexGrow: 1,
        flex: 1,
        alignSelf: 'center',
        // marginLeft: -50,
        // width: '100%',
      },
    },
  },
);
// const mainStack = createCompatNavigatorFactory(createDrawerNavigator)(
const mainStack = createCompatNavigatorFactory(createStackNavigator)(
  {
    [ROUTE.APP.ROUTE]: {
      screen: drawerStack,
      navigationOptions: {headerShown: false},
    },
    [ROUTE.APP.IMEI_INFO]: IMEIInfoScreen,
  },
  {
    initialRouteName: ROUTE.APP.MAIN,
    defaultNavigationOptions: {
      headerStyle: {},
      headerTitleStyle: {
        textAlign: 'center',
        // backgroundColor: 'red',
        // flexGrow: 1,
        flex: 1,
        alignSelf: 'center',
        // marginLeft: -50,
        // width: '100%',
      },
    },
    // navigationOptions: {
    //   headerTitleStyle: {
    //     alignSelf: 'center',
    //     textAlign: 'center',
    //     flex: 1,
    //     backgroundColor: 'red',
    //   },
    // },
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
