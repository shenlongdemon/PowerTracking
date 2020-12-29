import * as React from 'react';
import {View} from 'react-native';
import {ROUTE} from './route';
import BaseScreen, {BasePops, BaseState} from '../BaseScreen';
import Formik from 'src/portrait/form-validate/forms/Formik';
import UserLoginValidate from 'src/portrait/form-validate/validate/UserLogigValidate';
import {IAuthService, UserLoginDto} from 'core_app/services';
import {FactoryInjection} from 'core_app/infrastructure';
import {PUBLIC_TYPES} from 'core_app/infrastructure/Identifiers';

export default class UserLogin extends BaseScreen<BasePops, BaseState> {
  public authService: IAuthService = FactoryInjection.get<IAuthService>(
    PUBLIC_TYPES.IAuthService,
  );

  constructor(p: BasePops) {
    super(p);
  }

  moveToEMEIList() {
    this.reset(ROUTE.APP.ROUTE);
  }

  private login = async (value: {
    phone: string;
    password: string;
  }): Promise<void> => {
    const dto: UserLoginDto = await this.authService.login(
      value.phone,
      value.password,
    );
    if (dto.isLoggedIn) {
      this.moveToEMEIList();
    }
  };

  render() {
    return (
      <BaseScreen>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}>
          <Formik
            style={{
              width: 300,
            }}
            schema={UserLoginValidate}
            submit={this.login}
            defaultValue={{phone: '0978480206', password: '1234567890'}}
          />
        </View>
      </BaseScreen>
    );
  }
}
