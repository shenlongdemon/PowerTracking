import BaseScrPart from 'src/BaseScrPart';
import * as React from 'react';
import {StyleSheet, ViewProps} from 'react-native';
import {FieldData, IMEIInfo} from 'core_app/services';
import {AppUtil, CONSTANTS} from 'core_app/common';
import {Text} from 'src/shared_controls/Text';
import {Body, Icon, ListItem, Right} from 'native-base';
import * as Animatable from 'react-native-animatable';

interface Props extends ViewProps {
  imei: IMEIInfo;
  onPress: () => void;
}
interface State {
  data: FieldData | null;
}

export default class IMEIThumbListItem extends BaseScrPart<Props, State> {
  private ref!: Animatable.View;
  constructor(p: Props) {
    super(p);
    this.state = {
      data: null,
    };
  }

  onData(data: FieldData): void {
    AppUtil.runAfter(async (): Promise<void> => {
      this.setState({data});
    }, 1);
    this.ref.bounce!(500);
  }
  private readonly handleViewRef = (ref) => (this.ref = ref);

  render() {
    const isOnline: boolean = !!this.state.data;
    const data: string = !!this.state.data
      ? this.state.data.data
      : CONSTANTS.STR_EMPTY;
    return (
      <ListItem
        key={`IMEIThumbListItemListItem${this.props.imei.imei}`}
        style={{padding: 20, marginVertical: 8, marginHorizontal: 16}}
        noIndent
        button
        onPress={this.props.onPress}
      >
        <Body style={{flex: 1}}>
          <Text H3 style={{marginBottom: 10}}>
            {this.props.imei.xdesc}
          </Text>
          <Text style={{color: 'grey'}}>{this.props.imei.addr}</Text>
          <Text style={{color: 'grey'}}>{this.props.imei.imei}</Text>
        </Body>
        <Right>
          <Icon
            type="FontAwesome"
            active
            name="wifi"
            style={{
              color: isOnline ? 'green' : 'red',
              alignSelf: 'center',
              fontSize: 24,
            }}
          />
          <Animatable.View
            style={{alignSelf: 'center'}}
            ref={this.handleViewRef}
          >
            <Text H3 style={{alignSelf: 'center', color: 'grey'}}>
              {data}
            </Text>
          </Animatable.View>
        </Right>
      </ListItem>
    );
  }
}
