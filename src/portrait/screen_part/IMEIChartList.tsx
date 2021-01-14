import BaseScrPart from 'src/BaseScrPart';
import {FactoryInjection} from 'core_app/infrastructure';
import {DataHandling} from 'src/infrastructure/DataHandling';
import {AppUtil, STATE_ACTION} from 'core_app/common';
import {
  FieldData,
  IGlobalState,
  IMEIInfo,
  IMQTTService,
  MqttData,
} from 'core_app/services';
import store from 'src/redux/Store';
import {PUBLIC_TYPES} from 'core_app/infrastructure/Identifiers';
import React from 'react';
import IMEIChartThumb from 'src/portrait/screen_part/IMEIChartThumb';
import LoadingView from 'src/shared_controls/LoadingView';
import {ViewProps} from 'react-native';
import {actSetIMEIData} from 'src/redux/GSDLReducer';
import {map} from 'src/middlewares/GlobalObservable';
import {RootState} from 'src/redux/rootReducer';
import {IMEIData} from 'src/redux/models/IMEIData';
import {GroupIMEIData} from 'src/redux/models/GroupIMEIData';

interface InjectProps {
  list: GroupIMEIData[];
  mainGroup: string;
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
  private globalState: IGlobalState = FactoryInjection.get<IGlobalState>(
    PUBLIC_TYPES.IGlobalState,
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
    if (!fieldData || group === 'LIVE') {
      return;
    }
    if (fieldData.field.indexOf('F') === 0) {
      this.globalState.do(STATE_ACTION.SET_IMEI_DATA, {
        mainGroup,
        group,
        imei,
        data: fieldData,
      });
    } else if (fieldData.field.indexOf('S') === 0) {
      this.globalState.do(STATE_ACTION.SET_IMEI_S_INFO, {
        mainGroup,
        group,
        imei,
        data: fieldData,
      });
    }
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
    const mainGroup: string = state.gsdlReducer.mainGroup;
    const imeiData: IMEIData | null =
      state.gsdlReducer.list.find((id: IMEIData): boolean => {
        return id.imei === props.imeiInfo.imei && id.mainGroup === mainGroup;
      }) || null;
    return {
      list: !!imeiData ? imeiData.groups : [],
      mainGroup,
    };
  },
);
