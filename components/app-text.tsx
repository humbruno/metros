import { colors, typography } from '@/lib/theme'
import {
  Text as RNText,
  type StyleProp,
  type TextProps,
  type TextStyle
} from 'react-native'

type Sizes = keyof typeof $sizeStyles
type Weights = keyof typeof typography.primary
type Presets = keyof typeof $presets

type AppTextProps = {
  style?: StyleProp<TextStyle>
  preset?: Presets
  weight?: Weights
  size?: Sizes
  children: React.ReactNode
} & TextProps

export function AppText({
  weight,
  size,
  children,
  style: $styleOverride,
  ...props
}: AppTextProps) {
  const preset: Presets = props.preset ?? 'default'

  const $styles: StyleProp<TextStyle> = [
    $presets[preset],
    weight && $fontWeightStyles[weight],
    size && $sizeStyles[size],
    $styleOverride
  ]

  return (
    <RNText {...props} style={$styles}>
      {children}
    </RNText>
  )
}

const $sizeStyles = {
  '2xl': { fontSize: 36, lineHeight: 44 } satisfies TextStyle,
  xl: { fontSize: 24, lineHeight: 34 } satisfies TextStyle,
  lg: { fontSize: 20, lineHeight: 32 } satisfies TextStyle,
  md: { fontSize: 18, lineHeight: 26 } satisfies TextStyle,
  sm: { fontSize: 16, lineHeight: 24 } satisfies TextStyle,
  xs: { fontSize: 14, lineHeight: 21 } satisfies TextStyle,
  '2xs': { fontSize: 12, lineHeight: 18 } satisfies TextStyle
}

const $fontWeightStyles = Object.entries(typography.primary).reduce(
  (acc, [weight, fontFamily]) => {
    return { ...acc, [weight]: { fontFamily } }
  },
  {}
) as Record<Weights, TextStyle>

const $baseStyle: StyleProp<TextStyle> = [
  $sizeStyles.sm,
  $fontWeightStyles.regular,
  { color: colors.text }
]

const $presets = {
  default: $baseStyle,

  bold: [$baseStyle, $fontWeightStyles.bold] as StyleProp<TextStyle>,

  heading: [
    $baseStyle,
    $sizeStyles['2xl'],
    $fontWeightStyles.bold
  ] as StyleProp<TextStyle>,

  subheading: [
    $baseStyle,
    $sizeStyles.lg,
    $fontWeightStyles.semiBold
  ] as StyleProp<TextStyle>,

  formLabel: [$baseStyle, $fontWeightStyles.light] as StyleProp<TextStyle>,

  formHelper: [
    $baseStyle,
    $sizeStyles.sm,
    $fontWeightStyles.medium
  ] as StyleProp<TextStyle>
}
