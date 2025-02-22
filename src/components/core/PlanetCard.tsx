import { ThemedView } from '../ui/ThemedView'
import { ThemedText } from '../ui/ThemedText'
import { TouchableOpacity, Image, View, StyleSheet } from 'react-native'

interface PlanetCardProps {
  picture: string
  name: string
  rightDecorator?: React.ReactNode
  onPress?: () => void
}

const PlanetCard = ({
  picture,
  name,
  rightDecorator,
  onPress = () => {}
}: PlanetCardProps) => {
  return (
    <ThemedView style={styles.cardContainer}>
      <TouchableOpacity onPress={onPress} style={styles.cardButton}>
        <View style={styles.cardContent}>
          <Image source={{ uri: picture }} style={styles.planetImage} />
          <ThemedText type='subtitle'>{name}</ThemedText>
        </View>
        {rightDecorator && rightDecorator}
      </TouchableOpacity>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 8,
    overflow: 'hidden'
  },
  cardButton: {
    flex: 1,
    width: '100%',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    justifyContent: 'space-between'
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16
  },
  planetImage: {
    height: 50,
    width: 50,
    borderRadius: 25
  }
})

export { PlanetCard }
