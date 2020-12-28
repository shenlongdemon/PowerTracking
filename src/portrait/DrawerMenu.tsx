import React, {Component} from 'react';
import {Text} from 'src/shared_controls/Text';
import {View} from 'react-native';
import Button from 'src/shared_controls/Button';
import {IAuthService} from 'core_app/services';
import {FactoryInjection} from 'core_app/infrastructure';
import {PUBLIC_TYPES} from 'core_app/infrastructure/Identifiers';
import BaseScreen, {BasePops, BaseState} from 'src/BaseScreen';
import {ROUTE} from 'src/portrait/route';

export default class DrawerMenu extends BaseScreen<BasePops, BaseState> {
  public authService: IAuthService = FactoryInjection.get<IAuthService>(
    PUBLIC_TYPES.IAuthService,
  );
  constructor(p: BasePops) {
    super(p);
    this.logout.bind(this);
  }
  private logout = async (): Promise<void> => {
    const isLoggedOut: boolean = await this.authService.logOut();
    this.reset(ROUTE.AUTH);
  };
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1}}></View>
        <Button onPress={this.logout}>LOG OUT</Button>
      </View>
    );
  }
}
