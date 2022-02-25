import {
  BaseDto,
  BaseSdo,
  BaseService,
  CONSTANTS,
  Logger,
  MqttData,
  Subscribe,
  SubscribeTopicDto,
  IStore,
  User,
  ENV,
  IMQTTService,
} from 'core_app';
import {inject, injectable} from 'inversify';
import MQTT, {MqttClient} from 'react-native-mqtt';
import {PUBLIC_TYPES} from 'core_app/infrastructure/Identifiers';
@injectable()
export default class BaseMQTTService
  extends BaseService
  implements IMQTTService
{
  @inject(PUBLIC_TYPES.IStore) protected store!: IStore;
  protected onData: ((data: MqttData) => Promise<void>) | null = null;
  // protected imeiMap: Map<string, {topic: string; onData: any}> = new Map<
  //     string,
  //     any
  //     >();
  public hashCode: string = `${new Date().getTime()}`;
  constructor() {
    super();
    // this.onError.bind(this);
    // this.onMessage.bind(this);
    // this.onClose.bind(this);
  }
  setOnData(onData: (data: MqttData) => Promise<void>) {
    this.onData = onData;
  }

  protected getClient(): any | null {
    return null;
  }

  protected async disconnectClient(): Promise<void> {}

  async unsubscribeIMEI(imei: string, shouldClose: boolean): Promise<void> {}

  async subscribeRSSIIMEIS(imeiList: string[]): Promise<BaseDto> {
    Logger.log(`MqttService subscribe imeiList`, imeiList);
    // if (clearAll) {
    //     this.clearAllSubscribes();
    // }
    const sdo: BaseSdo = await this.connect();
    if (sdo.isSuccess) {
      for (const imei of imeiList) {
        const topic: string = await this.getIMEIRSSITopic(imei);
        await this.subscribeTopic(topic);
      }
    }
    return {
      ...this.populate(sdo),
    };
  }
  async subscribeIMEI(imei: string): Promise<SubscribeTopicDto> {
    // if (clearAll) {
    //     this.clearAllSubscribes();
    // }
    const topic: string = await this.getIMEITopic(imei);
    Logger.log(`MqttService subscribeIMEI topic ${topic}`);
    const dto: SubscribeTopicDto = await this.subscribeTopic(topic);
    // if (dto.isSuccess && !!dto.subscribe) {
    //     this.addSubscribeByIMEI(imei, topic);
    // }
    return dto;
  }

  async close(): Promise<BaseDto> {
    Logger.logF(() => [`MqttService close ${this.getHashcode()}`]);
    this.onData = null;
    if (!!this.getClient()) {
      // this.clearAllSubscribes();
      await this.disconnectClient();
      Logger.log(`MqttService close  ${this.getHashcode} client `);
    }
    return this.successDto(null);
  }

  // protected clearAllSubscribes(): void {
  //     Logger.logF(()=>[`MqttService clearAllSubscribes ${this.getHashcode()}`]);
  //
  //     if (!this.getClient()) {
  //         return;
  //     }
  //
  //     for (let [key, value] of this.imeiMap) {
  //         this.unsubscribe(key);
  //     }
  // }

  // private addSubscribeByIMEI(imei: string, topic: string): void {
  //     this.imeiMap.set(imei, {topic, onData});
  // }

  protected getHashcode(): string {
    return CONSTANTS.STR_EMPTY;
  }

  protected async subscribeTopic(topic: string): Promise<SubscribeTopicDto> {
    return {...this.populate(this.successSdo(null), false), subscribe: null};
  }

  protected async connect(): Promise<BaseSdo> {
    return this.successSdo(null);
  }

  protected async getIMEITopic(imei: string): Promise<string> {
    const user: User | null = await this.store.getUser();
    if (!user) {
      return CONSTANTS.STR_EMPTY;
    }
    // return 'SENSOR/2CF432662C59/#';
    const topic: string = user.linkIMEIDetail.replace('{IMEI}', imei);
    // return `${CONSTANTS.TOPIC}/${imei}/#`;
    return topic;
  }

  protected async getIMEIRSSITopic(imei: string): Promise<string> {
    // return 'SENSOR/2CF432662C59/#';
    // return `${CONSTANTS.TOPIC}/${imei}/+/F_RSSI_dBm_1`;
    const user: User | null = await this.store.getUser();
    if (!user) {
      return CONSTANTS.STR_EMPTY;
    }
    // return 'SENSOR/2CF432662C59/#';
    const topic: string = user.linkRSSI.replace('{IMEI}', imei);
    // return `${CONSTANTS.TOPIC}/${imei}/#`;
    return topic;
  }
  protected async makeConnect(
    onData: (data: MqttData) => Promise<void>,
  ): Promise<BaseSdo> {
    return this.successSdo(null);
  }
}
