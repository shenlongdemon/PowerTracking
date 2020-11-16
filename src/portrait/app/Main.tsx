import * as React from 'react';
import {Button, View} from 'react-native';
import BaseScreen, {BasePops, BaseState} from 'src/BaseScreen';
import {
  IMQTTService,
  FactoryInjection,
  PUBLIC_TYPES,
  Logger,
  MqttData,
  BaseDto,
} from 'core_app';
import {DataHandling} from 'src/infrastructure/DataHandling';

export default class Main extends BaseScreen<BasePops, BaseState> {
  protected mqttService: IMQTTService = FactoryInjection.get<IMQTTService>(
    PUBLIC_TYPES.IMQTTService,
  );
  constructor(p: BasePops) {
    super(p);
    this.mqttService.setHandleData(new DataHandling(this));
    Logger.log(`Main`, this);
  }

  async componentDidMount(): Promise<void> {}

  private async onData(data: MqttData): Promise<void> {
    Logger.log(`MQTT Main onData`, data);
  }

  private async move(): Promise<void> {
    const dto: BaseDto = await this.mqttService.subscribe(this.onData);
    if (dto.isSuccess) {
    }
  }
  render() {
    return (
      <View>
        <Button
          title={'MAIN'}
          onPress={() => {
            this.move();
          }}>
          MAIN
        </Button>
      </View>
    );
  }
}
