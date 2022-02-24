import * as React from "react";
import {FlatList, View} from "react-native";
import {sizeHeight} from "src/commons/Size";
import {WifiObject} from "src/models/WifiObject";
import {useState} from "react";
import TextListItem from "src/shared_controls/TextListItem";
import {color} from "src/stylesheet";
import useGetWifiList from "src/business_ui/useGetWifiList";

const WifiSelectedList = ({onSelected}: { onSelected: (item: WifiObject) => void }) => {
    const {isLoading: isGetWifiLoading, wifiList} = useGetWifiList();
    const [selectedWifi, setSelectedWifi] = useState<WifiObject | null>(null);

    const renderItem = ({item, index}: { item: WifiObject; index: number }): any => {
        const isSelected: boolean = !!selectedWifi && selectedWifi.BSSID === item.BSSID;
        return <TextListItem style={{backgroundColor: isSelected ? color.selectedListItem : 'white'}} key={item.BSSID}
                             obj={item} text={`${item.name}\n${item.BSSID}`} onPress={(i: WifiObject) => {
            setSelectedWifi(i);
            onSelected(i);
        }}/>
    };

    return <View style={{flex: 1}}>
        <FlatList
            contentContainerStyle={{paddingBottom: sizeHeight(9)}}
            data={wifiList}
            renderItem={renderItem}
            keyExtractor={(item: WifiObject) => item.BSSID}
        />
    </View>
};

export default WifiSelectedList;