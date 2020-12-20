import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {Spinner} from 'native-base';
import TouchView, {
  Props as TouchViewProps,
} from 'src/shared_controls/TouchView';
import {Text} from 'src/shared_controls/Text';
import {buttonBackground} from 'src/assets';
import {styleSheet} from 'src/stylesheet';

export interface Props extends TouchViewProps {
  isLoading?: boolean;
  title: string;
}

export default class Button extends TouchView<Props> {
  constructor(p: Props) {
    super(p);
  }

  protected isButtonDisabled = (): boolean => {
    return !!this.props.isLoading || this.isDisabled();
  };

  render() {
    const disabled: boolean = this.isButtonDisabled();
    return (
      <TouchView
        {...this.props}
        accessibilityLabel={this.props.id}
        testID={this.props.id}
        disabled={disabled}
        style={[styles.button, this.props.style]}>
        <Image source={buttonBackground} style={[styleSheet.imageBackground]} />
        {!!this.props.isLoading && <Spinner color={'white'} />}
        {typeof this.props.children === 'object' && this.props.children}
        <Text
          id={`lbl${this.props.id}`}
          disabled={disabled}
          style={{fontWeight: 'bold', color: 'white'}}>
          {!!this.props.isLoading ? 'Wait...' : `${this.props.children}`}
        </Text>
      </TouchView>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    minWidth: 60,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
