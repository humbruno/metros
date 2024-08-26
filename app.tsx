import { initApi } from '@/lib/api'
import { getAllDestinations } from '@/lib/api/endpoints'
import { useInterceptors } from '@/lib/hooks'
import { useAppStore } from '@/lib/stores/app-store'
import { Router } from '@/routes/router'
import { FONTS_TO_LOAD } from '@/utils/constants'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useCallback, useEffect, useState } from 'react'
import { IntlProvider } from 'react-intl'
import { ActivityIndicator, View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'

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
  const [apiInitialized, setApiInitialized] = useState(false)

  useInterceptors()
  const allDestinations = useAppStore((s) => s.destinations)
  const setDestinations = useAppStore((s) => s.setDestinations)
  const [loaded, error] = useFonts(FONTS_TO_LOAD)

  const isInitialLoad = !apiInitialized && !loaded && !error && !allDestinations

  const loadDestinations = useCallback(async () => {
    try {
      const res = await getAllDestinations()
      setDestinations(res.data.resposta)
    } catch (e) {
      console.error(e)
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Something went wrong',
        text2: 'Failed to load destinations'
      })
    }
  }, [setDestinations])

  useEffect(() => {
    initApi().then(() => setApiInitialized(true))
  }, [])

  useEffect(() => {
    if (!allDestinations && apiInitialized) {
      loadDestinations()
    }
  }, [allDestinations, loadDestinations, apiInitialized])

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync()
    }
  }, [loaded, error, allDestinations])

  if (isInitialLoad) {
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
        <Toast />
      </IntlProvider>
    </SafeAreaProvider>
  )
}
