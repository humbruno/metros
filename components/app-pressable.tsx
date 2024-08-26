import { colors, spacing } from '@/lib/theme'
import React from 'react'
import {
  ActivityIndicator,
  Pressable as RNPressable,
  type PressableProps,
  type PressableStateCallbackType,
  type StyleProp,
  type ViewStyle
} from 'react-native'

type Variants = keyof typeof $viewPresets

type Props = {
  activeOpacity?: number
  loading?: boolean
  variant?: Variants
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  /**
   * An optional style override for the "pressed" state.
   */
  pressedStyle?: StyleProp<ViewStyle>
  /**
   * An optional style override for the disabled state
   */
  disabledStyle?: StyleProp<ViewStyle>
} & PressableProps

export function AppPressable({
  activeOpacity = 0.2,
  style: $viewStyleOverride,
  pressedStyle: $pressedViewStyleOverride,
  disabledStyle: $disabledViewStyleOverride,
  disabled,
  loading,
  children,
  ...props
}: Props) {
  const preset: Variants = props.variant ?? 'ghost'

  function $viewStyle({
    pressed
  }: PressableStateCallbackType): StyleProp<ViewStyle> {
    return [
      $viewPresets[preset],
      $viewStyleOverride,
      !!pressed && [$pressedViewPresets[preset], $pressedViewStyleOverride],
      !!disabled && $disabledViewStyleOverride
    ]
  }

  return (
    <RNPressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      style={$viewStyle}
      {...props}
    >
      {loading && <ActivityIndicator size="small" />}
      <>{children}</>
    </RNPressable>
  )
}

const $baseViewStyle: ViewStyle = {
  minHeight: 56,
  borderRadius: 4,
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
  gap: spacing.xs,
  paddingVertical: spacing.sm,
  paddingHorizontal: spacing.sm,
  overflow: 'hidden'
}

const $viewPresets = {
  outline: [
    $baseViewStyle,
    {
      borderWidth: 1,
      borderColor: colors.palette.neutral400,
      backgroundColor: colors.palette.neutral100
    }
  ] as StyleProp<ViewStyle>,

  ghost: [
    $baseViewStyle,
    {
      backgroundColor: colors.transparent
    }
  ],

  filled: [
    $baseViewStyle,
    { backgroundColor: colors.palette.neutral300 }
  ] as StyleProp<ViewStyle>
}

const $pressedViewPresets: Record<Variants, StyleProp<ViewStyle>> = {
  outline: { backgroundColor: colors.palette.neutral200 },
  filled: { backgroundColor: colors.palette.neutral400 },
  ghost: { opacity: 0.6 }
}
