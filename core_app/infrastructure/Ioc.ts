import {Container} from 'inversify';
import 'reflect-metadata';
import {PRIVATE_TYPES, PUBLIC_TYPES} from './Identifiers';
import {IAuthService} from 'core_app/services';
import {AuthService} from 'core_app/infrastructure/services';
import {AuthRepo} from 'core_app/infrastructure/repositories';
import {IAuthRepo} from 'core_app/repositories';

const builder: Container = new Container();

builder.bind<IAuthService>(PUBLIC_TYPES.IAuthService).to(AuthService);
builder.bind<IAuthRepo>(PRIVATE_TYPES.IAuthRepo).to(AuthRepo);

export default builder;
