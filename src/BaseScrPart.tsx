import * as React from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  View,
  ViewProps,
} from 'react-native';
import {Container} from 'native-base';

export default class BaseScrPart<
  P extends ViewProps,
  S
> extends React.Component<P, S> {
  constructor(p: P) {
    super(p);
  }
  render() {
    return <View style={this.props.style}>{this.props.children}</View>;
  }
}
