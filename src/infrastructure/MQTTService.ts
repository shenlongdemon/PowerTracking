import {
  AppUtil,
  BaseDto,
  BaseSdo,
  BaseService,
  CONSTANTS,
  IMQTTService,
  Logger,
  MQTT_CODE,
  MQTT_MESSAGE_TYPE,
  MqttData,
  Subscribe,
  TOPIC_INDEX,
} from 'core_app';
import {injectable} from 'inversify';
import MQTT, {MqttClient} from 'react-native-mqtt';
@injectable()
export default class MQTTService extends BaseService implements IMQTTService {
  private client: MqttClient | null = null;
  private onData: ((data: MqttData) => Promise<void>) | null = null;
  private subscriber: Subscribe | null = null;
  constructor() {
    super();
    this.onError.bind(this);
    this.onMessage.bind(this);
    this.onClose.bind(this);
  }

  async subscribe(onData: (data: MqttData) => Promise<void>): Promise<BaseDto> {
    Logger.log(`MqttService subscribe client`, this.client);
    if (!!this.client) {
      if (!!this.subscriber) {
        // close subscriber
        this.client.unsubscribe(this.subscriber.getTopic());
        this.subscriber = null;
      }
      this.onData = onData;
      const topics: string = await this.getTopic();
      Logger.log(`MQTT subscribe `, topics);
      this.client.subscribe(topics, 0);
      const subscribe: Subscribe = new Subscribe(this.client, topics);
      this.subscriber = subscribe;
      return this.successDto(subscribe);
    }

    const sdo: BaseSdo = await this.connect();
    if (sdo.isSuccess) {
      return this.subscribe(onData);
    }
    return this.populate(sdo, false);
  }

  private async connect(): Promise<BaseSdo> {
    const sdo: BaseSdo = await this.makeConnect();
    if (sdo.isSuccess && !!sdo.data) {
      this.client = sdo.data as MqttClient;
    }
    return sdo;
  }

  private async makeConnect(): Promise<BaseSdo> {
    Logger.log(`MqttService makeConnect`);
    const promise = new Promise<BaseSdo>(
      async (resolve): Promise<void> => {
        try {
          Logger.log(`MqttService start connect`);
          MQTT.createClient({
            uri: this.getIPAddress(),
          })
            .then((client): void => {
              client.on('closed', this.onClose);
              client.on('error', (msg): void => {
                resolve(this.failedSdo(MQTT_CODE.CONNECT_ERROR, msg));
              });
              client.on('message', this.onMessage);
              client.on('connect', (): void => {
                console.log('connected');
                resolve(this.successDto(client));
              });
              client.connect();
            })
            .catch((err: any): void => {
              resolve(this.failedSdo(MQTT_CODE.CONNECT_ERROR, err));
            });
        } catch (err) {
          resolve(this.failedSdo(MQTT_CODE.CONNECT_ERROR, err));
        }
      },
    );
    return promise;
  }

  private async getTopic(): Promise<string> {
    return 'SENSOR/2CF432662C59/#';
  }

  private onError = (error: Error): void => {
    Logger.log(`MQTT error `, error);
  };

  private onClose = (): void => {
    Logger.log(`MQTT onClose `);
  };

  private getIPAddress(): string {
    return 'mqtt://113.160.233.27:1883';
  }

  private onMessage = async (data: {
    data: any | null;
    qos: number;
    retain: boolean;
    topic: string;
  }): Promise<void> => {
    Logger.log(`MQTT onMessage `, data);
    if (!data) {
      return;
    }
    const topicPath: string = data.topic;
    const topicValue: any = data.data;
    Logger.log(
      `MQTT onMessage topicPath ${topicPath}  topicValue: ${topicValue}`,
    );
    const topicItems: string[] = topicPath.split(CONSTANTS.TOPIC_SEPARATE);
    Logger.log(`MQTT onMessage topicItems`, topicItems);
    if (topicItems[TOPIC_INDEX.MAIN] !== 'SENSOR') {
      return;
    }
    const owner: string = topicItems[topicItems.length - 2];
    const topic: string = topicItems[topicItems.length - 1];
    if (topic === 'XAxis' || topic === 'YAxis' || topic === 'ZAxis') {
      !!this.onData &&
        (await this.onData({
          type: MQTT_MESSAGE_TYPE.MESSAGE,
          topicPath,
          topic,
          owner,
          data: {data: topicValue, time: AppUtil.now()},
          obj: data,
        }));
    }
  };
}
