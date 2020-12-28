import * as React from 'react';
import {NavigationContainerRef} from '@react-navigation/native';
import {SafeAreaView, ScrollView} from 'react-native';
import Store from 'src/redux/Store';
import {actSetLoading} from 'src/redux/UIReducer';
import {Logger} from 'core_app/common';
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
  protected setHeader(title: string): void {
    if (!!this.props.navigation) {
      // @ts-ignore
      this.props.navigation.setOptions({title: title});
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

  protected async setLoading(isLoading: boolean): Promise<void> {
    Store.dispatch(actSetLoading(isLoading));
  }
  protected getParam(): any | null | undefined {
    // @ts-ignore
    const state: {params: any; routeName: string} | null | undefined =
      // @ts-ignore
      this.props.navigation.state;
    if (!!state) {
      const param: any | null | undefined = state.params;
      Logger.log(`Navigation ${state.routeName}`, state.params);
      return param;
    }
    return null;
  }

  protected goBack(): void {
    if (!!this.props.navigation?.canGoBack) {
      this.props.navigation?.goBack();
    }
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        {/*<Image style={styleSheet.imageBackground} source={background} />*/}
        <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}}>
          {this.props.children}
        </ScrollView>
      </SafeAreaView>
    );
  }
}
