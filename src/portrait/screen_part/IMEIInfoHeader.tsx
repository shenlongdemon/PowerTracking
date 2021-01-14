import BaseScrPart, {BaseScrPartProps} from 'src/BaseScrPart';
import {map} from 'src/middlewares/GlobalObservable';
import {RootState} from 'src/redux/rootReducer';
import {IMEIData} from 'src/redux/models/IMEIData';
import {color} from 'src/stylesheet';
import DropDownList from 'src/shared_controls/DropDownList';
import * as React from 'react';
import {STATE_ACTION} from 'core_app/common';
import {IGlobalState} from 'core_app/services';
import {FactoryInjection} from 'core_app/infrastructure';
import {PUBLIC_TYPES} from 'core_app/infrastructure/Identifiers';

interface InjectProps {
  mainGroups: string[];
}
interface Props extends BaseScrPartProps, InjectProps {}
class IMEIInfoHeader extends BaseScrPart<Props, any> {
  private globalState: IGlobalState = FactoryInjection.get<IGlobalState>(
    PUBLIC_TYPES.IGlobalState,
  );

  constructor(p: Props) {
    super(p);
    this.onMainGroupSelected = this.onMainGroupSelected.bind(this);
  }

  private readonly onMainGroupSelected = async (
    index: number,
  ): Promise<void> => {
    if (index < this.props.mainGroups.length) {
      this.globalState.do(
        STATE_ACTION.MAIN_GROUP_SELECTED,
        this.props.mainGroups[index],
      );
    }
  };

  render(): any {
    return (
      <DropDownList
        H2
        style={{
          color: color.buttonText,
        }}
        items={this.props.mainGroups}
        title={'Select group'}
        message={'Select group to switch to another group and reload data'}
        onItemSelected={this.onMainGroupSelected}
        defaultItemIndex={0}
      />
    );
  }
}

export default map<InjectProps>(
  IMEIInfoHeader,
  (state: RootState, _props: Props): InjectProps => {
    return {
      mainGroups: state.gsdlReducer.list
        .filter((id: IMEIData): boolean => {
          return id.imei === state.gsdlReducer.imei;
        })
        .map((id: IMEIData): string => {
          return id.mainGroup;
        }),
    };
  },
);
