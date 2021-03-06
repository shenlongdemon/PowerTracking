/*import BaseScrPart from 'src/BaseScrPart';
import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {FieldData, IMEIGroupData} from 'core_app/services';
import {connect, ConnectedProps} from 'react-redux';
import {GSDL_REDUCER_ACTION, SetIMEIData} from 'src/redux/GSDLReducer';
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

class IMEIChart extends BaseScrPart<Props, State> {
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
        reduxState.type === GSDL_REDUCER_ACTION.SET_IMEI_DATA
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
      if (inputRedux.type === GSDL_REDUCER_ACTION.SET_IMEI_DATA) {
        const data: AddIMEIData | null = inputRedux.data;
        if (!!data && data.group === nextProps.name) {
          return {
            list: [...prevState.list, data.data],
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
      ];

      let colorIndex: number = 0;
      const dg: any = AppUtil.groupBy(this.state.list, 'field');
      const keys: string[] = Object.keys(dg).sort(
        (k1: string, k2: string): number => {
          return k1 > k2 ? 1 : -1;
        },
      );
      const dd: any[] = keys.map((key: string, index: number): any => {
        const list: FieldData[] = dg[key];
        if (index < colors.length) {
          colorIndex = index;
        } else {
          colorIndex = index % colors.length;
        }
        return {
          data: list
            .sort((a: FieldData, b: FieldData): number => {
              return a.time - b.time;
            })
            .map((f: FieldData, index: number): any => {
              // return {x: `${f.time}`, y: f.data <= 0 ? 0 : f.data};
              return Number(f.data);
            }),
          time: list
            .sort((a: FieldData, b: FieldData): number => {
              return a.time - b.time;
            })
            .map((f: FieldData, index: number): any => {
              // return {x: `${f.time}`, y: f.data <= 0 ? 0 : f.data};
              return new Date(f.time);
            }),
          svg: {stroke: colors[colorIndex]},
          field: key.split('_')[2],
          color: colors[colorIndex],
        };
      });
      if (dd.length > 0) {
        const yAxis: number[] = [].concat(
          ...dd.map((d: any): any => {
            return d.data;
          }),
        );
        const xAxis: Date[] = [].concat(
          ...dd.map((d: any): any => {
            return d.time;
          }),
        );
        const values: number[] = yAxis.sort((a, b) => b - a);
        const max: number = values[0] + Math.abs(values[0]) / 10;
        const min: number =
          values[values.length - 1] - Math.abs(values[values.length - 1]) / 11;

        return (
          <View
            style={{
              height: 390,
              paddingRight: 10,
              borderTopWidth: 2,
              borderColor: 'grey',
              marginBottom: 20,
              marginTop: 10,
            }}>
            <View
              style={{
                height: 30,
                flexDirection: 'row',
                // backgroundColor: 'red',
              }}>
              <Text style={{flex: 1 / dd.length + 1}}>{this.props.name}</Text>
              {dd.map((d: any): any => {
                return (
                  <Text
                    style={{
                      color: 'white',
                      alignContent: 'center',
                      textAlign: 'center',
                      alignSelf: 'center',
                      backgroundColor: d.color,
                      // flex: 1 / dd.length + 1,
                      minWidth: 30,
                      marginLeft: 5,
                      height: 30,
                    }}>
                    {d.field}
                  </Text>
                );
              })}
            </View>
            <View
              style={{
                height: 260,
                flexDirection: 'row',
                // backgroundColor: 'yellow',
              }}>
              <YAxis
                style={{width: 30}}
                data={yAxis}
                svg={{
                  fill: 'grey',
                  fontSize: 10,
                }}
                min={min}
                max={max}
                formatLabel={(value) => `${value}`}
              />
              <LineChart
                yMin={min}
                yMax={max}
                style={{flex: 1}}
                data={dd}
                // contentInset={{right: 10}}
              >
                <Grid />
              </LineChart>
            </View>
            <XAxis
              // contentInset={{right: 10}}
              contentInset={{left: 10, right: 35}}
              style={{
                flex: 1,
                // paddingVertical: 16,
                // paddingTop: 10,
                // paddingLeft: 10,
                // backgroundColor: 'green',
                // marginRight: 10,
              }}
              data={xAxis}
              formatLabel={(value, index): string => {
                if (
                  xAxis.length <= 4 ||
                  index === 0 ||
                  index === xAxis.length - 1
                ) {
                  return DateUtils.format(xAxis[index], 'HH:mm:ss (DD)');
                } else if (index % Math.round(xAxis.length / 5) === 0) {
                  return DateUtils.format(xAxis[index], 'HH:mm:ss (DD)');
                }
                return ``;
              }}
              svg={{
                fill: 'black',
                fontSize: 14,
                rotation: 90,
                originY: 50,
                y: 20,
              }}
            />
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

export default connector(IMEIChart);
*/
