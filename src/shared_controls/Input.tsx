import {TextInput, TextInputProps} from 'react-native';
import {IControl} from 'src/shared_controls/IControl';
import * as React from 'react';

interface Props extends TextInputProps, IControl {}
export default class Input extends React.PureComponent<Props> {
  constructor(p: Props) {
    super(p);
  }
  render() {
    return (
      <TextInput
        {...this.props}
        editable={!this.props.disabled}
        style={{borderBottomWidth: 0.5, borderBottomColor: '#c6c6c6'}}
      />
    );
  }
}
