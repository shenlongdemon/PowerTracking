import * as React from 'react';
import {NavigationContainerRef} from '@react-navigation/native';
import {SafeAreaView, ScrollView} from 'react-native';

export interface BasePops {
  navigation?: NavigationContainerRef | undefined;
}
export interface BaseState {}
export default class BaseScreen<
  P extends BasePops,
  S extends BaseState
> extends React.Component<P, S> {
  constructor(p: P) {
    super(p);
  }

  protected navigate(routeName: string, data?: any | undefined): void {
    if (!!this.props.navigation) {
      this.props.navigation.navigate(routeName, data);
    }
  }

  protected reset(routeName: string): void {
    // @ts-ignore
    if (!!this.props.navigation && this.props.navigation.original) {
      // @ts-ignore
      this.props.navigation.original.reset({
        routes: [{name: routeName}],
      });
    }
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>{this.props.children}</ScrollView>
      </SafeAreaView>
    );
  }
}
