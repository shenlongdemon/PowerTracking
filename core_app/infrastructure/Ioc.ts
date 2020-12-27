import {Container} from 'inversify';
import 'reflect-metadata';
import {PRIVATE_TYPES, PUBLIC_TYPES} from './Identifiers';
import {IAuthService} from 'core_app/services';
import {AuthService} from 'core_app/infrastructure/services';
import {AuthRepo} from 'core_app/infrastructure/repositories';
import {IAuthRepo} from 'core_app/repositories';
import {IIMEIService} from 'core_app/services/IIMEIService';
import {IMEIService} from 'core_app/infrastructure/services/IMEIService';
import {IIMEIRepo} from 'core_app/repositories/IIMEIRepo';
import {IMEIRepo} from 'core_app/infrastructure/repositories/IMEIRepo';

const builder: Container = new Container();

builder.bind<IAuthService>(PUBLIC_TYPES.IAuthService).to(AuthService);
builder.bind<IIMEIService>(PUBLIC_TYPES.IIMEIService).to(IMEIService);

builder.bind<IAuthRepo>(PRIVATE_TYPES.IAuthRepo).to(AuthRepo);
builder.bind<IIMEIRepo>(PRIVATE_TYPES.IIMEIRepo).to(IMEIRepo);

export default builder;
