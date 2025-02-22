import { TextInput, TouchableOpacity, StyleSheet, View } from 'react-native'
import { IconSymbol } from './IconSymbol'
import { useThemeColor } from '@hooks/useThemeColor'

interface SearchBarProps {
  searchTerm: string
  setSearchTerm: (text: string) => void
  order: 'asc' | 'desc' | 'none'
  setOrder: (order: 'asc' | 'desc' | 'none') => void
}

export function SearchBar({
  searchTerm,
  setSearchTerm,
  order,
  setOrder
}: SearchBarProps) {
  const backgroundColor = useThemeColor({}, 'background')
  const iconColor = useThemeColor({}, 'icon')

  const changeOrder = () => {
    if (order === 'none') {
      setOrder('asc')
    } else if (order === 'asc') {
      setOrder('desc')
    } else {
      setOrder('none')
    }
  }

  const orderIconName =
    order === 'asc'
      ? 'arrow.up'
      : order === 'desc'
        ? 'arrow.down'
        : 'arrow.up.arrow.down'

  return (
    <View style={styles.searchBar}>
      <TextInput
        value={searchTerm}
        onChangeText={setSearchTerm}
        style={[{ backgroundColor }, styles.searchInput]}
        placeholder='Search planets'
        clearButtonMode='while-editing'
      />
      <TouchableOpacity onPress={changeOrder}>
        <IconSymbol name={orderIconName} color={iconColor} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16
  },
  searchInput: {
    flex: 1,
    padding: 16,
    borderRadius: 8
  }
})
