import * as React from 'react';
import {Image, ScrollView, View} from 'react-native';
import {ROUTE} from './route';
import BaseScreen, {BasePops, BaseState} from '../BaseScreen';
import Formik from 'src/portrait/form-validate/forms/Formik';
import UserLoginValidate from 'src/portrait/form-validate/validate/UserLogigValidate';
import {IAuthService, UserLoginDto} from 'core_app/services';
import {FactoryInjection} from 'core_app/infrastructure';
import {PUBLIC_TYPES} from 'core_app/infrastructure/Identifiers';
import {Text} from 'src/shared_controls/Text';
import {ENV} from 'core_app/config';
import {Link} from 'src/shared_controls/Link';
import {logo} from 'src/assets';
import {styleSheet} from 'src/stylesheet';
import {DataHandling} from 'src/infrastructure/DataHandling';

export default class UserLogin extends BaseScreen<BasePops, BaseState> {
  public authService: IAuthService = FactoryInjection.get<IAuthService>(
    PUBLIC_TYPES.IAuthService,
  );

  constructor(p: BasePops) {
    super(p);
    this.authService.setHandleData(new DataHandling(this));
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
            alignItems: 'center',
            flex: 1,
            marginTop: -20,
          }}>
          <Image source={logo} style={[styleSheet.logo]} />
          <Formik
            style={{
              width: 300,
            }}
            schema={UserLoginValidate}
            submit={this.login}
            defaultValue={{phone: '0978480206', password: '1234567890'}}
          />
        </View>
        <Link style={{alignSelf: 'center', color: 'grey'}} url={ENV.WEB_SITE}>
          Design by {ENV.WEB_SITE_NAME}
        </Link>
        <Text style={{alignSelf: 'center', color: 'grey'}}>
          Made in VietNam
        </Text>
        <Text style={{alignSelf: 'center', color: 'grey'}}>
          Version {ENV.VERSION_CODE}
        </Text>
      </BaseScreen>
    );
  }
}
