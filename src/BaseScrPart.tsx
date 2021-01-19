import * as React from 'react';
import {View, ViewProps} from 'react-native';
export interface BaseScrPartProps extends ViewProps {}

export default class BaseScrPart<
  P extends BaseScrPartProps,
  S
> extends React.Component<P, S> {
  constructor(p: P) {
    super(p);
  }
  render() {
    return <View {...this.props}>{this.props.children}</View>;
  }
}
