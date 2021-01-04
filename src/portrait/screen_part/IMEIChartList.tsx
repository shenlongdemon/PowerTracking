import BaseScrPart from 'src/BaseScrPart';
import {FactoryInjection} from 'core_app/infrastructure';
import {DataHandling} from 'src/infrastructure/DataHandling';
import {AppUtil} from 'core_app/common';
import {FieldData, IMEIInfo, IMQTTService, MqttData} from 'core_app/services';
import store from 'src/redux/Store';
import {actAddIMEIData} from 'src/redux/GSDLReducer';
import {PUBLIC_TYPES} from 'core_app/infrastructure/Identifiers';
import React from 'react';
import {Text} from 'src/shared_controls/Text';
import IMEIChartThumb from 'src/portrait/screen_part/IMEIChartThumb';
import LoadingView from 'src/shared_controls/LoadingView';
import {ViewProps} from 'react-native';

interface Props {
  imeiInfo: IMEIInfo;
  onPress: (group: string) => void;
}
interface State {
  groups: string[];
}

export default class IMEIChartList extends BaseScrPart<
  Props & ViewProps,
  State
> {
  protected mqttService: IMQTTService = FactoryInjection.get<IMQTTService>(
    PUBLIC_TYPES.IMQTTService,
  );
  constructor(p: Props & ViewProps) {
    super(p);
    this.mqttService.setHandleData(new DataHandling(this));
    this.onData = this.onData.bind(this);
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
      this.props.imeiInfo.imei,
      true,
      this.onData,
    );
  }

  private readonly onData = async (data: MqttData): Promise<void> => {
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
        <IMEIChartThumb
          onPress={(): void => {
            this.props.onPress(group);
          }}
          key={`${this.props.imeiInfo.imei}-${group}`}
          name={group}
          imei={this.props.imeiInfo.imei}
        />
      );
    });
  }
  render() {
    return (
      <BaseScrPart style={{flex: 1}}>
        {this.state.groups.length > 0 ? this.renderData() : <LoadingView />}
      </BaseScrPart>
    );
  }
}
