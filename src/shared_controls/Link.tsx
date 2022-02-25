import * as React from 'react';
import {Linking} from 'react-native';
import {Text, Props as TextProps} from 'src/shared_controls/Text';
interface Props extends TextProps {
  url: string;
}
export class Link extends React.PureComponent<Props> {
  constructor(p: Props) {
    super(p);
    this.goToURL = this.goToURL.bind(this);
  }

  private getProps(): any {
    return this.props;
  }
  private goToURL(): void {
    Linking.openURL(this.props.url);
  }
  private renderControl(): any {
    return (
      <Text
        {...this.getProps()}
        style={[{color: 'blue'}, this.props.style]}
        onPress={this.goToURL}
      >
        {this.props.children}
      </Text>
    );
  }
  render() {
    return this.renderControl();
  }
}
