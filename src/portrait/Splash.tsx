import * as React from 'react';
import {Button, Text, View} from 'react-native';
import BaseScreen, {BasePops, BaseState} from '../BaseScreen';
import {ROUTE} from './route';
import {ENV} from 'core_app/config';
import {Logger} from 'core_app/common';

export default class Splash extends BaseScreen<BasePops, BaseState> {
  constructor(p: BasePops) {
    super(p);
    Logger.log(`Splash `);
  }
  componentDidMount() {
    // this.navigate(ROUTE.AUTH.ROUTE);
  }
  move() {
    this.reset(ROUTE.AUTH);
  }

  render() {
    return (
      <View>
        <Button
          title={ENV.ENVIRONMENT}
          onPress={() => {
            this.move();
          }}>
          {ENV.ENVIRONMENT}
        </Button>
      </View>
    );
  }
}
