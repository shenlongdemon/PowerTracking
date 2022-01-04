import * as React from 'react';
import BaseScreen, {BasePops, BaseState} from 'src/BaseScreen';
import {IGlobalState, IMEIInfo} from 'core_app/services';
import {AppUtil, CONSTANTS, Logger, STATE_ACTION} from 'core_app/common';
import {Body, Left, List, ListItem} from 'native-base';
import {
    LayoutChangeEvent,
    NativeScrollEvent,
    NativeSyntheticEvent,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import {Text} from 'src/shared_controls/Text';
import IMEIPropertySelectionListForChart from 'src/portrait/screen_part/IMEIPropertySelectionListForChart';
import {map} from 'src/middlewares/GlobalObservable';
import {RootState} from 'src/redux/rootReducer';
import {FactoryInjection} from 'core_app/infrastructure';
import {PUBLIC_TYPES} from 'core_app/infrastructure/Identifiers';
import IMEIInfoHeader from 'src/portrait/screen_part/IMEIInfoHeader';
import IMEIMainGroupChart from 'src/portrait/screen_part/IMEIMainGroupChart';
import {color} from 'src/stylesheet';
import {IIMEIService} from "core_app/services/IIMEIService";

interface InjectProps {
    info: any | IMEIInfo | null;
    imeiSInfoProperties: string[];
    fields: string[];
}

interface State extends BaseState {
    isChartFloat: boolean;
}

class IMEIDetailScreen extends BaseScreen<BasePops & InjectProps, State> {
    public static navigationOptions = ({_navigation, _navigationOptions}) => {
        return {
            headerRight: () => <IMEIInfoHeader/>,
            headerTitleStyle: {
                color: color.buttonText,
                flex: 1,
            },
        };
    };
    private IMEIService: IIMEIService = FactoryInjection.get<IIMEIService>(
        PUBLIC_TYPES.IIMEIService,
    );
    private globalState: IGlobalState = FactoryInjection.get<IGlobalState>(
        PUBLIC_TYPES.IGlobalState,
    );
    private imeiMainGroupChart: any | undefined | null;
    private readonly imeiInfo!: IMEIInfo;
    private chartHeight: number = 0;
    private chartY: number = 0;
    private viewY: number = 0;
    private keepAliveTimer: any | null = null;

    constructor(p: BasePops & InjectProps) {
        super(p);
        this.onChartPress = this.onChartPress.bind(this);
        this.onScroll = this.onScroll.bind(this);
        this.setIMEIMainGroupChartRef = this.setIMEIMainGroupChartRef.bind(this);
        this.onIMEIMainGroupChartLayout = this.onIMEIMainGroupChartLayout.bind(
            this,
        );
        this.onViewLayout = this.onViewLayout.bind(this);
        this.state = {
            isChartFloat: false,
        };
        const param: any | null | undefined = this.getParam();
        if (!param) {
            this.goBack();
        }
        this.imeiInfo = param as IMEIInfo;
        this.globalState.do(STATE_ACTION.IMEI_SELECTED, this.imeiInfo.imei);
        this.setHeader(this.imeiInfo.xdesc);
    }

    private onChartPress(group: string): void {
        // const data: {name: string; imei: string} = {
        //   name: group,
        //   imei: this.imeiInfo.imei,
        // };
        // this.navigate(ROUTE.APP.GROUP_CHART_INFO, data);
    }

    async componentWillUnmount(): Promise<void> {
        // stop keeping alive for this IMEI
        if (!!this.keepAliveTimer) {
            clearInterval(this.keepAliveTimer);
        }
    }

    async componentDidMount() {
        await this.keepAlive();
    }

    private async keepAlive(): Promise<void> {
        // start keeping alive for this IMEI
        await this.IMEIService.keepAlive(this.imeiInfo.imei);
        this.keepAliveTimer = setInterval(async (): Promise<void> => {
            await this.IMEIService.keepAlive(this.imeiInfo.imei);
        }, 30000);
    }

    async componentFocus(): Promise<void> {
    }

    private getChartHeight(): number {
        return !!this.imeiMainGroupChart ? this.chartHeight : 0;
    }

    private readonly onScroll = (
        event: NativeSyntheticEvent<NativeScrollEvent>,
    ): void => {
        const ch: number = this.getChartHeight();
        if (ch > 0) {
            const y: number = event.nativeEvent.contentOffset.y;
            Logger.log(
                `y  =  ${y}      viewY = ${this.viewY}   chartY = ${this.chartY}`,
            );
            if (this.state.isChartFloat) {
                if (this.viewY > y + 50) {
                    this.setState({isChartFloat: false});
                }
            } else {
                if (y > this.chartY && this.chartY != 0) {
                    this.setState({isChartFloat: true});
                }
            }
        }
    };

    private readonly setIMEIMainGroupChartRef = (e: View): void => {
        this.imeiMainGroupChart = e;
        // this.setState({isChartFloat: false});
    };

    private readonly onIMEIMainGroupChartLayout = (
        event: LayoutChangeEvent,
    ): void => {
        this.chartHeight = event.nativeEvent.layout.height;
        this.chartY = event.nativeEvent.layout.y;
    };
    private readonly onViewLayout = (event: LayoutChangeEvent): void => {
        this.viewY = event.nativeEvent.layout.y;
    };

    private renderChart(): any {
        return (
            <IMEIMainGroupChart
                onLayout={this.onIMEIMainGroupChartLayout}
                style={{
                    backgroundColor: 'white',
                    position: this.state.isChartFloat ? 'absolute' : undefined,
                    left: this.state.isChartFloat ? 0 : undefined,
                    top: this.state.isChartFloat ? 0 : undefined,
                    zIndex: this.state.isChartFloat ? 10000 : undefined,
                    width: this.state.isChartFloat ? '100%' : undefined,
                    height: this.state.isChartFloat ? this.getChartHeight() : undefined,
                }}
                ref={this.setIMEIMainGroupChartRef}
            />
        );
    }

    private renderInfo(): any {
        const note: string = this.imeiInfo.note;
        const hasNote: boolean = note === CONSTANTS.STR_EMPTY;
        return (<List>
            <ListItem noIndent key={`info_imei_no`}>
                <Left style={styles.leftColumn}>
                    <Text>IMEI No.</Text>
                </Left>
                <Body>
                    <Text>{this.imeiInfo.imei}</Text>
                </Body>
            </ListItem>
            <ListItem noIndent key={`info_address`}>
                <Left style={styles.leftColumn}>
                    <Text>Địa chỉ</Text>
                </Left>
                <Body>
                    <Text>{this.imeiInfo.addr}</Text>
                </Body>
            </ListItem>
            {hasNote && (
                <ListItem noIndent key={`info_note`}>
                    <Body>
                        <Text>{note}</Text>
                    </Body>
                </ListItem>
            )}
            {this.props.imeiSInfoProperties.map((key: string): any => {
                const ss: string[] = key.split('_');
                return (
                    <ListItem noIndent key={`info${key}`}>
                        <Left style={styles.leftColumn}>
                            <Text>{ss[1]}</Text>
                        </Left>
                        <Body>
                            <Text numberOfLines={1} style={{flex: 1}}>
                                {!this.props.info
                                    ? CONSTANTS.STR_EMPTY
                                    : this.props.info[key]}
                            </Text>
                        </Body>
                    </ListItem>
                );
            })}
        </List>);
    }

    private renderPropertyList(): any {
        return (
            <IMEIPropertySelectionListForChart
                onPress={this.onChartPress}
                key={`IMEIChartList${this.imeiInfo.imei}`}
                imeiInfo={this.imeiInfo}
            />
        );
    }

    render() {
        return (
            <BaseScreen>
                <ScrollView onScroll={this.onScroll} scrollEnabled={true}>

                    {this.renderInfo()}

                    {!this.state.isChartFloat ? (
                        this.renderChart()
                    ) : (
                        <View
                            onLayout={this.onViewLayout}
                            style={{width: '100%', height: this.chartHeight}}
                        />
                    )}

                    {this.renderPropertyList()}

                </ScrollView>
                {this.state.isChartFloat && this.renderChart()}
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
    IMEIDetailScreen,
    (state: RootState): InjectProps => {
        return {
            info: state.gsdlReducer.imeiSInfo[state.actionGSDL.imei] || null,
            imeiSInfoProperties: state.gsdlReducer.imeiSInfoProperties,
            fields: state.actionGSDL.fields,
        };
    },
);
