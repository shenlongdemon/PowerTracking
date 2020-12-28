import {StyleSheet} from 'react-native';

const color = {
  button: '#30ab9a',
};
const styleSheet = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    borderRadius: 5,
  },
  logo: {
    flex: 1,
    resizeMode: 'contain',
    // position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    borderRadius: 5,
  },
  spinner: {
    backgroundColor: color.button,
    justifyContent: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    borderRadius: 50,
    height: 50,
    width: 50,
  },
});

export {styleSheet};
