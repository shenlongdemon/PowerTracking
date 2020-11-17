import * as React from 'react';
import {Button, Text, View} from 'react-native';
import BaseScreen, {BasePops, BaseState} from 'src/BaseScreen';
import {
  AppUtil,
  BaseDto,
  CONSTANTS,
  FactoryInjection,
  IMQTTService,
  Logger,
  MQTT_MESSAGE_TYPE,
  MqttData,
  PUBLIC_TYPES,
  TOPIC_INDEX,
} from 'core_app';
import {DataHandling} from 'src/infrastructure/DataHandling';
import TopicChart from 'src/portrait/screen_part/TopicChart';
interface State extends BaseState {
  topics: string[];
}
export default class Main extends BaseScreen<BasePops, State> {
  protected mqttService: IMQTTService = FactoryInjection.get<IMQTTService>(
    PUBLIC_TYPES.IMQTTService,
  );
  constructor(p: BasePops) {
    super(p);
    this.mqttService.setHandleData(new DataHandling(this));
    this.onData.bind(this);
    this.state = {
      topics: [],
    };
    Logger.log(`Main`, this);
  }

  async componentDidMount(): Promise<void> {
    await this.subscribe();
  }

  private onData = async (data: MqttData): Promise<void> => {
    Logger.log(`MQTT Main onData`, data);
    await this.handleData(data);
  };

  private async handleData(data: MqttData): Promise<void> {
    Logger.log(`MQTT Main onData`, data);
    const topics: string[] = data.topicPath.split(CONSTANTS.TOPIC_SEPARATE);
    const topic: string = topics[TOPIC_INDEX.MAIN];
    if (this.state.topics.indexOf(topic) < 0) {
      this.setState({topics: [...this.state.topics, topic]});
    }
  }

  private async subscribe(): Promise<void> {
    await AppUtil.sleep(2000);
    await this.mqttService.subscribe(this.onData);
  }

  private renderTopic(): any {
    return this.state.topics.map((topic: string): any => {
      return <TopicChart key={topic} topic={topic} />;
    });
  }
  render() {
    return <View>{this.renderTopic()}</View>;
  }
}
