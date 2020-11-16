export class Subscribe {
  private topic: string;
  private object: any;
  constructor(obj: any, topic: string) {
    this.object = obj;
    this.topic = topic;
  }

  getTopic(): string {
    return this.topic;
  }
}
