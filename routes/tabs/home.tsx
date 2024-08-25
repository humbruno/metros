import { AppText } from '@/components/app-text'
import { useIntl } from 'react-intl'
import { View } from 'react-native'

export function HomeTab() {
  const t = useIntl()

  return (
    <View>
      <AppText weight="bold" size="2xl">
        {t.formatMessage({ id: 'myMessage' })}
      </AppText>
    </View>
  )
}
