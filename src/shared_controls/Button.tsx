import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {Spinner} from 'native-base';
import TouchView, {
  Props as TouchViewProps,
} from 'src/shared_controls/TouchView';
import {Text} from 'src/shared_controls/Text';
import {color, font} from 'src/stylesheet';

export interface Props extends TouchViewProps {
  isLoading?: boolean;
  light?: boolean;
  danger?: boolean;
}

export default class Button extends TouchView<Props> {
  constructor(p: Props) {
    super(p);
  }

  protected isButtonDisabled = (): boolean => {
    return !!this.props.isLoading || this.isDisabled();
  };
  private backgroundColor(): string {
    return !!this.props.light
      ? color.lightButton
      : !!this.props.danger
      ? color.buttonDanger
      : color.button;
  }
  private textColor(): string {
    return !!this.props.light ? color.lightButtonText : color.buttonText;
  }
  render() {
    const disabled: boolean = this.isButtonDisabled();
    return (
      <TouchView
        {...this.props}
        accessibilityLabel={this.props.id}
        testID={this.props.id}
        disabled={disabled}
        style={[
          {
            backgroundColor: this.backgroundColor(),
          },
          styles.button,
          this.props.style,
        ]}>
        {!!this.props.isLoading && <Spinner color={'white'} />}
        {typeof this.props.children === 'object' && this.props.children}
        <Text
          id={`lbl${this.props.id}`}
          disabled={disabled}
          style={{
            fontSize: font.size,
            fontWeight: 'bold',
            color: this.textColor(),
          }}>
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
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
