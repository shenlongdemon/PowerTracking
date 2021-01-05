import BaseScrPart from 'src/BaseScrPart';
import * as React from 'react';
import {View, ViewProps} from 'react-native';
import {FieldData} from 'core_app/services';
import {GSDL_REDUCER_ACTION, GSDLReduxState} from 'src/redux/GSDLReducer';
import {AddIMEIData} from 'src/redux/models/AddIMEIData';
import {RootState} from 'src/redux/rootReducer';
import {AppUtil, CONSTANTS} from 'core_app/common';
import {Text} from 'src/shared_controls/Text';
import {Body, Left, ListItem} from 'native-base';
import {map} from 'src/middlewares/GlobalObservable';
interface Props {
  event?: any | null;
}
interface BaseProps extends Props {
  name: string; // group name
  imei: string; // group name
  onPress: () => void;
}
interface FieldDataExt extends FieldData {
  onOff: boolean;
}
interface State {
  list: FieldDataExt[];
}

class IMEIChartThumb extends BaseScrPart<BaseProps & ViewProps, State> {
  constructor(p: BaseProps & ViewProps) {
    super(p);
    this.state = {
      list: [],
    };
  }

  shouldComponentUpdate(
    nextProps: Readonly<BaseProps>,
    nextState: Readonly<State>,
    nextContext: any,
  ): boolean {
    if (nextProps.event) {
      const reduxState: GSDLReduxState = nextProps.event as GSDLReduxState;
      if (
        !!reduxState.data &&
        reduxState.type === GSDL_REDUCER_ACTION.ADD_IMEI_DATA
      ) {
        const data: AddIMEIData = reduxState.data;
        return nextProps.name === data.group && nextProps.imei === data.imei;
      }
    }
    return false;
  }

  //
  static getDerivedStateFromProps(
    nextProps: Readonly<BaseProps>,
    prevState: Readonly<State>,
  ): State | null {
    if (!!nextProps.event) {
      const inputRedux: GSDLReduxState = nextProps.event as GSDLReduxState;
      if (inputRedux.type === GSDL_REDUCER_ACTION.ADD_IMEI_DATA) {
        const data: AddIMEIData | null = inputRedux.data;
        if (!!data && data.group === nextProps.name) {
          let rest: FieldDataExt[] = prevState.list;
          const existsIndex: number = prevState.list.findIndex(
            (item: FieldData): boolean => {
              return item.field === data.data.field;
            },
          );
          let onOff: boolean = false;
          if (existsIndex > -1) {
            const existsItem: FieldDataExt = rest[existsIndex];
            onOff = !existsItem.onOff;
            rest.splice(existsIndex, 1);
          }
          rest.push({...data.data, onOff});

          return {
            list: rest,
          };
        }
      }
    }
    return null;
  }

  private renderData(): any {
    if (this.state.list.length > 0) {
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

      const dg: any = AppUtil.groupBy(this.state.list, 'field');
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
                // alignSelf: 'space-between',
                // alignItems: 'space-between',
                alignContent: 'space-between',
                // flexDirection: 'row',
                // flexWrap: 'wrap',
              }}>
              {keys.map((field: string, index: number): any => {
                const ns: string[] = field.split('_');
                let colorIndex: number = index;
                if (index >= colors.length) {
                  colorIndex = index % colors.length;
                }
                const data: FieldDataExt | null =
                  this.state.list.find((item: FieldDataExt): boolean => {
                    return item.field === field;
                  }) || null;
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
  event: state.gsdlReducer,
}));
