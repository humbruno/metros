import { StationCard } from '@/components/station-card'
import { useStationWaitingTimes } from '@/lib/api/queries'
import { useUserStore } from '@/lib/stores/user-store'
import { spacing } from '@/lib/theme'
import { FavouritedStation, ResolvedLineWaitingTime } from '@/lib/types'
import { useCallback } from 'react'
import { useIntl } from 'react-intl'
import { FlatList, View } from 'react-native'

export function FavouritesTab() {
  const favourites = useUserStore((s) => s.favouriteStations)
  const t = useIntl()

  return (
    <View style={{ padding: spacing.lg, flex: 1 }}>
      {favourites && (
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            gap: spacing.md,
            flex: 1,
            paddingBottom: spacing.md
          }}
          data={favourites}
          renderItem={({ item }) => <Test favouriteStation={item} />}
          keyExtractor={(item) => `${item.stop_id}-${item.destino}`}
        />
      )}
    </View>
  )
}

function Test({ favouriteStation }: { favouriteStation: FavouritedStation }) {
  const { data } = useStationWaitingTimes(favouriteStation.stop_id)
  const toggleFavourite = useUserStore((s) => s.toggleFavouriteStation)

  const handleFavouritePress = useCallback(
    async (station: ResolvedLineWaitingTime) => {
      toggleFavourite({
        stop_id: station.stop_id,
        destino: station.destino,
        line: favouriteStation.line
      })
    },
    [toggleFavourite, favouriteStation]
  )
  if (!data) return null

  const item = data.find((v) => v.destino === favouriteStation.destino)

  if (!item) return null
  return (
    <StationCard
      onFavourited={handleFavouritePress}
      item={item}
      line={favouriteStation.line}
    />
  )
}
