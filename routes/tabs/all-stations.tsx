import { LineStations } from '@/components/line-stations'
import { colors, typography } from '@/lib/theme'
import { Lines } from '@/utils/constants'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

export type TopTabsStackParamList = {
  Red: undefined
  Blue: undefined
  Yellow: undefined
  Green: undefined
}

const TopTab = createMaterialTopTabNavigator<TopTabsStackParamList>()

export function AllStationsTab() {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: colors.primary },
        tabBarLabelStyle: { fontFamily: typography.primary.semiBold },
        tabBarInactiveTintColor: colors.inactive,
        tabBarActiveTintColor: colors.primary
      }}
    >
      <TopTab.Screen
        name="Red"
        component={RedLineTab}
        options={{
          title: 'Red'
        }}
      />
      <TopTab.Screen
        name="Blue"
        component={BlueLineTab}
        options={{
          title: 'Blue'
        }}
      />
      <TopTab.Screen
        name="Yellow"
        component={YellowLineTab}
        options={{
          title: 'Yellow'
        }}
      />
      <TopTab.Screen
        name="Green"
        component={GreenLineTab}
        options={{
          title: 'Green'
        }}
      />
    </TopTab.Navigator>
  )
}

function RedLineTab() {
  return <LineStations line={Lines.Red} />
}

function BlueLineTab() {
  return <LineStations line={Lines.Blue} />
}

function YellowLineTab() {
  return <LineStations line={Lines.Yellow} />
}

function GreenLineTab() {
  return <LineStations line={Lines.Green} />
}
