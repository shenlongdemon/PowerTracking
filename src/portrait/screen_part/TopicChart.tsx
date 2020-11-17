import BaseScrPart from 'src/BaseScrPart';
import * as React from 'react';
import {Text, View} from 'react-native';
import {TopicData, TopicUnitData} from 'core_app/services';
import {CONSTANTS} from 'core_app/common';
interface Props {
  topic: string;
}
interface State {
  data: TopicData[];
}
export default class TopicChart extends BaseScrPart<Props, State> {
  constructor(p: Props) {
    super(p);
  }
  private renderData(): any {
    return this.state.data.map((d: TopicData): any => {
      const data: TopicUnitData | null = d.list.length > 0 ? d.list[0] : null;
      return (
        <>
          <Text>{d.owner}</Text>s
          <Text>{!!data ? data.data : CONSTANTS.STR_EMPTY}</Text>
          <Text>{!!data ? data.time : CONSTANTS.STR_EMPTY}</Text>
        </>
      );
    });
  }
  render() {
    return (
      <View>
        <Text>{this.props.topic}</Text>
        {this.renderData()}
      </View>
    );
  }
}
