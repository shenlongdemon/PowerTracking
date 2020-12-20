import * as React from 'react';
import BaseScreen, {BasePops, BaseState} from 'src/BaseScreen';
interface State extends BaseState {}
export default class Main extends BaseScreen<BasePops, State> {
  constructor(p: BasePops) {
    super(p);
  }
  render() {
    return <BaseScreen></BaseScreen>;
  }
}
