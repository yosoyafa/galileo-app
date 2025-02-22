import {
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { ThemedText } from '@components/ui/ThemedText'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { Link, router } from 'expo-router'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { selectFavoritePlanetsArray } from '@store/userPreferences/selectors'
import { removeFromFavorites } from '@store/userPreferences/slice'
import { PlanetCard } from '@components/core/PlanetCard'
import { useThemeColor } from '@hooks/useThemeColor'

export default function Favorites() {
  const dispatch = useAppDispatch()
  const iconColor = useThemeColor({}, 'text')
  const favoritePlanets = useAppSelector(selectFavoritePlanetsArray)

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.header}>
          <ThemedText type='title'>Favorite Planets</ThemedText>
          <IconSymbol name='globe.americas.fill' size={28} color={iconColor} />
        </View>
        <FlatList
          data={favoritePlanets}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: { name, picture, id } }) => (
            <PlanetCard
              onPress={() => router.navigate(`/planets/${id}`)}
              name={name}
              picture={picture}
              rightDecorator={
                <TouchableOpacity
                  onPress={() => {
                    dispatch(removeFromFavorites(id))
                  }}>
                  <IconSymbol name='heart.fill' color='red' />
                </TouchableOpacity>
              }
            />
          )}
          contentContainerStyle={styles.flatListContent}
          ListEmptyComponent={() => (
            <View style={styles.emptyListContainer}>
              <ThemedText type='defaultSemiBold'>
                You haven't marked any planet as your favorite
              </ThemedText>
              <Link href='/'>
                <ThemedText type='link'>Go explore some planets!</ThemedText>
              </Link>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 32,
    gap: 16
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  flatListContent: {
    gap: 16
  },
  emptyListContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 64
  }
})
