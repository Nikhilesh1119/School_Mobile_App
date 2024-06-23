import {Platform} from 'react-native';
import Metrics from './metrics';
import Colors from './colors';

const Size = {
  font_8: Metrics.screenWidth * (8 / 375),
  font_9: Metrics.screenWidth * (9 / 375),
  font_10: Metrics.screenWidth * (10 / 375),
  font_11: Metrics.screenWidth * (11 / 375),
  font_12: Metrics.screenWidth * (12 / 375),
  font_13: Metrics.screenWidth * (13 / 375),
  font_14: Metrics.screenWidth * (14 / 375),
  font_15: Metrics.screenWidth * (15 / 375),
  font_16: Metrics.screenWidth * (16 / 375),
  font_17: Metrics.screenWidth * (17 / 375),
  font_18: Metrics.screenWidth * (18 / 375),
  font_19: Metrics.screenWidth * (19 / 375),
  font_20: Metrics.screenWidth * (20 / 375),
  font_21: Metrics.screenWidth * (21 / 375),
  font_22: Metrics.screenWidth * (22 / 375),
  font_23: Metrics.screenWidth * (23 / 375),
  font_24: Metrics.screenWidth * (24 / 375),
  font_25: Metrics.screenWidth * (25 / 375),
  font_26: Metrics.screenWidth * (26 / 375),
  font_27: Metrics.screenWidth * (27 / 375),
  font_28: Metrics.screenWidth * (28 / 375),
  font_29: Metrics.screenWidth * (29 / 375),
  font_30: Metrics.screenWidth * (30 / 375),
};

const Fonts = {
  REGULAR: 'Satoshi-Regular',
  BOLD: 'Satoshi-Bold',
  LIGHT: 'Satoshi-Light',
  ITALIC: 'Satoshi-Italic',
  MEDIUM: 'Satoshi-Medium',

  BOLD_ITALIC: 'Satoshi-BoldItalic',
  MEDIUM_ITALIC: 'Satoshi-MediumItalic',
};

const Weight = {
  full: '900',
  semi: Platform.OS === 'ios' ? '600' : '700',
  low: '400',
  bold: 'bold',
  normal: 'normal',
};

export {Size, Weight, Colors, Fonts};
