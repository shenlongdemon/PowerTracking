import * as React from 'react';
import {StyleSheet, Text, SafeAreaView, ScrollView} from 'react-native';
export default class BaseScrPart<P, S> extends React.Component<P, S> {
  constructor(p: P) {
    super(p);
  }
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>{this.props.children}</ScrollView>
      </SafeAreaView>
    );
  }
}
