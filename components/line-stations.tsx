import { FullscreenLoading } from '@/components/fullscreen-loading'
import { StationCard } from '@/components/station-card'
import { useLineWaitingTimes } from '@/lib/api/queries'
import { useUserStore } from '@/lib/stores/user-store'
import { colors, spacing, typography } from '@/lib/theme'
import { ResolvedLineWaitingTime } from '@/lib/types'
import { Lines } from '@/utils/constants'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useMemo, useState } from 'react'
import {
  FlatList,
  Keyboard,
  RefreshControl,
  StyleSheet,
  TextInput,
  View
} from 'react-native'

type Props = {
  line: Lines
}

export function LineStations({ line }: Props) {
  const [search, setSearch] = useState<string | undefined>(undefined)
  const toggleFavourite = useUserStore((s) => s.toggleFavouriteStation)

  const { data, isLoading, refetch } = useLineWaitingTimes(line)

  const queryClient = useQueryClient()

  const listData = useMemo(() => {
    if (!data) return []
    if (!search?.trim()) return data
    return data.filter((item) =>
      item.stationLabel.toLowerCase().includes(search.toLowerCase())
    )
  }, [data, search])

  const handleFavouritePress = useCallback(
    async (station: ResolvedLineWaitingTime) => {
      toggleFavourite({
        stop_id: station.stop_id,
        destino: station.destino,
        line
      })

      // optimistic update the favourite indicator, otherwise we would have to wait for the next refetch
      await queryClient.cancelQueries({ queryKey: ['waitingTimes', line] })
      queryClient.setQueryData(
        ['waitingTimes', line],
        (oldData: ResolvedLineWaitingTime[]) => {
          return oldData.map((v) =>
            v.stop_id === station.stop_id && v.destino === station.destino
              ? { ...v, isFavourite: !station.isFavourite }
              : v
          )
        }
      )
    },
    [toggleFavourite, line, queryClient]
  )

  if (!data || isLoading) return <FullscreenLoading />

  return (
    <View key={line} style={styles.container}>
      <TextInput
        clearButtonMode="always"
        selectTextOnFocus
        value={search}
        onChangeText={setSearch}
        style={styles.searchInput}
        placeholder="Search Station"
        accessibilityRole="search"
        accessibilityLabel="Search Station"
        returnKeyType="done"
      />
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={refetch}
            tintColor={colors.primary}
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: spacing.md, paddingBottom: spacing.md }}
        onScrollBeginDrag={Keyboard.dismiss}
        data={listData}
        keyExtractor={(item) => item.cais}
        renderItem={({ item }) => (
          <StationCard
            onFavourited={handleFavouritePress}
            item={item}
            line={line}
          />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacing.md,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md
  },
  searchInput: {
    backgroundColor: '#ffffff',
    borderRadius: spacing.xs,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    padding: spacing.sm,
    fontSize: 14,
    fontFamily: typography.primary.regular
  }
})
