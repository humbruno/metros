import { AppPressable } from '@/components/app-pressable'
import { AppText } from '@/components/app-text'
import { colors, spacing } from '@/lib/theme'
import { ResolvedLineWaitingTime } from '@/lib/types'
import { Lines } from '@/utils/constants'
import { formatArrivalTime } from '@/utils/helpers'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { Fragment } from 'react'
import { StyleSheet, View, type ViewStyle } from 'react-native'

type Props = {
  item: ResolvedLineWaitingTime
  line: Lines
  onFavourited: (station: ResolvedLineWaitingTime) => void
}

export function StationCard({ item, line, onFavourited }: Props) {
  const times = [item.tempoChegada1, item.tempoChegada2, item.tempoChegada3]

  return (
    <View style={[styles.card]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <View style={[styles.box, variants[line]]}>
          <MaterialIcons name="train" size={34} color={iconVariants[line]} />
        </View>
        <View>
          <AppText size="md" weight="medium">
            {item.stationLabel}
          </AppText>
          <AppText size="xs" weight="thin">
            {item.destinationLabel}
          </AppText>
          <View style={styles.timeCardContainer}>
            <MaterialIcons name="alarm" size={17} color="black" />
            {times.map((time, index) => {
              const isLastItem = index === times.length - 1
              return (
                <Fragment key={index}>
                  <Time timeInSeconds={time} />
                  {!isLastItem && <AppText>•</AppText>}
                </Fragment>
              )
            })}
          </View>
        </View>
      </View>
      <AppPressable
        style={{ paddingHorizontal: 0 }}
        onPress={() => onFavourited(item)}
      >
        <MaterialIcons
          name={item.isFavourite ? 'favorite' : 'favorite-outline'}
          color={item.isFavourite ? colors.primary : colors.inactive}
          size={24}
        />
      </AppPressable>
    </View>
  )
}

function Time({ timeInSeconds }: { timeInSeconds: string }) {
  return (
    <View>
      <AppText size="xs" weight="light">
        {formatArrivalTime(timeInSeconds)}
      </AppText>
    </View>
  )
}

const styles = StyleSheet.create({
  box: {
    width: 70,
    height: 70,
    borderRadius: spacing.md,
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    backgroundColor: '#ffffff',
    paddingVertical: spacing.xxs,
    paddingLeft: spacing.xxs,
    paddingRight: spacing.md,
    borderRadius: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1
  },
  timeCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs
  }
})

const variants: Record<Lines, ViewStyle> = {
  [Lines.Red]: {
    backgroundColor: colors.redLine
  },
  [Lines.Blue]: {
    backgroundColor: colors.blueLine
  },
  [Lines.Yellow]: {
    backgroundColor: colors.yellowLine
  },
  [Lines.Green]: {
    backgroundColor: colors.greenLine
  }
}

const iconVariants: Record<Lines, string> = {
  [Lines.Red]: colors.redLineAccent,
  [Lines.Blue]: colors.blueLineAccent,
  [Lines.Yellow]: colors.yellowLineAccent,
  [Lines.Green]: colors.greenLineAccent
}
