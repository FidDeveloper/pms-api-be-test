import { FC, ReactNode } from "react"
import { Image, ImageSourcePropType, ImageStyle, StyleProp, View, ViewStyle } from "react-native"

import { Icon, IconTypes } from "@/components/Icon"
import { Screen } from "@/components/Screen"
import { useAppTheme } from "@/theme/context"
import { spacing } from "@/theme/spacing"

interface AuthFormLayoutProps {
  imageSource: ImageSourcePropType
  children: ReactNode
  formCardStyle?: StyleProp<ViewStyle>
  imageHeight?: number
  fillScreen?: boolean
  inputIcon?: IconTypes
}

export const AuthFormLayout: FC<AuthFormLayoutProps> = ({
  imageSource,
  children,
  formCardStyle,
  imageHeight = 260,
  fillScreen = false,
  inputIcon = "user",
}) => {
  const {
    theme: { colors },
  } = useAppTheme()

  return (
    <Screen
      preset="scroll"
      contentContainerStyle={[fillScreen ? $containerFill : $container]}
      safeAreaEdges={["top"]}
      backgroundColor={colors.background}
      keyboardBottomOffset={spacing.xl}
    >
      <View style={[$imageHeaderContainer, { height: imageHeight }]}>
        <Image source={imageSource} style={$imageHeader} resizeMode="cover" />

        <View style={[$profileIconContainer, { backgroundColor: colors.palette.neutral100 }]}>
          <View style={[$profileIconContainerInside, { borderColor: colors.borderSecondaryBlue }]}>
            <Icon icon={inputIcon} size={32} color={colors.textBlue} />
          </View>
        </View>
      </View>

      <View
        style={[
          $formCard,
          fillScreen && $formCardFill,
          { backgroundColor: colors.palette.neutral100 },
          formCardStyle,
        ]}
      >
        {children}
      </View>
    </Screen>
  )
}

const $container: ViewStyle = {}

const $containerFill: ViewStyle = {
  flexGrow: 1,
}

const $imageHeaderContainer: ViewStyle = {
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
}

const $imageHeader: ImageStyle = {
  width: "100%",
  height: "100%",
}

const $profileIconContainer: ViewStyle = {
  position: "absolute",
  bottom: -40,
  width: 80,
  height: 80,
  borderRadius: 40,
  justifyContent: "center",
  alignItems: "center",
  zIndex: 10,
}

const $profileIconContainerInside: ViewStyle = {
  width: 60,
  height: 60,
  borderRadius: 40,
  backgroundColor: "white",
  justifyContent: "center",
  alignItems: "center",
  borderWidth: 1,
}

const $formCard: ViewStyle = {
  padding: spacing.lg,
  borderTopLeftRadius: spacing.lg,
  borderTopRightRadius: spacing.lg,
  paddingTop: 50,
}

const $formCardFill: ViewStyle = {
  flexGrow: 1,
}
