import BaseScreen from "src/BaseScreen";
import { StyleSheet, View} from "react-native";
import * as React from "react";
import { useState} from "react";
import Button from "src/shared_controls/Button";
import {AppUtil} from "core_app/common";
import WifiSelectedList from "src/shared_controls/WifiSelectedList";
import {WifiObject} from "src/models/WifiObject";
import {ROUTE} from "src/portrait/route";
import {useNavigation} from "@react-navigation/native";

const AddDeviceScreen = () => {
    const navigation = useNavigation();
    const [isAndroid] = useState(AppUtil.isAndroid());
    const [selectedWifi, setSelectedWifi] = useState<WifiObject | null>(null);

    const next = (): void => {
        navigation.navigate(ROUTE.APP.ADD_DEVICE.CONFIG_DEVICE, {wifi: selectedWifi});
    };

    const renderBody = (): any => {
        return isAndroid ?
            <WifiSelectedList onSelected={(item: WifiObject) => setSelectedWifi(item) } /> : <View/>;
    };

    return (
        <BaseScreen>
            <View style={{flex: 1}}>
                {renderBody()}
            </View>
            <View style={{flexDirection: 'row'}}>
                <Button style={styles.btnAction}>QR Code</Button>
                <Button style={styles.btnAction} onPress={next}>Next</Button>
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
