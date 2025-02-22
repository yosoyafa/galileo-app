import { Image, TouchableOpacity, View, StyleSheet } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import ParallaxScrollView from '@components/ui/ParallaxScrollView'
import { ThemedText } from '@components/ui/ThemedText'
import { ThemedView } from '@components/ui/ThemedView'
import { IconSymbol, IconSymbolName } from '@/components/ui/IconSymbol'
import { useGetPlanetByIdQuery, Planet } from '@services/planets'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { addToFavorites, removeFromFavorites } from '@store/userPreferences/slice'
import { selectFavoritePlanets } from '@store/userPreferences/selectors'
import { useThemeColor } from '@hooks/useThemeColor'
import { useMemo } from 'react'

export default function PlanetDetail() {
  const { planetId } = useLocalSearchParams()
  const iconColor = useThemeColor({}, 'icon')
  const backgroundColor = useThemeColor({}, 'background')
  const favoritePlanets = useAppSelector(selectFavoritePlanets)
  const dispatch = useAppDispatch()
  const { data: planet, isLoading } = useGetPlanetByIdQuery(planetId as string)

  const isFavorite = useMemo(
    () => planet?.id !== undefined && !!favoritePlanets[planet.id],
    [favoritePlanets, planet?.id]
  )

  const renderPlanetDetails = (planet: Planet) => {
    const { name, description, mass, diameter, orbitalPeriod, moons, id } = planet

    return (
      <>
        <ThemedView style={styles.detailHeader}>
          <ThemedText type='title'>Explore {name}</ThemedText>
          <TouchableOpacity
            onPress={() => {
              dispatch(isFavorite ? removeFromFavorites(id) : addToFavorites(planet))
            }}>
            <IconSymbol name={isFavorite ? 'heart.fill' : 'heart'} color={'red'} />
          </TouchableOpacity>
        </ThemedView>
        <ThemedText>{description}</ThemedText>
        <DetailRow
          icon='scalemass.fill'
          label='Mass:'
          value={mass}
          iconColor={iconColor}
        />
        <DetailRow
          icon='lines.measurement.horizontal'
          label='Diameter:'
          value={diameter}
          iconColor={iconColor}
        />
        <DetailRow
          icon='timer'
          label='Orbital Period:'
          value={orbitalPeriod}
          iconColor={iconColor}
        />
        <DetailRow
          icon='moon.fill'
          label='Number of Moons:'
          value={moons}
          iconColor={iconColor}
        />
        <DetailRow
          icon='moon.fill'
          label='Number of Moons:'
          value={moons}
          iconColor={iconColor}
        />
      </>
    )
  }

  if (!planet) return null

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <View style={styles.imageContainer}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={[styles.backButton, { backgroundColor }]}>
            <IconSymbol name='arrow.backward' size={25} color={iconColor} />
          </TouchableOpacity>
          <Image style={styles.headerImage} source={{ uri: planet.picture }} />
        </View>
      }>
      {renderPlanetDetails(planet)}
    </ParallaxScrollView>
  )
}

interface DetailRowProps {
  icon: IconSymbolName
  label: string
  value: string | number
  iconColor: string
}

function DetailRow({ icon, label, value, iconColor }: DetailRowProps) {
  return (
    <View style={styles.detailRow}>
      <IconSymbol name={icon} color={iconColor} />
      <ThemedText>
        <ThemedText type='defaultSemiBold'>{label}</ThemedText> {value}
      </ThemedText>
    </View>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    position: 'relative'
  },
  headerImage: {
    width: '100%',
    height: 300
  },
  detailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
    padding: 8,
    borderRadius: 50
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  }
})
