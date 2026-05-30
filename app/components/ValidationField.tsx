import { useRef } from "react"
import {
  View,
  ViewStyle,
  TextStyle,
  // eslint-disable-next-line no-restricted-imports
  TextInput,
} from "react-native"

import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"

type Props = {
  length?: number
  value: string
  onChange: (code: string) => void
  error?: boolean
  disabled?: boolean
}

export function ValidationField({ length = 6, value, onChange, error, disabled }: Props) {
  const { themed } = useAppTheme()
  // eslint-disable-next-line no-restricted-imports
  const inputs = useRef<Array<TextInput | null>>([])

  const handleChange = (text: string, index: number) => {
    const chars = value.split("")
    chars[index] = text
    const newCode = chars.join("").slice(0, length)

    onChange(newCode)

    if (text && index < length - 1) {
      inputs.current[index + 1]?.focus()
    }
  }

  const handleBackspace = (text: string, index: number) => {
    if (!text && index > 0) {
      inputs.current[index - 1]?.focus()
    }
  }

  return (
    <View style={$row}>
      {Array.from({ length }).map((_, i) => (
        <TextInput
          key={i}
          ref={(ref) => {
            inputs.current[i] = ref
          }}
          value={value[i] || ""}
          onChangeText={(t) => handleChange(t, i)}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === "Backspace") {
              handleBackspace(value[i], i)
            }
          }}
          editable={!disabled}
          keyboardType="number-pad"
          maxLength={1}
          style={[themed($baseCell), error && $errorCell]}
        />
      ))}
    </View>
  )
}

const $row: ViewStyle = {
  flexDirection: "row",
  gap: 12,
  justifyContent: "center",
}

const $baseCell: ThemedStyle<TextStyle> = ({ colors }) => ({
  width: 48,
  height: 56,
  borderWidth: 1,
  borderColor: colors.palette.neutral400,
  borderRadius: 8,
  textAlign: "center",
  fontSize: 20,
  color: colors.text,
})

const $errorCell: TextStyle = {
  borderColor: "red",
}
