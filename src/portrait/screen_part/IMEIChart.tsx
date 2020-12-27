import BaseScrPart from 'src/BaseScrPart';
import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {FieldData, IMEIGroupData} from 'core_app/services';
import {connect, ConnectedProps} from 'react-redux';
import {GSDL_REDUCER_ACTION, GSDLReduxState} from 'src/redux/GSDLReducer';
import {AddIMEIData} from 'src/redux/models/AddIMEIData';
import {RootState} from 'src/redux/rootReducer';
import {AppUtil} from 'core_app/common';
import {Text} from 'src/shared_controls/Text';
import {Body, Left, List, ListItem} from 'native-base';
import {LineChart, Grid, XAxis, YAxis} from 'react-native-svg-charts';

type Props = ConnectedProps<typeof connector> & {
  name: string; // group name
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
          return {
            list: [...prevState.list, data.data],
          };
          // let currentImei: IMEIGroupData | null =
          //   prevState.imeis.find((imei: IMEIGroupData): boolean => {
          //     return imei.name === data.imei;
          //   }) || null;
          // if (!currentImei) {
          //   currentImei = {name: data.imei, list: [data.data]};
          //   return {
          //     imeis: [...prevState.imeis, currentImei],
          //   };
          // } else {
          //   return {
          //     imeis: [
          //       ...prevState.imeis.map(
          //         (imei: IMEIGroupData): IMEIGroupData => {
          //           if (imei.name === data.imei) {
          //             //TODO remove when use chart
          //             imei.list = imei.list.filter((fd: FieldData): boolean => {
          //               return fd.field !== data.data.field;
          //             });
          //             imei.list.push(data.data);
          //           }
          //           return imei;
          //         },
          //       ),
          //     ],
          //   };
          // }
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
      const keys: string[] = Object.keys(dg);
      const dd: any[] = keys.map((key: string): any => {
        const list: FieldData[] = dg[key];
        colorIndex += 1;
        if (colorIndex === colors.length) {
          colorIndex = 0;
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
          svg: {stroke: colors[colorIndex]},
        };
      });
      if (dd.length > 0) {
        const data: number[] = [].concat(
          ...dd.map((d: any): any => {
            return d.data;
          }),
        );
        const yMin: number = Math.min(...data);
        const yMax: number = Math.max(...data);
        return (
          <View
            style={{
              height: 200,
              flexDirection: 'row',
              paddingTop: 10,
              marginTop: 10,
            }}>
            <YAxis
              data={data}
              // contentInset={{top: yMax, bottom: yMin}}
              svg={{
                fill: 'grey',
                fontSize: 10,
              }}
              numberOfTicks={(yMin + yMax) / 10}
              formatLabel={(value) => `${value}`}
            />
            <LineChart
              style={{flex: 1, marginLeft: 16}}
              data={dd}
              // contentInset={{top: yMax, bottom: yMin}}
            >
              <Grid />
            </LineChart>
          </View>
        );
      }
    }
    return <View />;
  }
  // private renderData(): any {
  //   // const dataChart: any[] = this.state.imeis.filter(
  //   //   (imei: IMEIGroupData): boolean => {
  //   //     return imei.list.length > 0;
  //   //   },
  //   // );
  //   if (this.state.list.length > 0) {
  //     const dg: any = AppUtil.groupBy(this.state.list, 'field');
  //     const fields: string[] = Object.keys(dg);
  //     return (
  //       <List>
  //         {fields
  //           .sort((k1: string, k2: string): number => {
  //             return k1 > k2 ? 1 : -1;
  //           })
  //           .map((field: string): any => {
  //             const list: FieldData[] = (dg[field] as FieldData[])
  //               .filter((fd: FieldData): boolean => {
  //                 return fd.field === field;
  //               })
  //               .sort((a: FieldData, b: FieldData): number => {
  //                 return a.time - b.time;
  //               });
  //             return (
  //               <ListItem noIndent>
  //                 <Left style={styles.leftColumn}>
  //                   <Text>{this.props.name}</Text>
  //                 </Left>
  //                 <Body>
  //                   <Text>{list[list.length - 1].data}</Text>
  //                 </Body>
  //               </ListItem>
  //             );
  //           })}
  //       </List>
  //     );
  //   }
  //   return <View />;
  // }

  render() {
    return (
      <BaseScrPart key={this.props.name}>
        <Text>{this.props.name}</Text>
        {this.renderData()}
      </BaseScrPart>
    );
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
