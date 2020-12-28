import BaseScrPart from 'src/BaseScrPart';
import {FactoryInjection} from 'core_app/infrastructure';
import {DataHandling} from 'src/infrastructure/DataHandling';
import {AppUtil} from 'core_app/common';
import {FieldData, IMEIDetail, IMQTTService, MqttData} from 'core_app/services';
import store from 'src/redux/Store';
import {actAddIMEIData} from 'src/redux/GSDLReducer';
import {PUBLIC_TYPES} from 'core_app/infrastructure/Identifiers';
import IMEIChart from 'src/portrait/screen_part/IMEIChart';
import React from 'react';
import {Text} from 'src/shared_controls/Text';

interface Props {
  imeiDetail: IMEIDetail;
}
interface State {
  groups: string[];
}

export default class IMEIChartList extends BaseScrPart<Props, State> {
  protected mqttService: IMQTTService = FactoryInjection.get<IMQTTService>(
    PUBLIC_TYPES.IMQTTService,
  );
  constructor(p: Props) {
    super(p);
    this.mqttService.setHandleData(new DataHandling(this));
    this.onData.bind(this);
    this.state = {
      groups: [],
    };
  }

  async componentDidMount(): Promise<void> {
    await this.subscribe();
  }

  async componentWillUnmount(): Promise<void> {
    await this.close();
  }

  private async close(): Promise<void> {
    await this.mqttService.close();
  }
  private async subscribe(): Promise<void> {
    await AppUtil.sleep(2000);
    await this.mqttService.subscribeIMEI(
      // this.props.imeiDetail.imei,
      this.props.imeiDetail.imei,
      true,
      this.onData,
    );
  }

  private onData = async (data: MqttData): Promise<void> => {
    // Logger.log(`MQTT Main onData`, data);
    await this.handleData(data);
  };

  private async handleData(data: MqttData): Promise<void> {
    // Logger.log(`MQTT Main onData`, data);
    const group: string = data.group;
    const imei: string = data.imei;
    const fieldData: FieldData | null = data.data;
    if (!fieldData || fieldData.field.indexOf('F') !== 0 || group === 'LIVE') {
      return;
    }
    if (this.state.groups.indexOf(group) < 0) {
      this.setState({groups: [...this.state.groups, group]});
    }
    // store.dispatch(addIMEIData(group, imei, fieldData));
    store.dispatch(
      actAddIMEIData({
        group,
        imei,
        data: fieldData,
      }),
    );
  }
  private renderData(): any {
    return this.state.groups.map((group): any => {
      return (
        <IMEIChart
          key={`${this.props.imeiDetail.imei}-${group}`}
          name={group}
          imei={this.props.imeiDetail.imei}
        />
      );
    });
  }
  render() {
    return (
      <BaseScrPart>
        {this.state.groups.length > 0 ? (
          this.renderData()
        ) : (
          <Text>Loading ...</Text>
        )}
      </BaseScrPart>
    );
  }

  // private renderData(): any {
  //     return this.state.groups.map((group): any => {
  //         return <IMEIChart key={group} name={group} />;
  //     });
  // }
}
