import * as React from 'react';
import {Button, Text, View} from "react-native";
import BaseScreen, {BasePops, BaseState} from "../BaseScreen";
import {ROUTE} from "./route";

export default class Splash extends BaseScreen<BasePops, BaseState>{
    constructor(p: BasePops) {
        super(p);
    }
    componentDidMount() {
        // this.navigate(ROUTE.AUTH.ROUTE);
    }
    move(){
        this.reset(ROUTE.AUTH.ROUTE);
    }

    render() {
        return (
            <View >
                <Button title={'Splash'} onPress={()=>{this.move()}}>Splash</Button>
            </View>
        );
    };
}