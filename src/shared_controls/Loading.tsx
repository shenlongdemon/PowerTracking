import * as React from 'react';
import {Spinner} from 'native-base';
import {View} from 'react-native';
import PureComponent from './PureComponent';
import {connect, ConnectedProps} from 'react-redux';
import {styleSheet} from 'src/stylesheet';
import {RootState} from 'src/redux/rootReducer';

interface Props extends ConnectedProps<typeof connector> {}

class Loading extends PureComponent<Props> {
  constructor(p: Props) {
    super(p);
  }
  render() {
    if (this.props.isLoading) {
      return (
        <View
          style={{
            height: '100%',
            width: '100%',
            position: 'absolute',
            zIndex: 99999,
            justifyContent: 'center',
            flexDirection: 'row',
          }}
        >
          <Spinner color="white" size={30} style={styleSheet.spinner} />
        </View>
      );
    }
    return null;
  }
}

const mapState = (state: RootState) => ({
  isLoading: state.ui.isLoading,
});

const connector = connect(mapState);

export default connector(Loading);
