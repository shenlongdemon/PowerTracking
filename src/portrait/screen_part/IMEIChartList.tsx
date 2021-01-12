import BaseScrPart from 'src/BaseScrPart';
import {FactoryInjection} from 'core_app/infrastructure';
import {DataHandling} from 'src/infrastructure/DataHandling';
import {AppUtil} from 'core_app/common';
import {FieldData, IMEIInfo, IMQTTService, MqttData} from 'core_app/services';
import store from 'src/redux/Store';
import {PUBLIC_TYPES} from 'core_app/infrastructure/Identifiers';
import React from 'react';
import IMEIChartThumb from 'src/portrait/screen_part/IMEIChartThumb';
import LoadingView from 'src/shared_controls/LoadingView';
import {ViewProps} from 'react-native';
import {actSetIMEIData} from 'src/redux/GSDLReducer';
import {AddIMEIData} from 'src/redux/models/AddIMEIData';
import {map} from 'src/middlewares/GlobalObservable';
import {RootState} from 'src/redux/rootReducer';
import {IMEIData} from 'src/redux/models/IMEIData';
import {GroupIMEIData} from 'src/redux/models/GroupIMEIData';

interface InjectProps {
  list: GroupIMEIData[];
}
interface Props {
  imeiInfo: IMEIInfo;
  onPress: (group: string) => void;
}

interface State {}

class IMEIChartList extends BaseScrPart<
  Props & ViewProps & InjectProps,
  State
> {
  protected mqttService: IMQTTService = FactoryInjection.get<IMQTTService>(
    PUBLIC_TYPES.IMQTTService,
  );
  constructor(p: Props & ViewProps & InjectProps) {
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
    const mainGroup: string = data.mainGroup;
    const group: string = data.group;
    const imei: string = data.imei;
    const fieldData: FieldData | null = data.data;
    if (!fieldData || fieldData.field.indexOf('F') !== 0 || group === 'LIVE') {
      return;
    }

    store.dispatch(
      actSetIMEIData({
        mainGroup,
        group,
        imei,
        data: fieldData,
      }),
    );
  }

  private renderData(): any {
    const groups: string[] = AppUtil.distinct(
      this.props.list.map((id: GroupIMEIData): string => {
        return id.group;
      }),
    );

    if (groups.length) {
      return groups.map((group): any => {
        return (
          <IMEIChartThumb
            onPress={(): void => {
              this.props.onPress(group);
            }}
            key={`${this.props.imeiInfo.imei}-${group}`}
            group={group}
            imei={this.props.imeiInfo.imei}
          />
        );
      });
    }
    return <LoadingView />;
  }
  render() {
    return <BaseScrPart style={{flex: 1}}>{this.renderData()}</BaseScrPart>;
  }
}
export default map<InjectProps>(
  IMEIChartList,
  (state: RootState, props: Props): InjectProps => {
    const imeiData: IMEIData | null =
      state.gsdlReducer.list.find((id: IMEIData): boolean => {
        return id.imei === props.imeiInfo.imei;
      }) || null;
    return {
      list: !!imeiData ? imeiData.groups : [],
    };
  },
);
