import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const COLORS = {
  primary: '#242F9B',
  secondary: '#646FD4',

  success: '#00C851',
  error: '#ff4444',

  grey: '#d4d4d6',
  black: '#171717',
  white: '#FFFFFF',
  background: '#DBDFFD',
  border: '#F5F5F7',
};

export const SIZES = {
  base: 10,
  width,
  height,
};
