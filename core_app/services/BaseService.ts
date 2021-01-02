import {inject, injectable} from 'inversify';
import {IHandleDataService} from 'core_app/services/IHandleDataService';
import {IDataHandle} from 'core_app/services/IDataHandle';
import {BaseDto} from 'core_app/services/dto';
import {
  API_METHOD,
  CONSTANTS,
  DTO_CODE,
  SDO_CODE,
  STATE_ACTION,
} from 'core_app/common';
import {BaseSdo} from 'core_app/repositories';
import {PUBLIC_TYPES} from 'core_app/infrastructure/Identifiers';
import {IGlobalState} from 'core_app/services/IGlobalState';

@injectable()
export class BaseService implements IHandleDataService {
  @inject(PUBLIC_TYPES.IGlobalState) private globalState!: IGlobalState;

  handleData?: IDataHandle | undefined = undefined;

  protected successDto(data: any): BaseDto {
    return {
      code: DTO_CODE.OK,
      data,
      message: CONSTANTS.STR_EMPTY,
      isSuccess: true,
    };
  }

  protected successSdo(data: any | null): BaseSdo {
    return {
      code: SDO_CODE.OK,
      data,
      message: CONSTANTS.STR_EMPTY,
      isSuccess: true,
      method: API_METHOD.GET,
      __debug: data,
    };
  }

  protected failedSdo(code: string, data?: any | null): BaseSdo {
    return {
      code,
      data: null,
      message: CONSTANTS.STR_EMPTY,
      isSuccess: false,
      method: API_METHOD.GET,
      __debug: {code, data},
    };
  }

  protected populate(
    sdo: BaseSdo,
    checkData: boolean = false,
    data?: any,
  ): BaseDto {
    const dto: BaseDto = this.handleSdo(sdo, data);
    if (this.handleData && (dto.code !== SDO_CODE.OK || !dto.isSuccess)) {
      this.handleData.handleDto(dto, data);
    }
    dto.isSuccess = dto.isSuccess && (!checkData || (checkData && !!sdo.data));
    return dto;
  }

  protected populateData(
    data: any | null | undefined,
    action?: STATE_ACTION,
  ): any | null {
    if (!!action) {
      this.globalState.do(action, data);
    }
    return data;
  }

  protected populateAction(
    sdo: BaseSdo,
    data: any | null,
    action?: STATE_ACTION,
  ): BaseDto {
    const dto: BaseDto = this.populate(sdo, true, data);
    if (!!action) {
      this.globalState.do(action, data);
    }
    return dto;
  }

  private handleSdo(sdo: BaseSdo, data?: any): BaseDto {
    let dto: BaseDto = {
      code: sdo.code,
      data: sdo.data,
      message: sdo.message,
      isSuccess: sdo.isSuccess,
    };
    if (!sdo.isSuccess && !!this[`handle${sdo.code}`]) {
      try {
        dto = this[`handle${sdo.code}`](sdo, data);
      } catch (e) {}
    }
    return dto;
  }

  setHandleData(handle: IDataHandle): void {
    this.handleData = handle;
  }

  mappingList<T>(
    items: any[] | null | undefined,
    type: {new (): T} | null = null,
  ): T[] {
    const ts: T[] = [];
    if (!!items) {
      const tData: (T | null)[] = items.map((d: any | null | undefined) => {
        return this.mappingObject<T>(d, type);
      });

      tData.forEach((o: T | null) => {
        if (o) {
          ts.push(o);
        }
      });
    }
    return ts;
  }

  mappingObject<T>(
    data: any | null | undefined,
    type: {new (): T} | null = null,
  ): T | null {
    if (!data) {
      return null;
    }
    if (type) {
      const t: T = new type();
      Object.assign(t, data);
      return t;
    }
    return data as T;
  }
}
