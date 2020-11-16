import {injectable} from 'inversify';
import {IHandleDataService} from 'core_app/services/IHandleDataService';
import {IDataHandle} from 'core_app/services/IDataHandle';
import {BaseDto} from 'core_app/services/dto';
import {CONSTANTS, DTO_CODE, SDO_CODE} from 'core_app/common';
import {BaseSdo} from 'core_app/repositories';

@injectable()
export class BaseService implements IHandleDataService {
  handleData?: IDataHandle | undefined = undefined;
  protected successDto(data: any): BaseDto {
    return new BaseDto(DTO_CODE.OK, data, CONSTANTS.STR_EMPTY, true);
  }
  protected successSdo(data: any | null): BaseSdo {
    return {
      code: SDO_CODE.OK,
      data,
      message: CONSTANTS.STR_EMPTY,
      isSuccess: true,
    };
  }
  protected failedSdo(code: string, data?: any | null): BaseSdo {
    return {
      code,
      data: null,
      message: CONSTANTS.STR_EMPTY,
      isSuccess: false,
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

  private handleSdo(sdo: BaseSdo, data?: any): BaseDto {
    let dto: BaseDto = new BaseDto(
      sdo.code,
      sdo.data,
      sdo.message,
      sdo.isSuccess,
    );
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
}
