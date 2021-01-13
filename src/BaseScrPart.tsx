import * as React from 'react';
import {View, ViewProps} from 'react-native';

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
