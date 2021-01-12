import * as React from 'react';
import BaseScreen, {BasePops, BaseState, Navigation} from 'src/BaseScreen';
import {IMEIInfo} from 'core_app/services';
import {CONSTANTS} from 'core_app/common';
import {Body, Left, List, ListItem} from 'native-base';
import {Button, ScrollView, StyleSheet} from 'react-native';
import {Text} from 'src/shared_controls/Text';
import IMEIChartList from 'src/portrait/screen_part/IMEIChartList';
import {ROUTE} from 'src/portrait/route';
import {map} from 'src/middlewares/GlobalObservable';
import {RootState} from 'src/redux/rootReducer';
import {IMEIData} from 'src/redux/models/IMEIData';
interface InjectProps {
  mainGroups: string[];
}
interface State extends BaseState {}
class IMEIInfoScreen extends BaseScreen<BasePops & InjectProps, State> {
  public static navigationOptions = ({navigation, navigationOptions}) => {
    const mainGroups: string[] = navigation.state.params.mainGroups || [];
    return {
      headerRight: () => (
        <Button
          onPress={() => alert(mainGroups.join(','))}
          title={`${mainGroups.length}`}
        />
      ),
    };
  };
  public static IMEI_SELECTED: string = CONSTANTS.STR_EMPTY;
  private readonly imeiInfo!: IMEIInfo;
  constructor(p: BasePops & InjectProps) {
    super(p);
    IMEIInfoScreen.IMEI_SELECTED = CONSTANTS.STR_EMPTY;
    this.onChartPress = this.onChartPress.bind(this);
    this.state = {};
    const param: any | null | undefined = this.getParam();
    if (!param) {
      this.goBack();
    }
    this.imeiInfo = param as IMEIInfo;
    IMEIInfoScreen.IMEI_SELECTED = this.imeiInfo.imei;
    this.setHeader(this.imeiInfo.xdesc);
  }

  async componentDidMount(): Promise<void> {}

  componentDidUpdate(
    prevProps: Readonly<BasePops & InjectProps>,
    prevState: Readonly<State>,
    snapshot?: any,
  ) {
    if (
      prevProps.mainGroups.join(CONSTANTS.STR_EMPTY) !==
      this.props.mainGroups.join(CONSTANTS.STR_EMPTY)
    ) {
      this.setSellNavigateParam({mainGroups: this.props.mainGroups});
    }
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

export default map<InjectProps>(
  IMEIInfoScreen,
  (state: RootState): InjectProps => {
    return {
      mainGroups: state.gsdlReducer.list
        .filter((id: IMEIData): boolean => {
          return (
            IMEIInfoScreen.IMEI_SELECTED !== CONSTANTS.STR_EMPTY &&
            id.imei === IMEIInfoScreen.IMEI_SELECTED
          );
        })
        .map((id: IMEIData): string => {
          return id.mainGroup;
        }),
    };
  },
);
