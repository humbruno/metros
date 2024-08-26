import { initApi } from '@/lib/api'
import { useInterceptors } from '@/lib/hooks'
import { Router } from '@/routes/router'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { IntlProvider } from 'react-intl'
import { ActivityIndicator, View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

SplashScreen.preventAutoHideAsync()

const messages = {
  myMessage: 'Hello home page'
}

declare global {
  namespace FormatjsIntl {
    interface Message {
      ids: keyof typeof messages
    }
    interface IntlConfig {
      locale: 'en' | 'pt'
    }
  }
}

export function App() {
  const [loaded, error] = useFonts({
    'Onest-Black': require('@/assets/fonts/Onest-Black.ttf'),
    'Onest-Bold': require('@/assets/fonts/Onest-Bold.ttf'),
    'Onest-ExtraBold': require('@/assets/fonts/Onest-ExtraBold.ttf'),
    'Onest-ExtraLight': require('@/assets/fonts/Onest-ExtraLight.ttf'),
    'Onest-Light': require('@/assets/fonts/Onest-Light.ttf'),
    'Onest-Medium': require('@/assets/fonts/Onest-Medium.ttf'),
    'Onest-Regular': require('@/assets/fonts/Onest-Regular.ttf'),
    'Onest-SemiBold': require('@/assets/fonts/Onest-SemiBold.ttf'),
    'Onest-Thin': require('@/assets/fonts/Onest-Thin.ttf')
  })

  useInterceptors()

  useEffect(() => {
    initApi()
  }, [])

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync()
    }
  }, [loaded, error])

  if (!loaded && !error) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <SafeAreaProvider>
      <IntlProvider messages={messages} locale="en" defaultLocale="en">
        <StatusBar style="auto" />
        <Router />
      </IntlProvider>
    </SafeAreaProvider>
  )
}
