import { colors, spacing, typography } from '@/lib/theme'
import Ionicons from '@expo/vector-icons/Ionicons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { StyleSheet } from 'react-native'
import { AboutTab } from './about'
import { AllStationsTab, TopTabsStackParamList } from './all-stations'
import { FavouritesTab } from './favourites'
import { LinesStatusTab } from './lines-status'

export type TabStackParamList = {
  Favourites: undefined
  AllStations: TopTabsStackParamList
  LinesStatus: undefined
  About: undefined
}

const Tab = createBottomTabNavigator<TabStackParamList>()

export function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarInactiveTintColor: colors.inactive,
        tabBarActiveTintColor: colors.primary,
        tabBarStyle: styles.tabBar,
        tabBarLabel: '',
        headerStyle: styles.headerStyle,
        headerTitleStyle: styles.headerTitleStyle
      }}
    >
      <Tab.Screen
        name="Favourites"
        component={FavouritesTab}
        options={{
          title: 'Favourites',
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons
              name={focused ? 'favorite' : 'favorite-outline'}
              color={color}
              size={size}
            />
          )
        }}
      />
      <Tab.Screen
        name="AllStations"
        component={AllStationsTab}
        options={{
          title: 'All Stations',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'hourglass' : 'hourglass-outline'}
              size={size}
              color={color}
            />
          )
        }}
      />
      <Tab.Screen
        name="LinesStatus"
        component={LinesStatusTab}
        options={{
          title: 'Lines',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'alert-circle' : 'alert-circle-outline'}
              size={size}
              color={color}
            />
          )
        }}
      />
      <Tab.Screen
        name="About"
        component={AboutTab}
        options={{
          title: 'About',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'settings' : 'settings-outline'}
              size={size}
              color={color}
            />
          )
        }}
      />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  tabBar: { height: 100, paddingTop: spacing.sm },
  headerTitleStyle: {
    color: '#fff',
    fontSize: 24,
    fontFamily: typography.primary.bold
  },
  headerStyle: { backgroundColor: colors.primary }
})
