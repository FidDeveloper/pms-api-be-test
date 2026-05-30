import { FC } from "react"
import { View, ViewStyle, Dimensions } from "react-native"
import { Image } from "react-native"
import { ImageStyle, TextStyle } from "react-native"

import { DashboardLayout } from "@/components/DashboardLayout"
import { SwipeField } from "@/components/SwipeField"
import { Text } from "@/components/Text"
import { UserProfileHeader } from "@/components/UserProfileHeader"
import { AppStackScreenProps } from "@/navigators/navigationTypes"
import { colors } from "@/theme/colors"
import { useAppTheme } from "@/theme/context"
import { spacing } from "@/theme/spacing"
import { ThemedStyle } from "@/theme/types"

interface DashboardScreenProps extends AppStackScreenProps<"Dashboard"> {}

// 🔥 carousel sizing
const _ITEM_WIDTH = Dimensions.get("screen").width * 0.6
const _SPACING = 12

export const DashboardScreen: FC<DashboardScreenProps> = function DashboardScreen(props) {
  const { navigation } = props

  const headerImage = require("@assets/images/boarding-image2.png")

  const {
    themed,
    theme: { colors },
  } = useAppTheme()

  return (
    <DashboardLayout>
      <UserProfileHeader
        leftIcon="user"
        backgroundColor={colors.palette.neutral100}
        rightIcons={["user", "menu"]}
      />
      <View style={[$formCard, { backgroundColor: colors.palette.neutral100 }]}>
        <View style={$imageHeaderContainer}>
          <Image source={headerImage} style={$imageHeader} resizeMode="cover" />
        </View>
        <Text tx="DashboardScreen:content" style={$subheadingText} />
      </View>
      <View style={themed($swipeFieldContainer)}>
        <SwipeField
          onSwipeRight={() => {
            navigation.navigate("AddPet")
          }}
        />
      </View>
    </DashboardLayout>
  )
}

const _$container: ViewStyle = {
  flexGrow: 1,
}

const $formCard: ViewStyle = {
  padding: spacing.lg,
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
}

const $imageHeader: ImageStyle = {
  width: "100%",
  height: "100%",
}

const $imageHeaderContainer: ViewStyle = {
  height: "38%",
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
}

const $subheadingText: TextStyle = {
  textAlign: "center",
  color: colors.textSecondary,
  marginHorizontal: spacing.md,
  marginVertical: spacing.md,
  fontSize: 16,
}

const _$existText: TextStyle = {
  color: colors.palette.neutral800,
  marginHorizontal: spacing.md,
  marginVertical: spacing.md,
  fontSize: 16,
  padding: 10,
}

const _$roundText: ViewStyle = {
  backgroundColor: colors.palette.neutral400,
  borderRadius: 20,
}

const _$rowContainer: ViewStyle = {
  flexDirection: "row",
  marginBottom: 40,
}

const _$gridItem: ViewStyle = {
  width: "48%",
  marginBottom: 16,
}

const _$marginBottom: ViewStyle = {
  marginBottom: 40,
}

const $swipeFieldContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  padding: spacing.lg,
  backgroundColor: colors.palette.neutral100,
  borderTopLeftRadius: spacing.lg,
  borderTopRightRadius: spacing.lg,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: -4 },
  shadowOpacity: 0.08,
  shadowRadius: 10,
  elevation: 10,
})
