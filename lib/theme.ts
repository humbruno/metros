const fonts = {
  onest: {
    black: 'Onest-Black',
    bold: 'Onest-Bold',
    extraBold: 'Onest-ExtraBold',
    extraLight: 'Onest-ExtraLight',
    light: 'Onest-Light',
    medium: 'Onest-Medium',
    regular: 'Onest-Regular',
    semiBold: 'Onest-SemiBold',
    thin: 'Onest-Thin'
  }
} as const

const palette = {
  neutral100: '#FFFFFF',
  neutral200: '#F4F2F1',
  neutral300: '#D7CEC9',
  neutral400: '#B6ACA6',
  neutral500: '#978F8A',
  neutral600: '#564E4A',
  neutral700: '#3C3836',
  neutral800: '#191015',
  neutral900: '#000000',

  secondary100: '#DCDDE9',
  secondary200: '#BCC0D6',
  secondary300: '#9196B9',
  secondary400: '#626894',
  secondary500: '#41476E',

  accent100: '#FFEED4',
  accent200: '#FFE1B2',
  accent300: '#FDD495',
  accent400: '#FBC878',
  accent500: '#FFBB50',

  angry100: '#F2D6CD',
  angry500: '#C03403',

  red: '#FCD2DF',
  red200: '#A52160',

  blue: '#DCDFF0',
  blue200: '#4E61B6',

  yellow: '#FEF0D0',
  yellow200: '#EBA90D',

  green: '#D8F3DC',
  green200: '#606c38',

  overlay20: 'rgba(25, 16, 21, 0.2)',
  overlay50: 'rgba(25, 16, 21, 0.5)'
} as const

export const colors = {
  palette,
  transparent: 'rgba(0, 0, 0, 0)',

  redLine: palette.red,
  redLineAccent: palette.red200,

  blueLine: palette.blue,
  blueLineAccent: palette.blue200,

  yellowLine: palette.yellow,
  yellowLineAccent: palette.yellow200,

  greenLine: palette.green,
  greenLineAccent: palette.green200,

  primary: '#2F2762',
  inactive: '#B3B3B3',

  text: palette.neutral800,
  textDim: palette.neutral600,
  background: palette.neutral200,
  border: palette.neutral400,
  separator: palette.neutral300,
  error: palette.angry500,
  errorBackground: palette.angry100
}

export const typography = {
  fonts,
  primary: fonts.onest
}

export const spacing = {
  xxxs: 2,
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64
} as const
