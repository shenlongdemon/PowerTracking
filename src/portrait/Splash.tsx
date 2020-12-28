import * as React from 'react';
import {Button, Image, Text, View} from 'react-native';
import BaseScreen, {BasePops, BaseState} from '../BaseScreen';
import {ROUTE} from './route';
import {ENV} from 'core_app/config';
import {AppUtil, Logger} from 'core_app/common';
import {logo} from 'src/assets';
import {styleSheet} from 'src/stylesheet';
import {IAuthService} from 'core_app/services';
import {FactoryInjection} from 'core_app/infrastructure';
import {PUBLIC_TYPES} from 'core_app/infrastructure/Identifiers';

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
        <Image source={logo} style={[styleSheet.logo]} />
      </BaseScreen>
    );
  }
}
