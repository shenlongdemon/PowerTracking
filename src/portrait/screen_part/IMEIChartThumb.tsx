import BaseScrPart from 'src/BaseScrPart';
import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {FieldData, IMEIGroupData} from 'core_app/services';
import {connect, ConnectedProps} from 'react-redux';
import {GSDL_REDUCER_ACTION, GSDLReduxState} from 'src/redux/GSDLReducer';
import {AddIMEIData} from 'src/redux/models/AddIMEIData';
import {RootState} from 'src/redux/rootReducer';
import {AppUtil, CONSTANTS, DateUtils} from 'core_app/common';
import {Text} from 'src/shared_controls/Text';
import {Body, Left, List, ListItem} from 'native-base';
import {LineChart, Grid, XAxis, YAxis} from 'react-native-svg-charts';

type Props = ConnectedProps<typeof connector> & {
  name: string; // group name
  imei: string; // group name
};

interface State {
  list: FieldData[];
}

class IMEIChartThumb extends BaseScrPart<Props, State> {
  constructor(p: Props) {
    super(p);
    this.state = {
      list: [],
    };
  }

  shouldComponentUpdate(
    nextProps: Readonly<Props>,
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
        return nextProps.name === data.group;
      }
    }
    return false;
  }

  //
  static getDerivedStateFromProps(
    nextProps: Readonly<Props>,
    prevState: Readonly<State>,
  ): State | null {
    if (!!nextProps.event) {
      const inputRedux: GSDLReduxState = nextProps.event as GSDLReduxState;
      if (inputRedux.type === GSDL_REDUCER_ACTION.ADD_IMEI_DATA) {
        const data: AddIMEIData | null = inputRedux.data;
        if (!!data && data.group === nextProps.name) {
          let rest: FieldData[] = prevState.list;
          const existsIndex: number = prevState.list.findIndex(
            (item: FieldData): boolean => {
              return item.field === data.data.field;
            },
          );
          if (existsIndex > -1) {
            rest = rest.slice(existsIndex);
          }
          rest.push(data.data);
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
        '#2e29b1',
        '#29b140',
        '#b12929',
        '#297ab1',
        '#8129b1',
        '#b16829',
        '#29b1b1',
        '#2d2365',
      ];

      const dg: any = AppUtil.groupBy(this.state.list, 'field');
      const keys: string[] = Object.keys(dg).sort(
        (k1: string, k2: string): number => {
          return k1 > k2 ? 1 : -1;
        },
      );

      if (keys.length > 0) {
        return (
          <View
            style={{
              height: 40,
              paddingRight: 10,
              borderTopWidth: 2,
              borderColor: 'grey',
              marginBottom: 20,
              marginTop: 10,
              flexDirection: 'row',
            }}>
            <Text style={{flex: 1 / keys.length + 1}}>{this.props.name}</Text>
            {keys.map((field: string, index: number): any => {
              const ns: string[] = field.split('_');
              let colorIndex: number = index;
              if (index >= colors.length) {
                colorIndex = index % colors.length;
              }
              const data: FieldData | null =
                this.state.list.find((item: FieldData): boolean => {
                  return item.field === field;
                }) || null;
              return (
                <Text
                  style={{
                    color: 'white',
                    alignContent: 'center',
                    textAlign: 'center',
                    alignSelf: 'center',
                    padding: 10,
                    backgroundColor: colors[colorIndex],
                    // flex: 1 / dd.length + 1,
                    marginLeft: 5,
                    height: 40,
                  }}>
                  {`${ns[1]} ${ns[2]} : ${
                    !!data ? data.data : CONSTANTS.STR_EMPTY
                  }`}
                </Text>
              );
            })}
          </View>
        );
      }
    }
    return <View />;
  }
  render() {
    return <BaseScrPart key={this.props.name}>{this.renderData()}</BaseScrPart>;
  }
}
const styles = StyleSheet.create({
  leftColumn: {
    flex: 0.4,
  },
});

const mapStateToProps = (state: RootState) => ({
  event: state.gsdlReducer,
});

const connector = connect(mapStateToProps);

export default connector(IMEIChartThumb);
