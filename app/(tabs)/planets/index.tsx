import React, { useState, useEffect, useCallback } from 'react'
import {
  View,
  SafeAreaView,
  FlatList,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native'
import { ThemedText } from '@components/ui/ThemedText'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { router } from 'expo-router'
import { Planet, useGetPlanetsQuery } from '@services/planets'
import { PlanetCard } from '@components/core/PlanetCard'
import { SearchBar } from '@components/ui/SearchBar'
import { useThemeColor } from '@hooks/useThemeColor'
import { Button } from '@components/ui/Button'

export default function HomeScreen() {
  const { data: planets, isLoading, error, refetch } = useGetPlanetsQuery()
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
    if (!planets) return
    const filtered = planets.filter(({ name }) =>
      name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredPlanets(filtered)
  }, [searchTerm, planets])

  useEffect(() => {
    if (!planets) return
    const sortedPlanets = [...planets].sort((a, b) => {
      if (order === 'asc') return a.name.localeCompare(b.name)
      if (order === 'desc') return b.name.localeCompare(a.name)
      return 0
    })
    setFilteredPlanets(sortedPlanets)
  }, [order, planets])

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    refetch().then(() => setRefreshing(false))
  }, [refetch])

  const renderContent = () => {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size='large' color={iconColor} />
          <ThemedText style={styles.loadingText}>
            Loading Planet Details...
          </ThemedText>
        </View>
      )
    }

    if (error) {
      return (
        <View style={styles.errorContainer}>
          <ThemedText type='default'>Error loading planet details.</ThemedText>
          <Button label='Retry' onPress={refetch} />
        </View>
      )
    }

    return (
      <>
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
          renderItem={({
            item: {
              name,
              pictures: { icon },
              id
            }
          }) => (
            <PlanetCard
              name={name}
              picture={icon}
              onPress={() => router.navigate(`/planets/${id}`)}
            />
          )}
          contentContainerStyle={styles.flatListContent}
          style={styles.flatList}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </>
    )
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <ThemedText type='title'>Galileo</ThemedText>
          <IconSymbol name='globe.americas.fill' size={28} color={iconColor} />
        </View>
        {renderContent()}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
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
    paddingBottom: 64
  },
  flatList: { flex: 1 },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    marginTop: 10
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 16
  },
  retryButton: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5
  }
})
