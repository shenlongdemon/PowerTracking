import * as React from 'react';
import {View} from 'react-native';
import BaseScreen, {BasePops, BaseState} from 'src/BaseScreen';
import {GroupData} from 'core_app/services/model/GroupData';
import GroupChartList from 'src/portrait/screen_part/GroupChartList';
interface State extends BaseState {
  groups: GroupData[];
}
export default class Main extends BaseScreen<BasePops, State> {
  constructor(p: BasePops) {
    super(p);
  }
  render() {
    return (
      <BaseScreen>
        <GroupChartList />
      </BaseScreen>
    );
  }
}
