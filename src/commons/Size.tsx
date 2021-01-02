import {Platform, Dimensions} from 'react-native';

const vh = (dim: 'window' | 'screen') => {
  return Dimensions.get(dim).height / 100;
};

const vw = (dim: 'window' | 'screen') => {
  return Dimensions.get(dim).width / 100;
};

export const sizeWidth = (size, dim: 'window' | 'screen' = 'window') => {
  return size * vw(dim);
};

export const sizeHeight = (size, dim: 'window' | 'screen' = 'window') => {
  return size * vh(dim);
};

export const sizeFont = (size, dim: 'window' | 'screen' = 'window') => {
  let width = vw(dim);

  if (Platform.OS === 'android') {
    width = (vw(dim) * 85) / 100;
  }
  return size * width;
};
export const windowHeight = (dim: 'window' | 'screen' = 'window') => {
  let height = Dimensions.get(dim).height;
  return height;
};
export const windowWidth = (dim: 'window' | 'screen' = 'window') => {
  let width = Dimensions.get(dim).width;
  return width;
};
