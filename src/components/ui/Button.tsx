import { StyleSheet, TouchableOpacity } from 'react-native'
import { ThemedText } from './ThemedText'
import { useThemeColor } from '../../hooks/useThemeColor'

interface ButtonProps {
  label: string
  onPress: () => void
}

export const Button = ({ label, onPress }: ButtonProps) => {
  const backgroundColor = useThemeColor({}, 'background')
  const borderColor = useThemeColor({}, 'text')
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, { backgroundColor, borderColor }]}>
      <ThemedText type='defaultSemiBold'>{label}</ThemedText>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1
  }
})
