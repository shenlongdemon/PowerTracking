import BaseScreen from "src/BaseScreen";
import {FlatList, StyleSheet, View} from "react-native";
import {sizeFont, sizeHeight} from "src/commons/Size";
import * as React from "react";
import {useEffect, useState} from "react";
import Button from "src/shared_controls/Button";
import {Text} from "src/shared_controls/Text";
import {ROUTE} from "src/portrait/route";

const AddDeviceScreen = ({navigation}) => {
    const [list, setList] = useState([]);

    useEffect(() => {

    });

    const renderItem = (): any => {
        return <View></View>
    };

    const next = (): void => {
        navigation.navigate(ROUTE.APP.ADD_DEVICE.SELECT_WIFI);
    };

    return (
        <BaseScreen>
            <View>
                <Text>Lissadadt</Text>
            </View>
            <View style={{flex: 1}}>
                <FlatList
                    contentContainerStyle={{paddingBottom: sizeHeight(9)}}
                    data={list}
                    renderItem={renderItem}
                    keyExtractor={(item) => item}
                />
            </View>
            <View style={{flexDirection: 'row'}}>
                <Button style={styles.btnAction} onPress={next}>QR Code</Button>
                <Button style={styles.btnAction}>QR Code</Button>
                <Button style={styles.btnAction}>QR Code</Button>
            </View>
        </BaseScreen>
    );
};
export default AddDeviceScreen;

const styles = StyleSheet.create({
    btnAction: {
        flex: 1,
        margin: 5
    },
    leftColumn: {
        flex: 0.4,
    },
});
