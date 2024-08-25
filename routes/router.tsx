import {
  TabNavigator,
  type TabStackParamList
} from '@/routes/tabs/tab-navigator'
import {
  NavigationContainer,
  type NavigatorScreenParams
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator<AppStackParamList>()

export type AppStackParamList = {
  Tab: NavigatorScreenParams<TabStackParamList>
}

export function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tab" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
