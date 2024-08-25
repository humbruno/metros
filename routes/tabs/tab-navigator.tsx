import { HomeTab } from '@/routes/tabs/home'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { StyleSheet } from 'react-native'

export type TabStackParamList = {
  Home: undefined
}

const Tab = createBottomTabNavigator<TabStackParamList>()

export function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: styles.tabBar,
        tabBarIconStyle: styles.tabBarIcon
      })}
    >
      <Tab.Screen name="Home" component={HomeTab} />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    paddingTop: 16
  },
  tabBarIcon: {
    marginBottom: 12
  }
})
