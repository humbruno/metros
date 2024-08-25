import React from 'react'
import {
  type PressableProps,
  Pressable as RNPressable,
  StyleSheet
} from 'react-native'

type Props = { activeOpacity?: number } & PressableProps

export function AppPressable({ activeOpacity = 0.2, style, ...props }: Props) {
  const isFunctionStyle = typeof style === 'function'

  return (
    <RNPressable
      {...props}
      style={
        isFunctionStyle
          ? style
          : ({ pressed }) => [
              {
                opacity: pressed ? activeOpacity : 1
              },
              StyleSheet.flatten(style)
            ]
      }
    />
  )
}
