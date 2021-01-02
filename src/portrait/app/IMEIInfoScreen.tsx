import * as React from 'react';
import BaseScreen, {BasePops, BaseState} from 'src/BaseScreen';
import {IMEIInfo} from 'core_app/services';
import {FactoryInjection} from 'core_app/infrastructure';
import {CONSTANTS} from 'core_app/common';
import {PUBLIC_TYPES} from 'core_app/infrastructure/Identifiers';
import {IIMEIService} from 'core_app/services/IIMEIService';
import {Body, Left, List, ListItem} from 'native-base';
import {StyleSheet} from 'react-native';
import {Text} from 'src/shared_controls/Text';
import IMEIChartList from 'src/portrait/screen_part/IMEIChartList';
interface State extends BaseState {}
export default class IMEIInfoScreen extends BaseScreen<BasePops, State> {
  // static navigationOptions = ({navigation}) => {
  //   return {
  //     title: navigation.getParam('otherParam', 'A Nested Details Screen'),
  //   };
  // };
  public IMEIService: IIMEIService = FactoryInjection.get<IIMEIService>(
    PUBLIC_TYPES.IIMEIService,
  );
  private readonly imeiInfo!: IMEIInfo;
  constructor(p: BasePops) {
    super(p);
    this.state = {};
    const param: any | null | undefined = this.getParam();
    if (!param) {
      this.goBack();
    }
    this.imeiInfo = param as IMEIInfo;
    this.setHeader(this.imeiInfo.imei);
  }

  async componentDidMount(): Promise<void> {}

  render() {
    const note: string = this.imeiInfo.note;
    const hasNote: boolean = note === CONSTANTS.STR_EMPTY;
    return (
      <BaseScreen>
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
        <IMEIChartList key={this.imeiInfo.imei} imeiInfo={this.imeiInfo} />
      </BaseScreen>
    );
  }
}

const styles = StyleSheet.create({
  leftColumn: {
    flex: 0.4,
  },
});
