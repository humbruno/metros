import Ionicons from '@expo/vector-icons/Ionicons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

export const FONTS_TO_LOAD = {
  'Onest-Black': require('@/assets/fonts/Onest-Black.ttf'),
  'Onest-Bold': require('@/assets/fonts/Onest-Bold.ttf'),
  'Onest-ExtraBold': require('@/assets/fonts/Onest-ExtraBold.ttf'),
  'Onest-ExtraLight': require('@/assets/fonts/Onest-ExtraLight.ttf'),
  'Onest-Light': require('@/assets/fonts/Onest-Light.ttf'),
  'Onest-Medium': require('@/assets/fonts/Onest-Medium.ttf'),
  'Onest-Regular': require('@/assets/fonts/Onest-Regular.ttf'),
  'Onest-SemiBold': require('@/assets/fonts/Onest-SemiBold.ttf'),
  'Onest-Thin': require('@/assets/fonts/Onest-Thin.ttf'),
  Ionicons: Ionicons.font,
  MaterialIcons: MaterialIcons.font
}

export enum Lines {
  Yellow = 'Amarela',
  Green = 'Verde',
  Blue = 'Azul',
  Red = 'Vermelha'
}
