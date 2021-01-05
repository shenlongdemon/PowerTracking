import * as React from 'react';
import BaseScreen, {BasePops, BaseState} from 'src/BaseScreen';
import {IMEIInfo} from 'core_app/services';
import {CONSTANTS} from 'core_app/common';
import {Body, Left, List, ListItem} from 'native-base';
import {ScrollView, StyleSheet} from 'react-native';
import {Text} from 'src/shared_controls/Text';
import IMEIChartList from 'src/portrait/screen_part/IMEIChartList';
import {ROUTE} from 'src/portrait/route';
interface State extends BaseState {}
export default class IMEIInfoScreen extends BaseScreen<BasePops, State> {
  private readonly imeiInfo!: IMEIInfo;
  constructor(p: BasePops) {
    super(p);
    this.onChartPress = this.onChartPress.bind(this);
    this.state = {};
    const param: any | null | undefined = this.getParam();
    if (!param) {
      this.goBack();
    }
    this.imeiInfo = param as IMEIInfo;
    this.setHeader(this.imeiInfo.xdesc);
  }

  async componentDidMount(): Promise<void> {}

  private onChartPress(group: string): void {
    const data: {name: string; imei: string} = {
      name: group,
      imei: this.imeiInfo.imei,
    };
    this.navigate(ROUTE.APP.GROUP_CHART_INFO, data);
  }
  render() {
    const note: string = this.imeiInfo.note;
    const hasNote: boolean = note === CONSTANTS.STR_EMPTY;
    return (
      <BaseScreen>
        <ScrollView>
          <List>
            <ListItem noIndent>
              <Left style={styles.leftColumn}>
                <Text>IMEI No.</Text>
              </Left>
              <Body>
                <Text>{this.imeiInfo.imei}</Text>
              </Body>
            </ListItem>
            <ListItem noIndent>
              <Left style={styles.leftColumn}>
                <Text>Thời gian</Text>
              </Left>
              <Body>
                <Text>{this.imeiInfo.thoigian}</Text>
              </Body>
            </ListItem>
            <ListItem noIndent>
              <Left style={styles.leftColumn}>
                <Text>Địa chỉ</Text>
              </Left>
              <Body>
                <Text>{this.imeiInfo.addr}</Text>
              </Body>
            </ListItem>
            {hasNote && (
              <ListItem noIndent>
                <Body>
                  <Text>{note}</Text>
                </Body>
              </ListItem>
            )}
          </List>
          <IMEIChartList
            onPress={this.onChartPress}
            key={this.imeiInfo.imei}
            imeiInfo={this.imeiInfo}
          />
        </ScrollView>
      </BaseScreen>
    );
  }
}

const styles = StyleSheet.create({
  leftColumn: {
    flex: 0.4,
  },
});
