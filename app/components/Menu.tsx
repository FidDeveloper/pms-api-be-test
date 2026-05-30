import { Pressable, StyleProp, ViewStyle, PressableStateCallbackType } from "react-native"
import { TouchableOpacityProps } from "react-native"
import { ImageStyle, TextStyle } from "react-native"
import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"

import { isRTL, TxKeyPath } from "@/i18n"
import { colors } from "@/theme/colors"
import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"
import { ThemedStyleArray } from "@/theme/types"

import { IconTypes, PressableIcon } from "./Icon"
import { Text } from "./Text"

type Presets = "default" | "filled" | "reversed"

export interface MenuProps {
  pressedStyle: StyleProp<ViewStyle>
  style: StyleProp<ViewStyle>
  image?: string
  onPress?: TouchableOpacityProps["onPress"]
  menuName?: string
  preset: Presets
  icons?: IconTypes
  tx?: TxKeyPath
  fontAwesome?: boolean
  fontAwesomeIcon?: IconProp
}

export function Menu(_props: MenuProps) {
  const {
    style: $styleOverride,
    pressedStyle: _$pressedStyleOverride,
    menuName,
    onPress: _onPress,
    preset: _preset,
    icons,
    tx,
    fontAwesome = false,
    fontAwesomeIcon,
  } = _props

  const {
    themed,
    theme: { colors: themeColors },
  } = useAppTheme()

  const presets: Presets = _props.preset ?? "default"

  function $viewStyle({ pressed }: PressableStateCallbackType): StyleProp<ViewStyle> {
    return [
      themed($viewPresets[presets]),
      $styleOverride,
      !!pressed && themed([$pressedViewPresets[presets]]),
    ]
  }

  return (
    <Pressable onPress={_onPress} style={$viewStyle}>
      {fontAwesomeIcon ? (
        <FontAwesomeIcon icon={fontAwesomeIcon} size={24} color={themeColors.text} />
      ) : null}
      {!fontAwesomeIcon && !fontAwesome && icons && (
        <PressableIcon
          size={24}
          icon={icons}
          color={themeColors.text}
          // onPress={onPress}
          containerStyle={themed([$symbol])}
          style={isRTL ? { transform: [{ rotate: "180deg" }] } : {}}
        />
      )}
      <Text text={menuName} tx={tx} style={$text} />
    </Pressable>
  )
}

const $symbol: ThemedStyle<ImageStyle> = () => ({})

const $text: TextStyle = {
  color: colors.textSecondary,
}

const $viewPresets: Record<Presets, ThemedStyleArray<ViewStyle>> = {
  default: [
    ({ colors }) => ({
      backgroundColor: colors.palette.neutral100,
    }),
  ],
  filled: [({ colors }) => ({ backgroundColor: colors.palette.neutral300 })],
  reversed: [({ colors }) => ({ backgroundColor: colors.palette.neutral800 })],
}

const $pressedViewPresets: Record<Presets, ThemedStyle<ViewStyle>> = {
  default: ({ colors }) => ({ backgroundColor: colors.palette.neutral900 }),
  filled: ({ colors }) => ({ backgroundColor: colors.palette.neutral400 }),
  reversed: ({ colors }) => ({ backgroundColor: colors.palette.neutral700 }),
}
