// import BaseScrPart from 'src/BaseScrPart';
// import * as React from 'react';
// import {ScrollView, View} from 'react-native';
// import {FieldData} from 'core_app/services';
// import {GSDL_REDUCER_ACTION, SetIMEIData} from 'src/redux/GSDLReducer';
// import {AddIMEIData} from 'src/redux/models/AddIMEIData';
// import {RootState} from 'src/redux/rootReducer';
// import {AppUtil, CONSTANTS, DateUtils} from 'core_app/common';
// import {Text} from 'src/shared_controls/Text';
// import {map} from 'src/middlewares/GlobalObservable';
// import {LineChart, Grid, XAxis, YAxis} from 'react-native-svg-charts';
// import BaseScreen, {BasePops, BaseState} from 'src/BaseScreen';
// import Orientation from 'react-native-orientation';
// import LoadingView from 'src/shared_controls/LoadingView';
// import {sizeWidth, windowHeight, windowWidth} from 'src/commons/Size';
// import Button from 'src/shared_controls/Button';
// import {color} from 'src/stylesheet';
// import {Icon} from 'native-base';
// import TouchView from 'src/shared_controls/TouchView';
//
// interface Props extends BasePops {
//   list: AddIMEIData[];
// }
//
// interface State extends BaseState {
//   isDetail: boolean;
// }
//
// class GroupChartDetail extends BaseScreen<Props, State> {
//   private name!: string; // group name
//   private imei!: string;
//   constructor(p: Props) {
//     super(p);
//     this.state = {
//       isDetail: true,
//     };
//     const param:
//       | {name: string; imei: string}
//       | null
//       | undefined = this.getParam();
//     if (!param) {
//       this.goBack();
//     }
//     this.imei = param!.imei;
//     this.name = param!.name;
//     this.setHeader(this.name);
//     this.viewAll = this.viewAll.bind(this);
//     this.back = this.back.bind(this);
//   }
//   async componentDidMount(): Promise<void> {
//     Orientation.lockToLandscape();
//   }
//
//   async componentBlur(): Promise<void> {
//     Orientation.lockToPortrait();
//   }
//
//   private back = (): void => {
//     this.goBack();
//   };
//
//   private viewAll = (): void => {
//     this.setState((prevState: State) => {
//       return {
//         isDetail: !prevState.isDetail,
//       };
//     });
//   };
//
//   private renderData(): any {
//     const list: FieldData[] = this.props.list
//       .filter((aid: AddIMEIData): boolean => {
//         return aid.imei === this.imei && aid.group === this.name;
//       })
//       .map(
//         (aid: AddIMEIData): FieldData => {
//           return aid.data;
//         },
//       );
//     if (list.length > 0) {
//       let colors: any[] = [
//         '#2e29b1',
//         '#29b140',
//         '#b12929',
//         '#297ab1',
//         '#8129b1',
//         '#b16829',
//         '#29b1b1',
//       ];
//
//       let colorIndex: number = 0;
//       const dg: any = AppUtil.groupBy(list, 'field');
//       const keys: string[] = Object.keys(dg).sort(
//         (k1: string, k2: string): number => {
//           return k1 > k2 ? 1 : -1;
//         },
//       );
//       const dd: any[] = keys.map((key: string, index: number): any => {
//         const list: FieldData[] = dg[key];
//         if (index < colors.length) {
//           colorIndex = index;
//         } else {
//           colorIndex = index % colors.length;
//         }
//         return {
//           data: list
//             .sort((a: FieldData, b: FieldData): number => {
//               return a.time - b.time;
//             })
//             .map((f: FieldData, index: number): any => {
//               // return {x: `${f.time}`, y: f.data <= 0 ? 0 : f.data};
//               return Number(f.data);
//             }),
//           time: list
//             .sort((a: FieldData, b: FieldData): number => {
//               return a.time - b.time;
//             })
//             .map((f: FieldData, index: number): any => {
//               // return {x: `${f.time}`, y: f.data <= 0 ? 0 : f.data};
//               return new Date(f.time);
//             }),
//           svg: {stroke: colors[colorIndex]},
//           field: key.split('_')[2],
//           color: colors[colorIndex],
//         };
//       });
//       if (dd.length > 0) {
//         const yAxis: number[] = [].concat(
//           ...dd.map((d: any): any => {
//             return d.data;
//           }),
//         );
//         const xAxis: Date[] = [].concat(
//           ...dd.map((d: any): any => {
//             return d.time;
//           }),
//         );
//         const values: number[] = yAxis.sort((a, b) => b - a);
//         const max: number = values[0] + Math.abs(values[0]) / 10;
//         const min: number =
//           values[values.length - 1] - Math.abs(values[values.length - 1]) / 11;
//         const totalWidth: number = xAxis.length * 80;
//         const isLargeThanView: boolean = totalWidth > windowWidth();
//
//         return (
//           <View style={{flex: 1}}>
//             <View
//               style={{
//                 height: 30,
//                 width: '100%',
//                 flexDirection: 'row',
//               }}>
//               <View
//                 style={{
//                   flex: 1,
//                   justifyContent: 'center',
//                 }}>
//                 <Text H3 style={{alignSelf: 'center'}}>
//                   {this.name}
//                 </Text>
//               </View>
//               <View
//                 style={{
//                   justifyContent: 'flex-end',
//                   flexDirection: 'row',
//                 }}>
//                 {dd.map((d: any): any => {
//                   return (
//                     <Text
//                       style={{
//                         color: color.buttonText,
//                         alignContent: 'center',
//                         textAlign: 'center',
//                         // justifyContent: 'center',
//                         textAlignVertical: 'center',
//                         alignSelf: 'center',
//                         backgroundColor: d.color,
//                         minWidth: 40,
//                         marginLeft: 5,
//                         height: 40,
//                         borderRadius: 20,
//                       }}>
//                       {d.field}
//                     </Text>
//                   );
//                 })}
//               </View>
//             </View>
//
//             <View
//               style={{
//                 flex: 1,
//                 height: windowHeight() - 80,
//               }}>
//               <View
//                 style={{
//                   flex: 1,
//                   flexDirection: 'row',
//                 }}>
//                 <YAxis
//                   style={{
//                     width: 30,
//                     height: windowWidth() - 80 - 30 - 30,
//                   }}
//                   data={yAxis}
//                   svg={{
//                     fill: 'grey',
//                     fontSize: 10,
//                   }}
//                   min={min}
//                   max={max}
//                   formatLabel={(value) => `${value}`}
//                 />
//                 <ScrollView
//                   horizontal={true}
//                   scrollEnabled={this.state.isDetail}
//                   scrollEventThrottle={16}>
//                   <View
//                     style={{
//                       flex: 1,
//                       width: this.state.isDetail
//                         ? isLargeThanView
//                           ? totalWidth
//                           : windowHeight()
//                         : windowHeight(),
//                     }}>
//                     <LineChart
//                       contentInset={{left: 30, right: 55}}
//                       yMin={min}
//                       yMax={max}
//                       style={{
//                         flex: 1,
//                       }}
//                       data={dd}>
//                       <Grid />
//                     </LineChart>
//                     <XAxis
//                       contentInset={{left: 30, right: 55}}
//                       style={{
//                         height: 30,
//                       }}
//                       data={xAxis}
//                       formatLabel={(value, index): string => {
//                         if (!this.state.isDetail) {
//                           if (
//                             xAxis.length <= 4 ||
//                             index === 0 ||
//                             index === xAxis.length - 1 ||
//                             index % Math.round(xAxis.length / 5) === 0
//                           ) {
//                             return DateUtils.format(xAxis[index], 'HH:mm:ss');
//                           }
//                           return CONSTANTS.STR_EMPTY;
//                         }
//                         return DateUtils.format(xAxis[index], 'HH:mm:ss');
//                       }}
//                       svg={{
//                         fill: 'black',
//                         fontSize: 14,
//                       }}
//                     />
//                   </View>
//                 </ScrollView>
//               </View>
//             </View>
//             <View
//               style={{
//                 height: 50,
//                 width: '100%',
//                 alignItems: 'center',
//                 alignContent: 'center',
//                 justifyContent: 'center',
//               }}>
//               <Button
//                 style={{paddingLeft: 10, paddingRight: 10}}
//                 onPress={this.viewAll}>
//                 {this.state.isDetail ? 'Overview' : 'Detail'}
//               </Button>
//             </View>
//           </View>
//         );
//       }
//     }
//     return <LoadingView />;
//   }
//   render() {
//     return (
//       <BaseScrPart style={{flex: 1}} key={this.name}>
//         {this.renderData()}
//         <TouchView
//           // disable={this.props.isLoading}
//           id={'btnAdd'}
//           style={{
//             position: 'absolute',
//             flex: 1,
//             zIndex: 100,
//             top: sizeWidth(0.5),
//             left: sizeWidth(4.5),
//             backgroundColor: color.button,
//             width: sizeWidth(5),
//             height: sizeWidth(5),
//             borderRadius: sizeWidth(2.5),
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}
//           onPress={this.back}>
//           <Icon
//             name={'long-arrow-left'}
//             type={'FontAwesome'}
//             style={{color: color.buttonText}}
//           />
//         </TouchView>
//       </BaseScrPart>
//     );
//   }
// }
//
// export default map<Props>(GroupChartDetail, (state: RootState) => ({
//   list: state.gsdlReducer.list,
// }));
