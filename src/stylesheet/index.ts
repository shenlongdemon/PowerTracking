import {StyleSheet} from 'react-native';
import {sizeFont} from 'src/commons/Size';

const color = {
  disabledButton: '#4c6864',
  darkButton: '#18504a',
  button: '#30ab9a',
  buttonText: '#ffffff',

  buttonDanger: '#ce3d3e',

  lightButton: 'rgba(226,245,244,0.3)',
  lightButtonText: '#30ab9a',
  textColor: '#000',
};
const font = {
  size: sizeFont(6),
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
  logo_splash: {
    flex: 1,
    resizeMode: 'contain',
    // position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    borderRadius: 5,
  },
  logo: {
    resizeMode: 'contain',
    alignItems: 'center',
    // position: 'absolute',
    width: '50%',
    height: '50%',
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

export {styleSheet, color, font};
