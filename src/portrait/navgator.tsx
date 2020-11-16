import * as React from 'react';
import {createCompatNavigatorFactory, createSwitchNavigator} from '@react-navigation/compat';
import {createStackNavigator} from "@react-navigation/stack";

import UserLogin from "./UserLogin";
import {ROUTE} from "./route";
import Splash from "./Splash";
import Main from "./app/Main";
import {createDrawerNavigator} from "@react-navigation/drawer";




const authStack = createCompatNavigatorFactory(createStackNavigator)(
    {
        [ROUTE.AUTH.USER_LOGIN]: UserLogin
    },{
        initialRouteName: ROUTE.AUTH.USER_LOGIN
    }
);
const mainStack = createCompatNavigatorFactory(createDrawerNavigator)(
    {
        [ROUTE.APP.MAIN]: Main
    },{
        initialRouteName: ROUTE.APP.MAIN
    }
);

const appStack = createSwitchNavigator(
    {
        [ROUTE.SPLASH]: Splash,
        [ROUTE.AUTH.ROUTE]: authStack,
        [ROUTE.APP.ROUTE]: mainStack
    },
    {
        initialRouteName: ROUTE.SPLASH
    }
);
const app = appStack;

export { app };