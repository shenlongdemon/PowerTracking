import * as React from 'react';
import {Button, Text, View} from "react-native";
import {ROUTE} from "./route";
import BaseScreen, {BasePops, BaseState} from "../BaseScreen";

export default class UserLogin extends BaseScreen<BasePops, BaseState> {
    constructor(p: BasePops) {
        super(p);
    }
    move(){
        this.reset(ROUTE.APP.ROUTE);
    }

    render() {
        return (
            <View >
                <Button title={'Login'} onPress={()=>{this.move()}}/>
            </View>
        );
    };
}