import * as React from 'react';
import BaseScreen, {BasePops, BaseState} from 'src/BaseScreen';
import {IGlobalState, IMEIInfo} from 'core_app/services';
import {AppUtil, CONSTANTS, STATE_ACTION} from 'core_app/common';
import {Body, Left, List, ListItem} from 'native-base';
import {ScrollView, StyleSheet} from 'react-native';
import {Text} from 'src/shared_controls/Text';
import IMEIChartList from 'src/portrait/screen_part/IMEIChartList';
import {ROUTE} from 'src/portrait/route';
import {map} from 'src/middlewares/GlobalObservable';
import {RootState} from 'src/redux/rootReducer';
import {FactoryInjection} from 'core_app/infrastructure';
import {PUBLIC_TYPES} from 'core_app/infrastructure/Identifiers';
import IMEIInfoHeader from 'src/portrait/screen_part/IMEIInfoHeader';
import IMEIMainGroupChart from 'src/portrait/screen_part/IMEIMainGroupChart';
import {FloatCircleButton} from 'src/shared_controls/FloatCircleButton';

interface InjectProps {
  info: any | null;
  fields: string[];
}
interface State extends BaseState {}
class IMEIInfoScreen extends BaseScreen<BasePops & InjectProps, State> {
  public static navigationOptions = ({_navigation, _navigationOptions}) => {
    return {
      headerRight: () => <IMEIInfoHeader />,
    };
  };
  private globalState: IGlobalState = FactoryInjection.get<IGlobalState>(
    PUBLIC_TYPES.IGlobalState,
  );
  private readonly imeiInfo!: IMEIInfo;
  constructor(p: BasePops & InjectProps) {
    super(p);
    this.onChartPress = this.onChartPress.bind(this);
    this.state = {};
    const param: any | null | undefined = this.getParam();
    if (!param) {
      this.goBack();
    }
    this.imeiInfo = param as IMEIInfo;
    this.globalState.do(STATE_ACTION.IMEI_SELECTED, this.imeiInfo.imei);
    this.setHeader(this.imeiInfo.xdesc);
  }

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
    const keys: string[] = AppUtil.getProperties(this.props.info);
    return (
      <BaseScreen>
        <ScrollView>
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
          <List>
            {keys.map((key: string): any => {
              const ss: string[] = key.split('_');
              return (
                <ListItem noIndent key={`info${key}`}>
                  <Left style={styles.leftColumn}>
                    <Text>{ss[1]}</Text>
                  </Left>
                  <Body>
                    <Text>{this.props.info[key]}</Text>
                  </Body>
                </ListItem>
              );
            })}
          </List>
          {this.props.fields.length > 0 && <IMEIMainGroupChart />}
          <IMEIChartList
            onPress={this.onChartPress}
            key={`IMEIChartList${this.imeiInfo.imei}`}
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

export default map<InjectProps>(
  IMEIInfoScreen,
  (state: RootState): InjectProps => {
    return {
      info: state.gsdlReducer.imeiSInfo[state.gsdlReducer.imei] || null,
      fields: state.gsdlReducer.fields,
    };
  },
);
