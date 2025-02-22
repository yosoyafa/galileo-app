import {
  View,
  SafeAreaView,
  FlatList,
  StyleSheet,
  RefreshControl
} from 'react-native'
import { ThemedText } from '@components/ui/ThemedText'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { router } from 'expo-router'
import { Planet, useGetPlanetsQuery } from '@services/planets'
import { useEffect, useState, useCallback } from 'react'
import { PlanetCard } from '@components/core/PlanetCard'
import { SearchBar } from '@components/ui/SearchBar'
import { useThemeColor } from '@hooks/useThemeColor'

export default function HomeScreen() {
  const { data: planets, refetch } = useGetPlanetsQuery()
  const iconColor = useThemeColor({}, 'text')

  const [filteredPlanets, setFilteredPlanets] = useState<Planet[] | undefined>(
    planets
  )
  const [searchTerm, setSearchTerm] = useState<string>('')

  const [order, setOrder] = useState<'asc' | 'desc' | 'none'>('none')
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    setFilteredPlanets(planets)
  }, [planets])

  useEffect(() => {
    setFilteredPlanets(
      planets?.filter(({ name }) =>
        name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }, [searchTerm])

  useEffect(() => {
    if (order === 'asc' && planets) {
      const sortedPlanets = [...planets].sort((a, b) => a.name.localeCompare(b.name))
      setFilteredPlanets(sortedPlanets)
    } else if (order === 'desc' && planets) {
      const sortedPlanets = [...planets].sort((a, b) => b.name.localeCompare(a.name))
      setFilteredPlanets(sortedPlanets)
    } else {
      setFilteredPlanets(planets)
    }
  }, [order, planets])

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    refetch().then(() => setRefreshing(false))
  }, [refetch])

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <ThemedText type='title'>Galileo</ThemedText>
          <IconSymbol name='globe.americas.fill' size={28} color={iconColor} />
        </View>
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          order={order}
          setOrder={setOrder}
        />
        <FlatList
          data={filteredPlanets}
          keyExtractor={({ id }) => id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: { name, picture, id } }) => (
            <PlanetCard
              name={name}
              picture={picture}
              onPress={() => router.navigate(`/planets/${id}`)}
            />
          )}
          contentContainerStyle={styles.flatListContent}
          style={styles.flatList}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },
  container: {
    padding: 16,
    paddingTop: 32,
    gap: 16,
    flex: 1
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  flatListContent: {
    gap: 16,
    paddingBottom: 16
  },
  flatList: {
    flex: 1
  }
})
