import * as React from 'react';
import {
  TouchableOpacityProps,
  GestureResponderEvent,
  ViewProps,
  TouchableOpacity,
} from 'react-native';
import {IControl} from './IControl';
import BaseControl from 'src/shared_controls/BaseControl';
import {AppUtil} from 'core_app/common';

export interface Props extends TouchableOpacityProps, ViewProps, IControl {
  onPress?: () => void;
  preventMultiTouch?: boolean;
}

export default class TouchView<P extends Props> extends BaseControl<P> {
  private wait: number = 0;

  constructor(props: P) {
    super(props);
    this.onPress = this.onPress.bind(this);
    this.isDisabled = this.isDisabled.bind(this);
    this.isPreventMultiTouch = this.isPreventMultiTouch.bind(this);
    this.isWaitPreventMultiTouch = this.isWaitPreventMultiTouch.bind(this);
  }

  private readonly onPress = (_event: GestureResponderEvent): void => {
    if (
      !!this.props.onPress &&
      !this.isDisabled() &&
      !this.isWaitPreventMultiTouch()
    ) {
      if (this.isPreventMultiTouch()) {
        this.wait = AppUtil.now();
      }
      this.doAction(this.props.onPress!);
      if (this.isPreventMultiTouch()) {
        setTimeout((): void => {
          this.wait = 0;
        }, 1000);
      }
    }
  };

  isPreventMultiTouch(): boolean {
    return !(this.props.preventMultiTouch === false);
  }

  isWaitPreventMultiTouch(): boolean {
    const isWaiting: boolean = this.isPreventMultiTouch() && this.wait > 0;
    return isWaiting;
  }

  isDisabled(): boolean {
    return !this.props.onPress || !!this.props.disabled;
  }

  render() {
    const disabled: boolean = this.isDisabled();
    return (
      <TouchableOpacity
        {...this.props}
        style={this.props.style}
        testID={this.props.id}
        accessibilityLabel={this.props.id}
        disabled={disabled}
        onPress={disabled ? undefined : this.onPress}
      >
        {this.props.children}
      </TouchableOpacity>
    );
  }
}
