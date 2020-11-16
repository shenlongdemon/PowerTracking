import * as React from 'React';

import {BaseDto, CONSTANTS, IDataHandle} from 'core_app';

export class DataHandling implements IDataHandle {
  private readonly component!: React.Component;

  constructor(comp: React.Component) {
    this.component = comp;
  }

  handleDto = async (dto: BaseDto, data?: any): Promise<void> => {
    let message: string = CONSTANTS.STR_EMPTY;
    if (!dto.isSuccess) {
      try {
        message = await this.component[`handle${dto.code}`](dto, data);
      } catch (e) {
        message = `${dto.code} ${dto.message}`;
        alert(message);
      }
    }
  };
}
