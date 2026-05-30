import {
  Pressable,
  View,
  Image,
  ViewStyle,
  TextStyle,
  ImageStyle,
  PressableStateCallbackType,
  StyleProp,
} from "react-native"

import { useAppTheme } from "@/theme/context"
import { ThemedStyle, ThemedStyleArray } from "@/theme/types"

import { Text } from "./Text"

type Props = {
  type: string
  breed?: string
  image?: string
  onPress?: () => void
  preset?: Presets
  isActive?: boolean
}

type Presets = "default" | "filled"

export function PetProfile(props: Props) {
  const { type, breed, image, onPress, isActive } = props
  const { themed } = useAppTheme()

  const preset: Presets = props.preset ?? "default"

  // ✅ PRESSABLE STYLE (FIXED)
  const $containerStyle = (_: PressableStateCallbackType): StyleProp<ViewStyle> => {
    const styles: StyleProp<ViewStyle>[] = [themed($viewPresets[preset])]

    // if (pressed) {
    //   styles.push(themed($pressedViewPresets[preset]))
    // }

    if (isActive) {
      styles.push(themed($pressedViewPresets[preset]))
    }
    return styles
  }

  return (
    <Pressable style={$containerStyle} onPress={onPress}>
      <View style={themed($content)}>
        <Text text={type} style={themed($name)} />
        <Text text={breed ?? ""} style={themed($email)} />
      </View>

      <Image
        source={image ? { uri: image } : { uri: "https://via.placeholder.com/100" }}
        style={themed($avatar)}
      />
    </Pressable>
  )
}

/* ================= BASE STYLE ================= */

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  alignItems: "center",
  padding: spacing.md,
  borderRadius: 12,
  gap: 20,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.08,
  shadowRadius: 6,
  elevation: 3,
})

const $avatar: ThemedStyle<ImageStyle> = () => ({
  width: 56,
  height: 56,
  borderRadius: 28,
  marginRight: 12,
})

const $content: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})

const $name: ThemedStyle<TextStyle> = ({ typography }) => ({
  fontSize: 16,
  fontFamily: typography.primary.medium,
  textAlign: "center",
})

const $email: ThemedStyle<TextStyle> = ({ colors }) => ({
  fontSize: 13,
  color: colors.textDim,
  marginTop: 2,
})

/* ================= PRESETS ================= */

const $viewPresets: Record<Presets, ThemedStyleArray<ViewStyle>> = {
  default: [
    $container,
    ({ colors }) => ({
      backgroundColor: colors.palette.neutral100,
    }),
  ],
  filled: [
    $container,
    ({ colors, isDark }) => ({
      backgroundColor: isDark ? colors.palette.neutral300 : colors.palette.neutral100,
    }),
  ],
}

const $pressedViewPresets: Record<Presets, ThemedStyle<ViewStyle>> = {
  default: ({ colors }) => ({
    backgroundColor: colors.palette.neutral800,
    transform: [{ scale: 0.98 }],
  }),
  filled: ({ colors, isDark }) => ({
    backgroundColor: isDark ? colors.palette.neutral500 : colors.palette.neutral100,
    borderWidth: isDark ? 0 : 2,
    borderColor: isDark ? "transparent" : colors.palette.primaryBlue,
  }),
}
