import {Text, Props as TProps} from 'src/shared_controls/Text';
import React from 'react';
import {Icon} from 'native-base';
import {IControl} from 'src/shared_controls/IControl';
import BaseControl from 'src/shared_controls/BaseControl';
import ActionSheet from 'react-native-custom-actionsheet';
import {color} from 'src/stylesheet';
import TouchView from 'src/shared_controls/TouchView';
interface Props extends IControl, TProps {
  items: string[];
  title: string;
  message: string;
  onItemSelected?: (text: string) => Promise<void>;
}
interface State {
  index: number;
}
export default class DropDownList extends React.Component<Props, State> {
  private actionSheetRef!: ActionSheet;
  constructor(p: Props) {
    super(p);
    this.state = {
      index: 0,
    };
    this.showOptions = this.showOptions.bind(this);
  }
  private readonly showOptions = (): void => {
    !!this.actionSheetRef && this.actionSheetRef.show();
  };

  private readonly renderOptions = (): any[] => {
    return this.props.items.map((item: string): any => {
      return {
        component: (
          <Text H2 style={{textAlign: 'center'}}>
            {item}
          </Text>
        ),
        height: 60,
      };
    });
  };

  handlePress = (buttonIndex): void => {
    this.setState({index: buttonIndex});
    !!this.props.onItemSelected &&
      this.props.onItemSelected(this.props.items[buttonIndex]);
  };
  render() {
    if (this.props.items.length === 0) {
      return null;
    }
    return (
      <TouchView
        {...this.props}
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: color.buttonText,
          alignContent: 'space-between',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
        }}
        onPress={this.showOptions}>
        <Text {...this.props}>{this.props.items[this.state.index]}</Text>
        <Icon
          style={[this.props.style, {marginBottom: 3, marginLeft: 10}]}
          type="FontAwesome"
          active
          name="sort-down"
        />
        <ActionSheet
          ref={(ref) => (this.actionSheetRef = ref)}
          title={this.props.title}
          message={this.props.message}
          options={this.renderOptions()}
          cancelButtonIndex={this.props.items.length}
          onPress={this.handlePress}
        />
      </TouchView>
    );
  }
}
