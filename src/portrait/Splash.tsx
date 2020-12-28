import * as React from 'react';
import {Button, Image, Text, View} from 'react-native';
import BaseScreen, {BasePops, BaseState} from '../BaseScreen';
import {ROUTE} from './route';
import {ENV} from 'core_app/config';
import {AppUtil, Logger} from 'core_app/common';
import {logo} from 'src/assets';
import {styleSheet} from 'src/stylesheet';

export default class Splash extends BaseScreen<BasePops, BaseState> {
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

  move(): void {
    this.reset(ROUTE.AUTH);
  }

  render() {
    return (
      <BaseScreen>
        <Image source={logo} style={[styleSheet.logo]} />
      </BaseScreen>
    );
  }
}
