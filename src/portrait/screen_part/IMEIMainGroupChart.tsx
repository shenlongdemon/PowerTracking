import BaseScrPart, {BaseScrPartProps} from 'src/BaseScrPart';
import * as React from 'react';
import {Switch, View} from 'react-native';
import {FieldData, IGlobalState} from 'core_app/services';
import {RootState} from 'src/redux/rootReducer';
import {AppUtil, CONSTANTS, STATE_ACTION} from 'core_app/common';
import {Text} from 'src/shared_controls/Text';
import {Body, Left, ListItem} from 'native-base';
import {map} from 'src/middlewares/GlobalObservable';
import {IMEIData} from 'src/redux/models/IMEIData';
import {GroupIMEIData} from 'src/redux/models/GroupIMEIData';
import {color} from 'src/stylesheet';
import {FactoryInjection} from 'core_app/infrastructure';
import {PUBLIC_TYPES} from 'core_app/infrastructure/Identifiers';

interface InjectProps {
  list: FieldData[];
  fields: string[];
}
interface Props extends InjectProps, BaseScrPartProps {
  group: string; // group name
  imei: string; // group name
  onPress: () => void;
}

interface State {}

class IMEIMainGroupChart extends BaseScrPart<Props, State> {
  private globalState: IGlobalState = FactoryInjection.get<IGlobalState>(
    PUBLIC_TYPES.IGlobalState,
  );
  constructor(p: Props) {
    super(p);
    this.state = {};
  }

  render() {
    return <BaseScrPart key={this.props.group}></BaseScrPart>;
  }
}

export default map<InjectProps>(
  IMEIMainGroupChart,
  (state: RootState, props: Props): InjectProps => {
    let list: FieldData[] = [];
    const mainGroup: string = state.gsdlReducer.mainGroup;
    const imeiDatas: IMEIData[] =
      state.gsdlReducer.list.filter((id: IMEIData): boolean => {
        return (
          id.imei === props.imei &&
          (mainGroup === CONSTANTS.STR_EMPTY || id.mainGroup === mainGroup)
        );
      }) || null;
    if (imeiDatas.length > 0) {
      const groupIMEIData: GroupIMEIData | null =
        imeiDatas[0].groups.find((gid: GroupIMEIData): boolean => {
          return gid.group === props.group;
        }) || null;
      if (!!groupIMEIData) {
        list = groupIMEIData.fields;
      }
    }

    return {list, fields: state.gsdlReducer.fields};
  },
);
