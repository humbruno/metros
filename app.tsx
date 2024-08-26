import { initApi } from '@/lib/api'
import { getAllDestinations, getAllStationsStatuses } from '@/lib/api/endpoints'
import { useInterceptors } from '@/lib/hooks'
import { useAppStore } from '@/lib/stores/app-store'
import { Router } from '@/routes/router'
import { FONTS_TO_LOAD } from '@/utils/constants'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useCallback, useEffect, useState } from 'react'
import { IntlProvider } from 'react-intl'
import { ActivityIndicator, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'

SplashScreen.preventAutoHideAsync()

const queryClient = new QueryClient()

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
  const allStations = useAppStore((s) => s.stations)

  const setDestinations = useAppStore((s) => s.setDestinations)
  const setStations = useAppStore((s) => s.setStations)

  const [loaded, error] = useFonts(FONTS_TO_LOAD)

  const isInitialLoad =
    !apiInitialized && !loaded && !error && !allDestinations && !allStations

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

  const loadStations = useCallback(async () => {
    try {
      const res = await getAllStationsStatuses()
      setStations(res.data.resposta)
    } catch (e) {
      console.error(e)
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Something went wrong',
        text2: 'Failed to load stations'
      })
    }
  }, [setStations])

  useEffect(() => {
    initApi().then(() => setApiInitialized(true))
  }, [])

  useEffect(() => {
    if (!allDestinations && apiInitialized) {
      loadDestinations()
    }
  }, [allDestinations, loadDestinations, apiInitialized])

  useEffect(() => {
    if (!allStations && apiInitialized) {
      loadStations()
    }
  }, [allStations, loadStations, apiInitialized])

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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <IntlProvider messages={messages} locale="en" defaultLocale="en">
            <StatusBar style="auto" />
            <Router />
            <Toast />
          </IntlProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}
