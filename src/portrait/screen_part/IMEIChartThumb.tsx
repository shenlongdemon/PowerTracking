import BaseScrPart, {BaseScrPartProps} from 'src/BaseScrPart';
import * as React from 'react';
import {Switch, View} from 'react-native';
import {FieldData, IGlobalState} from 'core_app/services';
import {RootState} from 'src/redux/rootReducer';
import {AppUtil, CONSTANTS, STATE_ACTION} from 'core_app/common';
import {Text} from 'src/shared_controls/Text';
import {Body, Left, ListItem} from 'native-base';
import {map} from 'src/middlewares/GlobalObservable';
import {IMEIData} from 'src/redux/models/IMEIData';
import {GroupIMEIData} from 'src/redux/models/GroupIMEIData';
import {color} from 'src/stylesheet';
import {FactoryInjection} from 'core_app/infrastructure';
import {PUBLIC_TYPES} from 'core_app/infrastructure/Identifiers';
import {size, sizeHeight, sizeWidth} from 'src/commons/Size';

interface InjectProps {
  list: FieldData[];
  fields: string[];
}
interface Props extends InjectProps, BaseScrPartProps {
  group: string; // group name
  imei: string; // group name
  onPress: () => void;
}

interface State {}

class IMEIChartThumb extends BaseScrPart<Props, State> {
  private globalState: IGlobalState = FactoryInjection.get<IGlobalState>(
    PUBLIC_TYPES.IGlobalState,
  );
  constructor(p: Props) {
    super(p);
    this.state = {};
  }

  private toggleField(field: string, val: boolean): void {
    val
      ? this.globalState.do(STATE_ACTION.FIELD_SELECTED, field)
      : this.globalState.do(STATE_ACTION.FIELD_UNSELECTED, field);
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
                const isChecked: boolean =
                  this.props.fields.indexOf(data.field) > -1;
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
                        H2
                        key={`Text1${data.field}${data.data}${data.time}`}
                        style={{
                          color: 'white',
                          alignContent: 'center',
                          textAlign: 'center',
                          textAlignVertical: 'center',
                          backgroundColor: colors[colorIndex],
                          height: size(10),
                          width: size(10),
                          borderRadius: size(5),
                        }}>
                        {`${ns[3]}`}
                      </Text>
                      <Text
                        H2
                        key={`Text2${data.field}${data.data}${data.time}`}
                        style={{
                          color: colors[colorIndex],
                          textAlign: 'right',
                          textAlignVertical: 'center',
                          backgroundColor: 'white',
                          flex: 1,
                          height: size(10),
                        }}>
                        {`${!!data ? data.data : CONSTANTS.STR_EMPTY}`}
                      </Text>
                      <Text
                        H2
                        key={`Text3${data.field}${data.data}${data.time}`}
                        style={{
                          textAlignVertical: 'center',
                          flex: 0.3,
                          height: size(10),
                        }}>
                        {`${ns[2]}`}
                      </Text>
                    </View>
                    <Switch
                      key={`Switch${data.field}${data.data}${data.time}`}
                      trackColor={{
                        false: color.darkButton,
                        true: color.button,
                      }}
                      thumbColor={
                        isChecked ? color.button : color.disabledButton
                      }
                      onValueChange={(val: boolean): void => {
                        this.toggleField(data.field, val);
                      }}
                      value={isChecked}
                    />
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

    return {list, fields: state.gsdlReducer.fields};
  },
);
