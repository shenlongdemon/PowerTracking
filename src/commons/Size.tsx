import {Platform, Dimensions, PixelRatio} from 'react-native';
const realDimensions = (dim: 'window' | 'screen') => {
  const height: number = Dimensions.get(dim).height;
  const width: number = Dimensions.get(dim).width;
  return {
    height: Math.max(width, height),
    width: Math.min(width, height),
  };
};

const vh = (dim: 'window' | 'screen') => {
  return realDimensions(dim).height / 100;
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
  // let width = vw(dim);
  //
  // if (Platform.OS === 'android') {
  //   width = (vw(dim) * 85) / 100;
  // }
  // return size * width;
  const dimension = realDimensions(dim);
  const scale = dimension.width / 320;
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};
export const windowHeight = (dim: 'window' | 'screen' = 'window') => {
  let height = realDimensions(dim).height;
  return height;
};
export const windowWidth = (dim: 'window' | 'screen' = 'window') => {
  let width = realDimensions(dim).width;
  return width;
};
