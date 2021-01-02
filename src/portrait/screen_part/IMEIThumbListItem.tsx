import BaseScrPart from 'src/BaseScrPart';
import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {FieldData, IMEIGroupData, IMEIInfo} from 'core_app/services';
import {connect, ConnectedProps} from 'react-redux';
import {GSDL_REDUCER_ACTION, GSDLReduxState} from 'src/redux/GSDLReducer';
import {AddIMEIData} from 'src/redux/models/AddIMEIData';
import {RootState} from 'src/redux/rootReducer';
import {AppUtil, CONSTANTS, DateUtils} from 'core_app/common';
import {Text} from 'src/shared_controls/Text';
import {Body, Icon, Left, List, ListItem, Right} from 'native-base';
import {LineChart, Grid, XAxis, YAxis} from 'react-native-svg-charts';

interface Props {
  imei: IMEIInfo;
}
interface State {
  data: FieldData | null;
}

export default class IMEIThumbListItem extends BaseScrPart<Props, State> {
  constructor(p: Props) {
    super(p);
    this.state = {
      data: null,
    };
  }

  onData(data: FieldData): void {
    this.setState({data});
  }

  render() {
    const isOnline: boolean = !!this.state.data;
    const data: string = !!this.state.data
      ? this.state.data.data
      : CONSTANTS.STR_EMPTY;
    return (
      <BaseScrPart key={this.props.imei.imei}>
        <ListItem noIndent>
          <Body style={{flex: 1}}>
            <Text>{this.props.imei.imei}</Text>
          </Body>
          <Right>
            <Icon
              type="FontAwesome"
              active
              name="wifi"
              style={{color: isOnline ? 'green' : 'red', alignSelf: 'center'}}
            />
            <Text H3 style={{alignSelf: 'center', color: 'grey'}}>
              {data}
            </Text>
          </Right>
        </ListItem>
      </BaseScrPart>
    );
  }
}
const styles = StyleSheet.create({
  leftColumn: {
    flex: 0.4,
  },
});
