import * as React from 'react';
import {Text as NBText, H1, H2, H3} from 'native-base';
import {TextProps} from 'react-native';
import {IControl} from 'src/shared_controls/IControl';
interface Props extends TextProps, IControl {
  H1?: boolean;
  H2?: boolean;
  H3?: boolean;
  bold?: boolean;
}
interface State {}
export class Text extends React.Component<Props, State> {
  constructor(p: Props) {
    super(p);
  }
  private children(): any {
    return this.props.children;
  }
  private getProps(): any {
    return this.props;
  }
  private renderControl(): any {
    if (!!this.props.H1 || !!this.props.H2 || !!this.props.H3) {
      if (!!this.props.H1) {
        return <H1 {...this.getProps()}>{this.children()}</H1>;
      } else if (!!this.props.H2) {
        return <H2 {...this.getProps()}>{this.children()}</H2>;
      }
      return <H3 {...this.getProps()}>{this.children()}</H3>;
    }
    return <NBText {...this.getProps()}>{this.children()}</NBText>;
  }
  render() {
    return this.renderControl();
  }
}
