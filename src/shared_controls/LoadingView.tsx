import * as React from 'react';
import {Spinner} from 'native-base';
import {View} from 'react-native';
import PureComponent from './PureComponent';
import {connect, ConnectedProps} from 'react-redux';
import {styleSheet} from 'src/stylesheet';
import {RootState} from 'src/redux/rootReducer';

interface Props {}

export default class LoadingView extends PureComponent<Props> {
  constructor(p: Props) {
    super(p);
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
        }}>
        <Spinner color="white" size={30} style={styleSheet.spinner} />
      </View>
    );
  }
}
