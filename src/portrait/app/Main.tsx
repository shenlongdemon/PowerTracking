import * as React from 'react';
import BaseScreen, {BasePops, BaseState} from 'src/BaseScreen';
import {
  FieldData,
  IMEIInfo,
  IMEIListDto,
  IMQTTService,
  MqttData,
} from 'core_app/services';
import {FactoryInjection} from 'core_app/infrastructure';
import {PUBLIC_TYPES} from 'core_app/infrastructure/Identifiers';
import {IIMEIService} from 'core_app/services/IIMEIService';
import {Text} from 'src/shared_controls/Text';
import {FlatList, View} from 'react-native';
import TouchView from 'src/shared_controls/TouchView';
import {ROUTE} from 'src/portrait/route';
import IMEIThumbListItem from 'src/portrait/screen_part/IMEIThumbListItem';
import {AppUtil} from 'core_app/common';
import {Fab, Icon} from 'native-base';
import {color} from 'src/stylesheet';
import {sizeFont, sizeHeight} from 'src/commons/Size';

interface State extends BaseState {
  list: IMEIInfo[];
}

export default class Main extends BaseScreen<BasePops, State> {
  public IMEIService: IIMEIService = FactoryInjection.get<IIMEIService>(
    PUBLIC_TYPES.IIMEIService,
  );
  protected mqttService: IMQTTService = FactoryInjection.get<IMQTTService>(
    PUBLIC_TYPES.IMQTTService,
  );
  private imeiItemRefs: any = {};
  constructor(p: BasePops) {
    super(p);
    this.onRSSIData = this.onRSSIData.bind(this);
    this.state = {list: []};
  }

  async componentDidMount(): Promise<void> {
    await this.setLoading(true);

    const dto: IMEIListDto = await this.IMEIService.getIMEIs();
    if (dto.isSuccess) {
      const list: IMEIInfo[] = dto.list || [];
      this.setState({list});
      if (list.length > 0) {
        AppUtil.runAfter(async (): Promise<void> => {
          const imeiList: string[] = list.map((imei: IMEIInfo): string => {
            return imei.imei;
          });
          await this.subscribeRSSI(imeiList);
        }, 1);
      }
    }
    await this.setLoading(false);
  }
  async componentWillUnmount(): Promise<void> {
    await this.close();
  }

  private async close(): Promise<void> {
    await this.mqttService.close();
  }
  private async subscribeRSSI(imeiList: string[]): Promise<void> {
    await this.mqttService.subscribeRSSIIMEIS(
      // this.props.imeiDetail.imei,
      imeiList,
      true,
      this.onRSSIData,
    );
  }
  private readonly onRSSIData = async (data: MqttData): Promise<void> => {
    await this.handleRSSIData(data);
  };

  private async handleRSSIData(data: MqttData): Promise<void> {
    // Logger.log(`MQTT Main onData`, data);
    const group: string = data.group;
    const imei: string = data.imei;
    const fieldData: FieldData | null = data.data;
    if (group !== 'RSSI' || !fieldData || fieldData.field.indexOf('F') !== 0) {
      return;
    }
    const item: {current: IMEIThumbListItem} | null = this.imeiItemRefs[imei];
    if (!!item) {
      item.current.onData(fieldData);
    }
  }

  private async onIMEISelected(item: IMEIInfo): Promise<void> {
    this.navigate(ROUTE.APP.IMEI_INFO, item);
  }

  private renderItem = (data: {item: IMEIInfo; index: number}): any => {
    this.imeiItemRefs[data.item.imei] = React.createRef();
    return (
      <IMEIThumbListItem
        onPress={(): void => {
          this.onIMEISelected(data.item);
        }}
        key={`IMEIThumbListItem_${data.item.imei}`}
        ref={this.imeiItemRefs[data.item.imei]}
        imei={data.item}
      />
    );
  };

  render() {
    return (
      <BaseScreen>
        <View style={{flex: 1}}>
          <FlatList
            style={{marginBottom: 30}}
            data={this.state.list}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.imei}
          />
          <TouchView
            // disable={this.props.isLoading}
            id={'btnAdd'}
            style={{
              position: 'absolute',
              flex: 1,
              zIndex: 100,
              bottom: sizeHeight(2.5),
              right: sizeHeight(3.5),
              backgroundColor: color.button,
              width: sizeHeight(9),
              height: sizeHeight(9),
              borderRadius: sizeHeight(4.5),
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {}}>
            <Icon
              name={'plus'}
              type={'AntDesign'}
              style={{fontSize: sizeFont(12), color: color.buttonText}}
            />
          </TouchView>
        </View>
      </BaseScreen>
    );
  }
}
