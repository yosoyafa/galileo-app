import { Tabs } from 'expo-router'
import React from 'react'
import { Platform, useColorScheme } from 'react-native'

import { HapticTab } from '@components/ui/HapticTab'
import { IconSymbol } from '@/components/ui/IconSymbol'
import TabBarBackground from '@/components/ui/TabBarBackground'
import { Colors } from '@/constants/Colors'

export default function TabLayout() {
  const colorScheme = useColorScheme()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute'
          },
          default: {}
        })
      }}>
      <Tabs.Screen
        name='planets'
        options={{
          title: 'Planets',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name='globe.americas.fill' color={color} />
          )
        }}
      />
      <Tabs.Screen
        name='favorites'
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name='heart.fill' color={color} />
          )
        }}
      />
    </Tabs>
  )
}
