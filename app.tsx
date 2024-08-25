import { Router } from '@/routes/router'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <Router />
    </SafeAreaProvider>
  )
}
