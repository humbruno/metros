import { AppPressable } from '@/components/app-pressable'
import { AppText } from '@/components/app-text'
import { useIntl } from 'react-intl'
import { View } from 'react-native'

export function FavouritesTab() {
  const t = useIntl()

  return (
    <View style={{ padding: 20 }}>
      <AppText weight="bold" size="2xl">
        {t.formatMessage({ id: 'myMessage' })}
      </AppText>
      <AppPressable>
        <AppText>Pressable</AppText>
      </AppPressable>
    </View>
  )
}
