import { spacing } from '@/lib/theme'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
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
        tabBarInactiveTintColor: 'gray',
        tabBarActiveTintColor: 'blue',
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarIconStyle: styles.tabBarIcon,
        tabBarStyle: styles.tabBar
      }}
    >
      <Tab.Screen
        name="Favourites"
        component={FavouritesTab}
        options={{
          title: 'Favourites',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="favorite" color={color} size={size} />
          )
        }}
      />
      <Tab.Screen
        name="AllStations"
        component={AllStationsTab}
        options={{
          title: 'All Stations',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="map-signs" size={size} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="LinesStatus"
        component={LinesStatusTab}
        options={{
          title: 'Lines',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="railway-alert" size={size} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="About"
        component={AboutTab}
        options={{
          title: 'About',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="information"
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
  tabBar: {
    paddingVertical: spacing.sm
  },
  tabBarIcon: {
    marginTop: -3
  },
  tabBarLabel: {}
})
