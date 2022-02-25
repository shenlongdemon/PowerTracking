import {
  AppUtil,
  BaseSdo,
  CONSTANTS,
  Logger,
  MQTT_CODE,
  MQTT_MESSAGE_TYPE,
  MqttData,
  Subscribe,
  TOPIC_INDEX,
  SubscribeTopicDto,
  ENV,
} from 'core_app';
import {injectable} from 'inversify';
import MQTT, {MqttClient} from 'react-native-mqtt';
import BaseMQTTService from 'src/infrastructure/BaseMQTTService';
@injectable()
export default class MQTTService extends BaseMQTTService {
  private client: MqttClient | null = null;

  protected getClient(): any {
    return this.client;
  }

  protected getHashcode(): string {
    return `${this.hashCode}_${!!this.client ? this.client.clientRef : ''}`;
  }

  async unsubscribeIMEI(imei: string, shouldClose: boolean): Promise<void> {
    if (!!this.client) {
      const topic: string = await this.getIMEITopic(imei);
      this.client.unsubscribe(topic);
      Logger.logF(() => [
        `MqttService unsubscribeIMEI ${imei} ${topic} ${this.getHashcode()}`,
        this.client,
      ]);
    }
    if (shouldClose) {
      await this.close();
    }
  }

  protected async connect(): Promise<BaseSdo> {
    if (!!this.client) {
      return this.successSdo(this.client);
    }
    const sdo: BaseSdo = await this.makeConnect();
    if (sdo.isSuccess && !!sdo.data) {
      this.client = sdo.data as MqttClient;
      Logger.logF(() => [
        `MqttService connect client ${this.getHashcode()}`,
        this.client,
      ]);
    }
    Logger.logF(() => [
      `MqttService connect client ${this.getHashcode()}`,
      this.client,
      sdo,
    ]);
    return sdo;
  }

  protected async subscribeTopic(topic: string): Promise<SubscribeTopicDto> {
    Logger.logF(() => [
      `MqttService subscribe topic ${topic} ${this.getHashcode()}`,
    ]);

    if (!!this.client) {
      this.client.unsubscribe(topic);

      this.client.subscribe(topic, 0);
      const subscribe: Subscribe = new Subscribe(this.client, topic);
      return {...this.successDto(subscribe), subscribe};
    }

    const sdo: BaseSdo = await this.connect();
    if (sdo.isSuccess) {
      return this.subscribeTopic(topic);
    }
    return {...this.populate(sdo, false), subscribe: null};
  }

  protected async disconnectClient(): Promise<void> {
    if (!!this.client) {
      this.client.disconnect();
      // TO DO if we remove client, all clients will be removed so if we call this, we have to re-subscribe others
      // MQTT.removeClient(this.client);
      this.client = null;
    }
  }

  protected async makeConnect(): Promise<BaseSdo> {
    Logger.log(`MqttService makeConnect`);
    const promise = new Promise<BaseSdo>(async (resolve): Promise<void> => {
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
            client.on('message', (data): void => {
              Logger.logF(() => [
                `message ${this.hashCode} ${client.clientRef}`,
              ]);
              this.onMessage(data);
            });
            client.on('connect', (): void => {
              Logger.logF(() => [
                `connect ${this.hashCode} ${client.clientRef}`,
              ]);
              resolve(this.successSdo(client));
            });
            client.connect();
          })
          .catch((err: any): void => {
            resolve(this.failedSdo(MQTT_CODE.CONNECT_ERROR, err));
          });
      } catch (err) {
        resolve(this.failedSdo(MQTT_CODE.CONNECT_ERROR, err));
      }
    });
    return promise;
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

  private onMessage = async (
    data:
      | {
          data: any | null;
          qos: number;
          retain: boolean;
          topic: string;
        }
      | null
      | undefined,
  ): Promise<void> => {
    // Logger.log(`MQTT onMessage `, data);
    if (!data || !this.onData) {
      return;
    }
    const topicPath: string = data.topic;
    const topicItems: string[] = topicPath.split(CONSTANTS.TOPIC_SEPARATE);
    const mainGroup: string = topicItems[TOPIC_INDEX.MAIN];

    const imei: string = topicItems[TOPIC_INDEX.IMEI];
    const field: string = topicItems[topicItems.length - 1];
    const groups: string[] = field.split('_');
    if (groups.length !== 4) {
      return;
    }
    const topicValue: any = data.data;
    const value: number = topicValue;
    const group: string = groups[1];
    const unit: string = groups[2];
    !!this.onData &&
      (await this.onData({
        type: MQTT_MESSAGE_TYPE.MESSAGE,
        topicPath,
        imei,
        mainGroup,
        group,
        unit,
        data: {
          field,
          data: value,
          time: AppUtil.now(),
        },
        obj: data,
      }));
  };
}
