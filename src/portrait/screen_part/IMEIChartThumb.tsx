import BaseScrPart from 'src/BaseScrPart';
import * as React from 'react';
import {View, ViewProps} from 'react-native';
import {FieldData} from 'core_app/services';
import {AddIMEIData} from 'src/redux/models/AddIMEIData';
import {RootState} from 'src/redux/rootReducer';
import {AppUtil, CONSTANTS} from 'core_app/common';
import {Text} from 'src/shared_controls/Text';
import {Body, CheckBox, Left, ListItem} from 'native-base';
import {map} from 'src/middlewares/GlobalObservable';
import * as Animatable from 'react-native-animatable';
import {IMEIData} from 'src/redux/models/IMEIData';
import {GroupIMEIData} from 'src/redux/models/GroupIMEIData';

interface InjectProps {
  list: FieldData[];
}
interface Props {
  group: string; // group name
  imei: string; // group name
  onPress: () => void;
}

interface State {}

class IMEIChartThumb extends BaseScrPart<
  Props & InjectProps & ViewProps,
  State
> {
  constructor(p: Props & InjectProps & ViewProps) {
    super(p);
    this.state = {};
  }

  private renderData(): any {
    if (this.props.list.length > 0) {
      let colors: any[] = [
        '#b12929',
        '#2e29b1',
        '#29b140',
        '#8129b1',
        '#b16829',
        '#297ab1',
        '#2d2365',
        '#29b1b1',
      ];

      const dg: any = AppUtil.groupBy(this.props.list, 'field');
      const keys: string[] = Object.keys(dg).sort(
        (k1: string, k2: string): number => {
          return k1 > k2 ? 1 : -1;
        },
      );

      if (keys.length > 0) {
        return (
          <ListItem
            // onPress={this.props.onPress}
            style={{marginVertical: 8, marginHorizontal: 16}}>
            <Left style={{flex: 0.5}}>
              <Text>{this.props.group}</Text>
            </Left>
            <Body
              style={{
                flex: 1,
                alignContent: 'space-between',
              }}>
              {keys.map((field: string, index: number): any => {
                const ns: string[] = field.split('_');
                let colorIndex: number = index;
                if (index >= colors.length) {
                  colorIndex = index % colors.length;
                }
                const dataList: FieldData[] = this.props.list
                  .filter((fd: FieldData): boolean => {
                    return fd.field === field;
                  })
                  .sort((a: FieldData, b: FieldData): number => {
                    return a.time - b.time;
                  });
                const data: FieldData = dataList[dataList.length - 1];
                return (
                  <View
                    key={`View${data.field}${data.data}${data.time}`}
                    style={{
                      flexDirection: 'row',
                      alignContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View
                      key={`ViewText${data.field}${data.data}${data.time}`}
                      style={{
                        flexDirection: 'row',
                        alignContent: 'space-between',
                        flex: 1,
                      }}>
                      <Text
                        key={`${data.field}${data.data}${data.time}`}
                        style={{
                          paddingRight: 5,
                          paddingLeft: 5,
                          margin: 5,
                          color: 'white',
                          alignContent: 'center',
                          textAlign: 'center',
                          // alignSelf: 'center',
                          textAlignVertical: 'center',
                          backgroundColor: colors[colorIndex],
                          // flex: 1 / dd.length + 1,
                          height: 40,
                        }}>
                        {`${!!data ? data.data : CONSTANTS.STR_EMPTY} (${
                          ns[2]
                        })`}
                      </Text>
                    </View>
                    <CheckBox checked={false} />
                  </View>
                );
              })}
            </Body>
          </ListItem>
        );
      }
    }
    return <View />;
  }
  render() {
    return (
      <BaseScrPart key={this.props.group}>{this.renderData()}</BaseScrPart>
    );
  }
}

export default map<InjectProps>(
  IMEIChartThumb,
  (state: RootState, props: Props): InjectProps => {
    let list: FieldData[] = [];
    const mainGroup: string = state.gsdlReducer.mainGroup;
    const imeiDatas: IMEIData[] =
      state.gsdlReducer.list.filter((id: IMEIData): boolean => {
        return (
          id.imei === props.imei &&
          (mainGroup === CONSTANTS.STR_EMPTY || id.mainGroup === mainGroup)
        );
      }) || null;
    if (imeiDatas.length > 0) {
      const groupIMEIData: GroupIMEIData | null =
        imeiDatas[0].groups.find((gid: GroupIMEIData): boolean => {
          return gid.group === props.group;
        }) || null;
      if (!!groupIMEIData) {
        list = groupIMEIData.fields;
      }
    }

    return {list};
  },
);
