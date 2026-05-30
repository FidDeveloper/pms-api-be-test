import { useState } from "react"
import { Image, TextStyle, View } from "react-native"
import { ViewStyle, StyleProp, ImageStyle, TouchableOpacityProps } from "react-native"
import Animated, { FadeIn, FadeOut } from "react-native-reanimated"

import { isRTL } from "@/i18n"
import { colors } from "@/theme/colors"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import { ThemedStyle } from "@/theme/types"
import { useSafeAreaInsetsStyle } from "@/utils/useSafeAreaInsetsStyle"
import { ExtendedEdge } from "@/utils/useSafeAreaInsetsStyle"

import { IconTypes } from "./Icon"
import { PressableIcon } from "./Icon"
import { Text } from "./Text"
import { NavigationRoute } from "../navigators/AppNavigation"

export interface HeaderProp {
  backgroundColor?: string
  containerStyle?: StyleProp<ViewStyle>
  style?: StyleProp<ViewStyle>
  leftIcon?: IconTypes
  rightIcons: IconTypes[]
  safeAreaEdges?: ExtendedEdge[]
  onPress?: TouchableOpacityProps["onPress"]
}

export function UserProfileHeader(props: HeaderProp) {
  const {
    containerStyle: $containerStyleOverride,
    style: $styleOverride,
    rightIcons,
    safeAreaEdges,
  } = props

  const {
    theme: { colors },
    themed,
  } = useAppTheme()

  const $containerInsets = useSafeAreaInsetsStyle(safeAreaEdges)

  const [isNavOpen, setIsNavOpen] = useState(false)

  return (
    <View style={[$container, $containerInsets, $containerStyleOverride, $containerCenter]}>
      <View style={[themed($containerBg), $containerPadding]}>
        <View style={[$styles.row, $wrapper, $styleOverride]}>
          <View style={[$rowFlexDirection, $rowCenter]}>
            <Image source={{ uri: "https://i.pravatar.cc/150" }} style={themed($avatar)} />

            <View>
              <Text text="Hello" style={$textStyle} />
              <Text text="Danial" style={$textStyle} />
            </View>
          </View>
          <View style={$rowDirection}>
            {!isNavOpen ? (
              rightIcons.map((iconName, index) => (
                <View key={index} style={$iconContainer}>
                  <PressableIcon
                    size={24}
                    icon={iconName}
                    color={colors.palette.neutral900}
                    onPress={() => {
                      if (iconName === "menu") {
                        setIsNavOpen(true)
                      }
                    }}
                    containerStyle={themed([$actionIconContainer])}
                    style={isRTL ? { transform: [{ rotate: "180deg" }] } : {}}
                  />
                </View>
              ))
            ) : (
              <View style={$iconContainer}>
                <PressableIcon
                  size={24}
                  icon="x"
                  color={colors.palette.neutral900}
                  // onPress={onPress}
                  onPress={() => setIsNavOpen(false)}
                  containerStyle={themed([$actionIconContainer])}
                  style={isRTL ? { transform: [{ rotate: "180deg" }] } : {}}
                />
              </View>
            )}
          </View>
        </View>
      </View>
      {/* <View style={{alignItems: 'center'}}>
                <View
                    style={{height: 1, backgroundColor: colors.palette.neutral300, width: '80%', marginTop: 10}}
                />
            </View> */}
      {isNavOpen && (
        <Animated.View
          entering={FadeIn.duration(300)}
          exiting={FadeOut.duration(150)}
          style={$navigationRoute}
        >
          <NavigationRoute />
        </Animated.View>
      )}
    </View>
  )
}

const $wrapper: ViewStyle = {
  height: 56,
  alignItems: "center",
  justifyContent: "space-between",
  marginHorizontal: 20,
}

const $container: ViewStyle = {
  width: "100%",
}

const $actionIconContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexGrow: 0,
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  paddingHorizontal: spacing.md,
  zIndex: 2,
})

const $textStyle: TextStyle = {
  color: colors.textSecondary,
}

const $rowFlexDirection: ViewStyle = {
  flexDirection: "row",
}

const $containerCenter: ViewStyle = {
  justifyContent: "center",
}

const $containerBg: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.neutral100,
})

const $containerPadding: ViewStyle = {
  paddingVertical: 10,
}

const $rowCenter: ViewStyle = {
  alignItems: "center",
}

const $rowDirection: ViewStyle = {
  flexDirection: "row",
}

const $navigationRoute: ViewStyle = {
  position: "absolute",
  width: "100%",
  zIndex: 100,
}

const $avatar: ThemedStyle<ImageStyle> = () => ({
  width: 56,
  height: 56,
  borderRadius: 28,
  marginRight: 12,
})

const $iconContainer: ViewStyle = {}
