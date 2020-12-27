/*import * as React from 'react';
import {Button, View} from 'react-native';
import BaseScreen, {BasePops, BaseState} from 'src/BaseScreen';
import Input from 'src/shared_controls/Input';
import {BaseDto, FieldData, IMQTTService, MqttData} from 'core_app/services';
import {FactoryInjection} from 'core_app/infrastructure';
import {Text} from 'src/shared_controls/Text';
import {CONSTANTS, Logger, MAIN_GROUP} from 'core_app/common';
import Formik from 'src/portrait/form-validate/forms/Formik';
import SearchIMEIInfoValidate from 'src/portrait/form-validate/validate/SearchIMEIInfoValidate';
import {SearchIMEIInfo} from 'src/models/SearchIMEIInfo';
import {PUBLIC_TYPES} from 'core_app/infrastructure/Identifiers';
interface State extends BaseState {
  cauhinh: FieldData[];
  solieu: FieldData[];
}
export default class IMEIInfoScreen extends BaseScreen<BasePops, State> {
  private mqttService: IMQTTService = FactoryInjection.get<IMQTTService>(
    PUBLIC_TYPES.IMQTTService,
  );
  private imeiInfo!: IMEIInfoScreen;
  constructor(p: BasePops) {
    super(p);
    this.state = {
      cauhinh: [],
      solieu: [],
    };
    const param: any | null | undefined = this.getParam();
    if (!param) {
      this.goBack();
    }
    this.imeiInfo = param as IMEIInfoScreen;
  }
  private onData = async (data: MqttData): Promise<void> => {
    if (!data.data) {
      return;
    }
    const f: FieldData = data.data;
    if (data.mainGroup === MAIN_GROUP.CAUHINH) {
      const cauhinh: FieldData[] = this.state.cauhinh.filter(
        (fs: FieldData): boolean => {
          return fs.field !== f.field;
        },
      );
      cauhinh.push(f);
      this.setState({cauhinh: [...cauhinh]});
    } else if (data.mainGroup === MAIN_GROUP.SOLIEU) {
      const solieu: FieldData[] = this.state.solieu.filter(
        (fs: FieldData): boolean => {
          return fs.field !== f.field;
        },
      );
      solieu.push(f);
      this.setState({solieu: [...solieu]});
    }
  };

  private async search(imei: string): Promise<void> {
    this.setState({cauhinh: [], solieu: []});
    const dto: BaseDto = await this.mqttService.subscribeIMEI(
      imei,
      this.onData,
    );
    if (dto.isSuccess) {
    }
  }

  private getNameOfField(field: string): string {
    let str: string = field;
    if (str.length > 3) {
      str = str.substring(2).replace('_', ' ');
    }
    return str;
  }
  render() {
    return (
      <BaseScreen>
        <View style={{alignSelf: 'center'}}>
          <Formik
            layout={[[1, 1]]}
            submitTittle={'View'}
            style={{width: 300}}
            schema={SearchIMEIInfoValidate}
            submit={async (values: SearchIMEIInfo): Promise<void> => {
              await this.search(values.imei);
            }}
          />
        </View>
        {this.state.cauhinh.length > 0 && (
          <View>
            <Text>CẤU HÌNH</Text>
            {this.state.cauhinh
              .sort((f1: FieldData, f2: FieldData): number => {
                return f1.field > f2.field ? 1 : -1;
              })
              .map((f: FieldData): any => {
                return (
                  <Text key={f.field}>{`${this.getNameOfField(f.field)} : ${
                    f.data
                  }`}</Text>
                );
              })}
          </View>
        )}
        <Text style={{alignSelf: 'center'}}>=====================</Text>
        {this.state.solieu.length > 0 && (
          <View>
            <Text>SỐ LIỆU</Text>
            {this.state.solieu
              .sort((f1: FieldData, f2: FieldData): number => {
                return f1.field > f2.field ? 1 : -1;
              })
              .map((f: FieldData): any => {
                return (
                  <Text key={f.field}>{`${this.getNameOfField(f.field)} : ${
                    f.data
                  }`}</Text>
                );
              })}
          </View>
        )}
      </BaseScreen>
    );
  }
}
*/
