import BaseControl, {
  Props as BaseControlProps,
} from 'src/shared_controls/BaseControl';
import TouchView from 'src/shared_controls/TouchView';
import {sizeFont, sizeHeight} from 'src/commons/Size';
import {color} from 'src/stylesheet';
import {Icon} from 'native-base';
import * as React from 'react';
interface Props extends BaseControlProps {
  corner?: 'right_bottom' | 'top_left';
  iconName: string;
  iconType?: string;
  danger?: boolean;
  onPress?: () => Promise<void>;
}
export class FloatCircleButton extends BaseControl<Props> {
  constructor(p: Props) {
    super(p);
  }
  private getCorner(): any {
    if (this.props.corner === 'top_left') {
      return {top: sizeHeight(1.5), left: sizeHeight(3.5)};
    }
    return {bottom: sizeHeight(1.5), right: sizeHeight(3.5)};
  }
  render() {
    const corner = this.getCorner();
    return (
      <TouchView
        id={this.props.id}
        key={this.props.id}
        style={{
          ...corner,
          position: 'absolute',
          flex: 1,
          zIndex: 100,
          bottom: sizeHeight(1.5),
          right: sizeHeight(3.5),
          backgroundColor: !!this.props.danger
            ? color.buttonDanger
            : color.button,
          width: sizeHeight(9),
          height: sizeHeight(9),
          borderRadius: sizeHeight(4.5),
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={this.props.onPress}
      >
        <Icon
          name={this.props.iconName || 'plus'}
          // @ts-ignore
          type={this.props.iconType || 'FontAwesome'}
          style={{fontSize: sizeFont(28), color: color.buttonText}}
        />
      </TouchView>
    );
  }
}
