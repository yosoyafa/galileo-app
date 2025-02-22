import { Stack } from 'expo-router'

export default function HomeLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='index' options={{ title: 'Planets' }} />
      <Stack.Screen name='[planetId]' options={{ title: 'Details' }} />
    </Stack>
  )
}
