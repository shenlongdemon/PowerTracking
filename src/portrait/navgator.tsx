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
import {color} from 'src/stylesheet';

const drawerStack = createCompatNavigatorFactory(createDrawerNavigator)(
  {
    [ROUTE.APP.MAIN]: {
      screen: Main,
      navigationOptions: {
        title: 'Danh sách thiết bị',
        headerStyle: {
          backgroundColor: color.button,
        },
        headerTintColor: color.buttonText, // This is wrong and will not work!!!!
        headerTitleStyle: {
          alignSelf: 'center',
          marginLeft: -40,
          color: color.buttonText,
        },
      },
    },
  },
  {
    initialRouteName: ROUTE.APP.MAIN,
    drawerContent: (props) => <DrawerMenu {...props} />,
    drawerStyle: {width: '90%'},
    defaultNavigationOptions: {
      headerStyle: {backgroundColor: color.button, tintColor: color.buttonText},
      headerTitleStyle: {
        textAlign: 'center',
        color: color.buttonText,
        flex: 1,
        alignSelf: 'center',
      },
      headerTintColor: color.buttonText,
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
    [ROUTE.APP.IMEI_INFO]: {
      screen: IMEIInfoScreen,
      navigationOptions: IMEIInfoScreen.navigationOptions,
    },
  },
  {
    initialRouteName: ROUTE.APP.MAIN,
    defaultNavigationOptions: {
      headerStyle: {backgroundColor: color.button},
      headerTitleStyle: {
        textAlign: 'center',
        // backgroundColor: 'red',
        // flexGrow: 1,
        flex: 1,
        alignSelf: 'center',
        color: color.buttonText,
        backgroundColor: color.button,
        // marginLeft: -50,
        // width: '100%',
      },
      headerTintColor: color.buttonText,
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
