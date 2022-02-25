import BaseScrPart, {BaseScrPartProps} from 'src/BaseScrPart';
import * as React from 'react';
import {ScrollView, View} from 'react-native';
import {FieldData, IGlobalState} from 'core_app/services';
import {RootState} from 'src/redux/rootReducer';
import {AppUtil, DateUtils} from 'core_app/common';
import {Text} from 'src/shared_controls/Text';
import {map} from 'src/middlewares/GlobalObservable';
import {IMEIData} from 'src/redux/models/IMEIData';
import {GroupIMEIData} from 'src/redux/models/GroupIMEIData';
import {FactoryInjection} from 'core_app/infrastructure';
import {PUBLIC_TYPES} from 'core_app/infrastructure/Identifiers';
import {YAxis, XAxis, Grid, LineChart} from 'react-native-svg-charts';

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
  private renderData(): any {
    if (this.props.list.length > 0) {
      let colors: any[] = [
        '#2e29b1',
        '#29b140',
        '#b12929',
        '#297ab1',
        '#8129b1',
        '#b16829',
        '#29b1b1',
      ];

      let colorIndex: number = 0;
      const dg: any = AppUtil.groupBy(this.props.list, 'field');
      const keys: string[] = Object.keys(dg).sort(
        (k1: string, k2: string): number => {
          return k1 > k2 ? 1 : -1;
        },
      );
      const dd: any[] = keys.map((key: string, index: number): any => {
        const list: FieldData[] = dg[key];
        if (index < colors.length) {
          colorIndex = index;
        } else {
          colorIndex = index % colors.length;
        }
        return {
          data: list
            .sort((a: FieldData, b: FieldData): number => {
              return a.time - b.time;
            })
            .map((f: FieldData, index: number): any => {
              // return {x: `${f.time}`, y: f.data <= 0 ? 0 : f.data};
              return Number(f.data);
            }),
          time: list
            .sort((a: FieldData, b: FieldData): number => {
              return a.time - b.time;
            })
            .map((f: FieldData, index: number): any => {
              // return {x: `${f.time}`, y: f.data <= 0 ? 0 : f.data};
              return new Date(f.time);
            }),
          svg: {stroke: colors[colorIndex]},
          field: `${key.split('_')[1]} ${key.split('_')[3]}`,
          color: colors[colorIndex],
        };
      });
      if (dd.length > 0) {
        const yAxis: number[] = [].concat(
          ...dd.map((d: any): any => {
            return d.data;
          }),
        );
        const xAxis: Date[] = [].concat(
          ...dd.map((d: any): any => {
            return d.time;
          }),
        );
        const values: number[] = yAxis.sort((a, b) => b - a);
        const max: number = values[0] + Math.abs(values[0]) / 10;
        const min: number =
          values[values.length - 1] - Math.abs(values[values.length - 1]) / 11;

        return (
          <View
            style={{
              height: 390,
              paddingRight: 10,
              borderTopWidth: 2,
              borderColor: 'grey',
              marginBottom: 20,
              marginTop: 10,
            }}
          >
            <View
              style={{
                height: 30,
                flexDirection: 'row',
                // backgroundColor: 'red',
              }}
            >
              <ScrollView horizontal={true}>
                {dd.map((d: any): any => {
                  return (
                    <Text
                      key={`chart_text_description_${d.field}`}
                      style={{
                        color: 'white',
                        alignContent: 'center',
                        textAlign: 'center',
                        alignSelf: 'center',
                        backgroundColor: d.color,
                        // flex: 1 / dd.length + 1,
                        paddingLeft: 5,
                        paddingRight: 5,
                        marginLeft: 5,
                        height: 30,
                      }}
                    >
                      {d.field}
                    </Text>
                  );
                })}
              </ScrollView>
            </View>
            <View
              style={{
                height: 260,
                flexDirection: 'row',
                // backgroundColor: 'yellow',
              }}
            >
              <YAxis
                style={{width: 30}}
                data={yAxis}
                svg={{
                  fill: 'grey',
                  fontSize: 10,
                }}
                min={min}
                max={max}
                formatLabel={(value) => `${value}`}
              />
              <LineChart
                yMin={min}
                yMax={max}
                style={{flex: 1}}
                data={dd}
                // contentInset={{right: 10}}
              >
                <Grid />
              </LineChart>
            </View>
            <XAxis
              // contentInset={{right: 10}}
              contentInset={{left: 10, right: 35}}
              style={{
                flex: 1,
                // paddingVertical: 16,
                // paddingTop: 10,
                // paddingLeft: 10,
                // backgroundColor: 'green',
                // marginRight: 10,
              }}
              data={xAxis}
              formatLabel={(value, index): string => {
                if (
                  xAxis.length <= 4 ||
                  index === 0 ||
                  index === xAxis.length - 1
                ) {
                  return DateUtils.format(xAxis[index], 'HH:mm:ss');
                } else if (index % Math.round(xAxis.length / 5) === 0) {
                  return DateUtils.format(xAxis[index], 'HH:mm:ss');
                }
                return ``;
              }}
              svg={{
                fill: 'black',
                fontSize: 14,
                rotation: 90,
                originY: 50,
                y: 20,
              }}
            />
          </View>
        );
      }
    }
    return <View />;
  }
  render() {
    return (
      <BaseScrPart {...this.props} key={this.props.group}>
        {this.renderData()}
      </BaseScrPart>
    );
  }
}

export default map<InjectProps>(
  IMEIMainGroupChart,
  (state: RootState): InjectProps => {
    let list: FieldData[] = [];
    const imeiData: IMEIData | undefined = state.gsdlReducer.list.find(
      (id: IMEIData): boolean => {
        return (
          id.imei === state.actionGSDL.imei &&
          id.mainGroup === state.actionGSDL.mainGroup
        );
      },
    );
    if (!!imeiData) {
      list = AppUtil.flatArray(
        imeiData.groups.map((g: GroupIMEIData): FieldData[] => {
          return g.fields.filter((f: FieldData): boolean => {
            return state.actionGSDL.fields.indexOf(f.field) > -1;
          });
        }),
      );
    }

    return {list, fields: state.actionGSDL.fields};
  },
);
