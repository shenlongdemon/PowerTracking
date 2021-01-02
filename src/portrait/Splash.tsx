import * as React from 'react';
import {Image, ScrollView} from 'react-native';
import BaseScreen, {BasePops, BaseState} from '../BaseScreen';
import {ROUTE} from './route';
import {Logger} from 'core_app/common';
import {logo} from 'src/assets';
import {styleSheet} from 'src/stylesheet';
import {IAuthService} from 'core_app/services';
import {FactoryInjection} from 'core_app/infrastructure';
import {PUBLIC_TYPES} from 'core_app/infrastructure/Identifiers';
import {Text} from 'src/shared_controls/Text';
import {ENV} from 'core_app/config';

export default class Splash extends BaseScreen<BasePops, BaseState> {
  public authService: IAuthService = FactoryInjection.get<IAuthService>(
    PUBLIC_TYPES.IAuthService,
  );
  constructor(p: BasePops) {
    super(p);
    Logger.log(`Splash `);
  }
  componentDidMount() {
    // this.navigate(ROUTE.AUTH.ROUTE);
    setTimeout((): void => {
      this.move();
    }, 2000);
  }

  async move(): Promise<void> {
    const isLoggedIn: boolean = await this.authService.isLoggedIn();
    if (isLoggedIn) {
      this.reset(ROUTE.APP.ROUTE);
    } else {
      this.reset(ROUTE.AUTH);
    }
  }

  render() {
    return (
      <BaseScreen>
        <Image source={logo} style={[styleSheet.logo_splash]} />
        <Text H3 style={{alignSelf: 'center', color: 'grey'}}>
          Design by GiamSatDuLieu.com
        </Text>
        <Text H3 style={{alignSelf: 'center', color: 'grey'}}>
          Made in VietNam
        </Text>
        <Text style={{alignSelf: 'center', color: 'grey'}}>
          Version {ENV.VERSION_CODE}
        </Text>
      </BaseScreen>
    );
  }
}
