import * as React from 'react';
import {Text as NBText, H1, H2, H3} from 'native-base';
import {TextProps} from 'react-native';
import {IControl} from 'src/shared_controls/IControl';
import {font} from 'src/stylesheet';
import {sizeFont} from 'src/commons/Size';
export interface Props extends TextProps, IControl {
  H1?: boolean;
  H2?: boolean;
  H3?: boolean;
  bold?: boolean;
}
export class Text extends React.PureComponent<Props> {
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
    let fontSize: number = 5;
    if (!!this.props.H1 || !!this.props.H2 || !!this.props.H3) {
      if (!!this.props.H1) {
        fontSize += 6;
      } else if (!!this.props.H2) {
        fontSize += 4;
      } else {
        fontSize += 2;
      }
    }
    fontSize = sizeFont(fontSize);
    return (
      <NBText
        {...this.getProps()}
        style={[{fontSize: fontSize}, this.props.style]}>
        {this.children()}
      </NBText>
    );
  }
  render() {
    return this.renderControl();
  }
}
