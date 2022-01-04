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
  SubscribeTopicDto, IStore, User,
} from 'core_app';
import {inject, injectable} from 'inversify';
import MQTT, {MqttClient} from 'react-native-mqtt';
import {PUBLIC_TYPES} from "core_app/infrastructure/Identifiers";
@injectable()
export default class MQTTService extends BaseService implements IMQTTService {
  @inject(PUBLIC_TYPES.IStore) private store!: IStore;
  private client: MqttClient | null = null;
  private imeiMap: Map<string, {topic: string; onData: any}> = new Map<
    string,
    any
  >();
  constructor() {
    super();
    this.onError.bind(this);
    this.onMessage.bind(this);
    this.onClose.bind(this);
  }

  private clearAllSubscribes(): void {
    Logger.log(`MqttService clearAllSubscribes`, this.client);

    if (!this.client) {
      return;
    }
    for (const imeiMapKey in this.imeiMap) {
      this.unsubscribe(imeiMapKey);
    }
  }
  private addSubscribeByIMEI(imei: string, topic: string, onData: any): void {
    this.imeiMap.set(imei, {topic, onData});
  }
  async subscribeIMEI(
    imei: string,
    clearAll: boolean,
    onData: (data: MqttData) => Promise<void>,
  ): Promise<SubscribeTopicDto> {
    if (clearAll) {
      this.clearAllSubscribes();
    }
    const topic: string = await this.getIMEITopic(imei);
    Logger.log(`MqttService subscribeIMEI topic ${topic}`);
    const dto: SubscribeTopicDto = await this.subscribeTopic(topic, onData);
    if (dto.isSuccess && !!dto.subscribe) {
      this.addSubscribeByIMEI(imei, topic, onData);
    }
    return dto;
  }

  async close(): Promise<BaseDto> {
    Logger.log(`MqttService close`);

    if (this.client) {
      this.clearAllSubscribes();
      this.client.disconnect();
      MQTT.removeClient(this.client);
    }

    this.client = null;
    return this.successDto(null);
  }

  private unsubscribe(imei: string): void {
    if (this.client) {
      const item: {topic: string; onData: any} = this.imeiMap[imei];
      Logger.log(`MqttService unsubscribe ${item.topic}`);

      this.client.unsubscribe(item.topic);
      item.onData = undefined;
    }
  }

  async subscribeRSSIIMEIS(
    imeiList: string[],
    clearAll: boolean,
    onData: (data: MqttData) => Promise<void>,
  ): Promise<BaseDto> {
    Logger.log(`MqttService subscribe imeiList`, imeiList);
    if (clearAll) {
      this.clearAllSubscribes();
    }
    const sdo: BaseSdo = await this.connect(onData);
    if (sdo.isSuccess) {
      for (const imei of imeiList) {
        const topic: string = await this.getIMEIRSSITopic(imei);
        await this.subscribeTopic(topic, onData);
      }
    }
    return {
      ...this.populate(sdo),
    };
  }

  private async subscribeTopic(
    topic: string,
    onData: (data: MqttData) => Promise<void>,
  ): Promise<SubscribeTopicDto> {
    Logger.log(`MqttService subscribe client`, this.client);
    if (!!this.client) {
      Logger.log(`MQTT subscribe `, topic);
      this.client.subscribe(topic, 0);
      const subscribe: Subscribe = new Subscribe(this.client, topic);
      return {...this.successDto(subscribe), subscribe};
    }

    const sdo: BaseSdo = await this.connect(onData);
    if (sdo.isSuccess) {
      return this.subscribeTopic(topic, onData);
    }
    return {...this.populate(sdo, false), subscribe: null};
  }

  private async connect(
    onData: (data: MqttData) => Promise<void>,
  ): Promise<BaseSdo> {
    const sdo: BaseSdo = await this.makeConnect(onData);
    if (sdo.isSuccess && !!sdo.data) {
      this.client = sdo.data as MqttClient;
    }
    Logger.log(`MqttService connect`, sdo);
    return sdo;
  }

  private async makeConnect(
    onData: (data: MqttData) => Promise<void>,
  ): Promise<BaseSdo> {
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
              client.on('message', (data): void => {
                Logger.log('message', data);
                this.onMessage(onData, data);
              });
              client.on('connect', (): void => {
                Logger.log('connected');
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
      },
    );
    return promise;
  }

  private async getIMEITopic(imei: string): Promise<string> {
    const user: User| null = await this.store.getUser();
    if(!user){
      return CONSTANTS.STR_EMPTY;
    }
    // return 'SENSOR/2CF432662C59/#';
    const topic: string = user.linkRSSI.replace('{IMEI}', imei);
    // return `${CONSTANTS.TOPIC}/${imei}/#`;
    return topic;
  }

  private async getIMEIRSSITopic(imei: string): Promise<string> {
    // return 'SENSOR/2CF432662C59/#';
    // return `${CONSTANTS.TOPIC}/${imei}/+/F_RSSI_dBm_1`;
    const user: User | null = await this.store.getUser();
    if(!user){
      return CONSTANTS.STR_EMPTY;
    }
    // return 'SENSOR/2CF432662C59/#';
    const topic: string = user.linkIMEIDetail.replace('{IMEI}', imei);
    // return `${CONSTANTS.TOPIC}/${imei}/#`;
    return topic;
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
    onData: ((data: MqttData) => Promise<void>) | null | undefined,
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
    if (!data || !onData) {
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
    !!onData &&
      (await onData({
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
