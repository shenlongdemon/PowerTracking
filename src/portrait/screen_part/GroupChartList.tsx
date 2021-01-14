// import BaseScrPart from 'src/BaseScrPart';
// import * as React from 'react';
// import {View} from 'react-native';
// import {FactoryInjection} from 'core_app/infrastructure';
// import {DataHandling} from 'src/infrastructure/DataHandling';
// import {AppUtil, Logger} from 'core_app/common';
// import {FieldData, IMQTTService, MqttData} from 'core_app/services';
// import GroupChart from 'src/portrait/screen_part/GroupChart';
// import store from 'src/redux/Store';
// import {actSetIMEIData} from 'src/redux/GSDLReducer';
// import {PUBLIC_TYPES} from 'core_app/infrastructure/Identifiers';
//
// interface Props {}
// interface State {
//   groups: string[];
// }
//
// export default class GroupChartList extends BaseScrPart<Props, State> {
//   protected mqttService: IMQTTService = FactoryInjection.get<IMQTTService>(
//     PUBLIC_TYPES.IMQTTService,
//   );
//   constructor(p: Props) {
//     super(p);
//     this.mqttService.setHandleData(new DataHandling(this));
//     this.onData.bind(this);
//     this.state = {
//       groups: [],
//     };
//   }
//
//   async componentDidMount(): Promise<void> {
//     await this.subscribe();
//   }
//   private async subscribe(): Promise<void> {
//     await AppUtil.sleep(2000);
//     await this.mqttService.subscribe(this.onData);
//   }
//
//   private onData = async (data: MqttData): Promise<void> => {
//     // Logger.log(`MQTT Main onData`, data);
//     await this.handleData(data);
//   };
//
//   private async handleData(data: MqttData): Promise<void> {
//     // Logger.log(`MQTT Main onData`, data);
//     const group: string = data.group;
//     const imei: string = data.imei;
//     const fieldData: FieldData | null = data.data;
//     if (!fieldData) {
//       return;
//     }
//     if (this.state.groups.indexOf(group) < 0) {
//       this.setState({groups: [...this.state.groups, group]});
//     }
//     // store.dispatch(addIMEIData(group, imei, fieldData));
//     store.dispatch(
//       actSetIMEIData({
//         group,
//         imei,
//         data: fieldData,
//       }),
//     );
//   }
//
//   private renderData(): any {
//     return this.state.groups.map((group): any => {
//       return <GroupChart key={group} name={group} />;
//     });
//   }
//
//   render() {
//     return <View>{this.renderData()}</View>;
//   }
// }
