import BaseScrPart from 'src/BaseScrPart';
import * as React from 'react';
import {View, ViewProps} from 'react-native';
import {FieldData} from 'core_app/services';
import {GSDL_REDUCER_ACTION, SetIMEIData} from 'src/redux/GSDLReducer';
import {AddIMEIData} from 'src/redux/models/AddIMEIData';
import {RootState} from 'src/redux/rootReducer';
import {AppUtil, CONSTANTS} from 'core_app/common';
import {Text} from 'src/shared_controls/Text';
import {Body, Left, ListItem} from 'native-base';
import {map} from 'src/middlewares/GlobalObservable';
interface Props {
  list: AddIMEIData[];
}
interface BaseProps extends Props {
  name: string; // group name
  imei: string; // group name
  onPress: () => void;
}

interface State {}

class IMEIChartThumb extends BaseScrPart<BaseProps & ViewProps, State> {
  constructor(p: BaseProps & ViewProps) {
    super(p);
    this.state = {};
  }

  private renderData(): any {
    const list: FieldData[] = this.props.list
      .filter((aid: AddIMEIData): boolean => {
        return aid.imei === this.props.imei && aid.group === this.props.name;
      })
      .map(
        (aid: AddIMEIData): FieldData => {
          return aid.data;
        },
      );

    if (list.length > 0) {
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

      const dg: any = AppUtil.groupBy(list, 'field');
      const keys: string[] = Object.keys(dg).sort(
        (k1: string, k2: string): number => {
          return k1 > k2 ? 1 : -1;
        },
      );

      if (keys.length > 0) {
        return (
          <ListItem
            onPress={this.props.onPress}
            style={{marginVertical: 8, marginHorizontal: 16}}>
            <Left style={{flex: 0.5}}>
              <Text>{this.props.name}</Text>
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
                const dataList: FieldData[] = list
                  .filter((fd: FieldData): boolean => {
                    return fd.field === field;
                  })
                  .sort((a: FieldData, b: FieldData): number => {
                    return a.time - b.time;
                  });
                const data: FieldData = dataList[dataList.length - 1];
                return (
                  <Text
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
                    {`${!!data ? data.data : CONSTANTS.STR_EMPTY} (${ns[2]})`}
                  </Text>
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
    return <BaseScrPart key={this.props.name}>{this.renderData()}</BaseScrPart>;
  }
}

export default map<Props>(IMEIChartThumb, (state: RootState) => ({
  list: state.gsdlReducer.list,
}));
