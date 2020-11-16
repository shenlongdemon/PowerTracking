import { AppUtil, CONSTANTS } from '../../common';

export class IObject {
  id: string;
  appKey: string;
  createdDate: number;
  updateAt: number;

  constructor() {
    this.id = CONSTANTS.STR_EMPTY;
    this.appKey = CONSTANTS.STR_EMPTY;
    this.createdDate = AppUtil.now();
    this.updateAt = AppUtil.now();
  }

  /**
   * check this operation is already created or just has name only for splitting
   */
  hasAppKey() {
    return !!this.appKey;
  }

  generateAppKey() {
    this.appKey = AppUtil.genAppKey();

    return this.appKey;
  }

  update(): void {
    this.updateAt = AppUtil.now();
  }

  getHash(): string {
    return `${this.appKey}-${this.updateAt}`;
  }

  static equalBase(a: IObject | null, b: IObject | null): boolean {
    if (!a && !b) {
      return true;
    }
    if ((!a && !!b) || (!!a && !b)) {
      return false;
    }
    return `${a!.id}` === `${b!.id}`;
  }

  getId(): string {
    return `${this.id}`;
  }
}
