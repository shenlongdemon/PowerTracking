import {BaseDto} from 'core_app/services/dto';
export interface IDataHandle {
  handleDto: (dto: BaseDto, data?: any) => Promise<void>;
}
