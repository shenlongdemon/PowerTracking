import * as React from 'react';
import BaseScreen, {BasePops, BaseState} from 'src/BaseScreen';
import {IMEIInfo, IMEIListDto} from 'core_app/services';
import {FactoryInjection} from 'core_app/infrastructure';
import {PUBLIC_TYPES} from 'core_app/infrastructure/Identifiers';
import {IIMEIService} from 'core_app/services/IIMEIService';
import {Text} from 'src/shared_controls/Text';
import {FlatList} from 'react-native';
import TouchView from 'src/shared_controls/TouchView';
import {ROUTE} from 'src/portrait/route';

interface State extends BaseState {
  list: IMEIInfo[];
}

export default class Main extends BaseScreen<BasePops, State> {
  public IMEIService: IIMEIService = FactoryInjection.get<IIMEIService>(
    PUBLIC_TYPES.IIMEIService,
  );

  constructor(p: BasePops) {
    super(p);
    this.state = {list: []};
  }

  async componentDidMount(): Promise<void> {
    await this.setLoading(true);

    const dto: IMEIListDto = await this.IMEIService.getIMEIs();
    if (dto.isSuccess) {
      this.setState({list: dto.list || []});
    }
    await this.setLoading(false);
  }

  private async onIMEISelected(item: IMEIInfo): Promise<void> {
    this.navigate(ROUTE.APP.IMEI_INFO, item);
  }

  private renderItem = (data: {item: IMEIInfo; index: number}): any => {
    return (
      <TouchView
        key={data.item.imei}
        style={{padding: 20, marginVertical: 8, marginHorizontal: 16}}
        onPress={(): void => {
          this.onIMEISelected(data.item);
        }}>
        <Text>{data.item.imei}</Text>
      </TouchView>
    );
  };

  render() {
    return (
      <BaseScreen>
        <FlatList
          data={this.state.list}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.imei}
        />
      </BaseScreen>
    );
  }
}
