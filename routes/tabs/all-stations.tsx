import { AppText } from '@/components/app-text'
import { FullscreenLoading } from '@/components/fullscreen-loading'
import { useLineWaitingTimes } from '@/lib/api/queries'
import { useAppStore } from '@/lib/stores/app-store'
import { colors, spacing } from '@/lib/theme'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { useCallback, useMemo, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

export type TopTabsStackParamList = {
  Red: undefined
  Blue: undefined
  Yellow: undefined
  Green: undefined
}

const TopTab = createMaterialTopTabNavigator<TopTabsStackParamList>()

function GreenLineTab() {
  const {
    data: redLine,
    isLoading,
    refetch,
    isFetching
  } = useLineWaitingTimes('Verde')

  const destinations = useAppStore((s) => s.destinations)
  const stations = useAppStore((s) => s.stations)

  const getDestinationLabel = useCallback(
    (destinationId: string) => {
      if (!destinations) return ''
      const label = destinations.find(
        (v) => v.id_destino === destinationId
      )?.nome_destino
      return label
    },
    [destinations]
  )

  const getStationLabel = useCallback(
    (stationId: string) => {
      if (!stations) return ''
      const label = stations.find((v) => v.stop_id === stationId)?.stop_name
      return label
    },
    [stations]
  )

  function formatArrivalTime(secondsStr: string): string {
    const seconds = Number.parseInt(secondsStr)

    // Calculate the minutes and seconds
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60

    // Pad the minutes and seconds with leading zeros if necessary
    const minutesString = minutes.toString().padStart(2, '0')
    const secondsString = remainingSeconds.toString().padStart(2, '0')

    // Return the formatted time string
    return `${minutesString}:${secondsString}`
  }

  if (!redLine) return <FullscreenLoading />

  return (
    <View style={{ padding: spacing.md, flex: 1 }}>
      <FlatList
        ListHeaderComponent={<AppText variant="subheading">Green Line</AppText>}
        contentContainerStyle={{ gap: spacing.md }}
        data={redLine?.data.resposta}
        keyExtractor={(item) => item.cais}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <AppText>Estação: {getStationLabel(item.stop_id)}</AppText>
            <AppText>Destino: {getDestinationLabel(item.destino)}</AppText>
            <AppText>Proximo: {formatArrivalTime(item.tempoChegada1)}</AppText>
            <AppText>Proximo: {formatArrivalTime(item.tempoChegada2)}</AppText>
            <AppText>Proximo: {formatArrivalTime(item.tempoChegada3)}</AppText>
          </View>
        )}
      />
    </View>
  )
}
function YellowLineTab() {
  const {
    data: redLine,
    isLoading,
    refetch,
    isFetching
  } = useLineWaitingTimes('Amarela')

  const destinations = useAppStore((s) => s.destinations)
  const stations = useAppStore((s) => s.stations)

  const getDestinationLabel = useCallback(
    (destinationId: string) => {
      if (!destinations) return ''
      const label = destinations.find(
        (v) => v.id_destino === destinationId
      )?.nome_destino
      return label
    },
    [destinations]
  )

  const getStationLabel = useCallback(
    (stationId: string) => {
      if (!stations) return ''
      const label = stations.find((v) => v.stop_id === stationId)?.stop_name
      return label
    },
    [stations]
  )

  function formatArrivalTime(secondsStr: string): string {
    const seconds = Number.parseInt(secondsStr)

    // Calculate the minutes and seconds
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60

    // Pad the minutes and seconds with leading zeros if necessary
    const minutesString = minutes.toString().padStart(2, '0')
    const secondsString = remainingSeconds.toString().padStart(2, '0')

    // Return the formatted time string
    return `${minutesString}:${secondsString}`
  }

  if (!redLine) return <FullscreenLoading />

  return (
    <View style={{ padding: spacing.md, flex: 1 }}>
      <FlatList
        ListHeaderComponent={
          <AppText variant="subheading">Yellow Line</AppText>
        }
        contentContainerStyle={{ gap: spacing.md }}
        data={redLine?.data.resposta}
        keyExtractor={(item) => item.cais}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <AppText>Estação: {getStationLabel(item.stop_id)}</AppText>
            <AppText>Destino: {getDestinationLabel(item.destino)}</AppText>
            <AppText>Proximo: {formatArrivalTime(item.tempoChegada1)}</AppText>
            <AppText>Proximo: {formatArrivalTime(item.tempoChegada2)}</AppText>
            <AppText>Proximo: {formatArrivalTime(item.tempoChegada3)}</AppText>
          </View>
        )}
      />
    </View>
  )
}

function BlueLineTab() {
  const {
    data: redLine,
    isLoading,
    refetch,
    isFetching
  } = useLineWaitingTimes('Azul')

  const destinations = useAppStore((s) => s.destinations)
  const stations = useAppStore((s) => s.stations)

  const getDestinationLabel = useCallback(
    (destinationId: string) => {
      if (!destinations) return ''
      const label = destinations.find(
        (v) => v.id_destino === destinationId
      )?.nome_destino
      return label
    },
    [destinations]
  )

  const getStationLabel = useCallback(
    (stationId: string) => {
      if (!stations) return ''
      const label = stations.find((v) => v.stop_id === stationId)?.stop_name
      return label
    },
    [stations]
  )

  function formatArrivalTime(secondsStr: string): string {
    const seconds = Number.parseInt(secondsStr)

    // Calculate the minutes and seconds
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60

    // Pad the minutes and seconds with leading zeros if necessary
    const minutesString = minutes.toString().padStart(2, '0')
    const secondsString = remainingSeconds.toString().padStart(2, '0')

    // Return the formatted time string
    return `${minutesString}:${secondsString}`
  }

  if (!redLine) return <FullscreenLoading />

  return (
    <View style={{ padding: spacing.md, flex: 1 }}>
      <FlatList
        ListHeaderComponent={<AppText variant="subheading">Blue Line</AppText>}
        contentContainerStyle={{ gap: spacing.md }}
        data={redLine?.data.resposta}
        keyExtractor={(item) => item.cais}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <AppText>Estação: {getStationLabel(item.stop_id)}</AppText>
            <AppText>Destino: {getDestinationLabel(item.destino)}</AppText>
            <AppText>Proximo: {formatArrivalTime(item.tempoChegada1)}</AppText>
            <AppText>Proximo: {formatArrivalTime(item.tempoChegada2)}</AppText>
            <AppText>Proximo: {formatArrivalTime(item.tempoChegada3)}</AppText>
          </View>
        )}
      />
    </View>
  )
}

function RedLineTab() {
  const [search, setSearch] = useState('')

  const {
    data: redLine,
    isLoading,
    refetch,
    isFetching
  } = useLineWaitingTimes('Vermelha')

  const destinations = useAppStore((s) => s.destinations)
  const stations = useAppStore((s) => s.stations)

  const listData = useMemo(() => {
    if (!search.trim()) return redLine?.data.resposta
    return redLine?.data.resposta.filter((v) => v.cais.includes(search.trim()))
  }, [redLine, search])

  const getDestinationLabel = useCallback(
    (destinationId: string) => {
      if (!destinations) return ''
      const label = destinations.find(
        (v) => v.id_destino === destinationId
      )?.nome_destino
      return label
    },
    [destinations]
  )

  const getStationLabel = useCallback(
    (stationId: string) => {
      if (!stations) return ''
      const label = stations.find((v) => v.stop_id === stationId)?.stop_name
      return label
    },
    [stations]
  )

  function formatArrivalTime(secondsStr: string): string {
    const seconds = Number.parseInt(secondsStr)

    // Calculate the minutes and seconds
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60

    // Pad the minutes and seconds with leading zeros if necessary
    const minutesString = minutes.toString().padStart(2, '0')
    const secondsString = remainingSeconds.toString().padStart(2, '0')

    // Return the formatted time string
    return `${minutesString}:${secondsString}`
  }

  if (!redLine) return <FullscreenLoading />

  return (
    <View style={{ padding: spacing.md, flex: 1, gap: 16 }}>
      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Buscar"
        style={{
          backgroundColor: 'white',
          padding: 16,
          borderRadius: 8
        }}
      />
      <FlatList
        contentContainerStyle={{ gap: spacing.md }}
        data={listData}
        keyExtractor={(item) => item.cais}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <AppText>Estação: {getStationLabel(item.stop_id)}</AppText>
            <AppText>Destino: {getDestinationLabel(item.destino)}</AppText>
            <AppText>Proximo: {formatArrivalTime(item.tempoChegada1)}</AppText>
            <AppText>Proximo: {formatArrivalTime(item.tempoChegada2)}</AppText>
            <AppText>Proximo: {formatArrivalTime(item.tempoChegada3)}</AppText>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.errorBackground,
    padding: spacing.md,
    borderRadius: spacing.xs
  }
})

export function AllStationsTab() {
  return (
    <TopTab.Navigator>
      <TopTab.Screen
        name="Red"
        component={RedLineTab}
        options={{
          title: 'Red',
          tabBarIndicatorStyle: { backgroundColor: 'red' },
          tabBarLabelStyle: { color: 'red' }
        }}
      />
      <TopTab.Screen
        name="Blue"
        component={BlueLineTab}
        options={{
          title: 'Blue',
          tabBarIndicatorStyle: { backgroundColor: 'blue' },
          tabBarLabelStyle: { color: 'blue' }
        }}
      />
      <TopTab.Screen
        name="Yellow"
        component={YellowLineTab}
        options={{
          title: 'Yellow',
          tabBarIndicatorStyle: { backgroundColor: 'orange' },
          tabBarLabelStyle: { color: 'orange' }
        }}
      />
      <TopTab.Screen
        name="Green"
        component={GreenLineTab}
        options={{
          title: 'Green',
          tabBarIndicatorStyle: { backgroundColor: 'green' },
          tabBarLabelStyle: { color: 'green' }
        }}
      />
    </TopTab.Navigator>
  )
}
