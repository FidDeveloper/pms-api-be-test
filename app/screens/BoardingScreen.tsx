import { FC, useRef, useState } from "react"
import { Dimensions, Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { useSharedValue } from "react-native-reanimated"
import Carousel, { ICarouselInstance, Pagination } from "react-native-reanimated-carousel"

import { Button } from "@/components/Button"
import { Icon } from "@/components/Icon"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { colors } from "@/theme/colors"
import { useAppTheme } from "@/theme/context"
import { spacing } from "@/theme/spacing"
import type { ThemedStyle } from "@/theme/types"

interface BoardingScreenProps extends AppStackScreenProps<"Boarding"> {}

export const BoardingScreen: FC<BoardingScreenProps> = function BoardingScreen(_props) {
  const { themed } = useAppTheme()
  const headerImage = require("@assets/images/boarding-image2.png")
  const [contentHeight, setContentHeight] = useState(280)

  const windowWidth = Dimensions.get("window").width - 40 // Account for horizontal padding
  const ref = useRef<ICarouselInstance>(null)
  const progress = useSharedValue<number>(0)
  const data = [
    { id: 1, title: "boardingScreen:title1", description: "boardingScreen:description1" },
    { id: 2, title: "boardingScreen:title2", description: "boardingScreen:description2" },
    { id: 3, title: "boardingScreen:title3", description: "boardingScreen:description3" },
  ]

  const { navigation } = _props

  function goNext() {
    navigation.navigate("Login")
  }

  function goSignUp() {
    navigation.navigate("Signup")
  }

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      // Calculate the difference between the current index and the target index
      // to ensure that the carousel scrolls to the nearest index
      count: index - progress.value,
      animated: true,
    })
  }

  const handleContentLayout = (event: any) => {
    const { height } = event.nativeEvent.layout
    setContentHeight(height)
  }

  return (
    <Screen
      preset="scroll"
      contentContainerStyle={$container}
      safeAreaEdges={["top"]}
      backgroundColor={colors.background}
      keyboardBottomOffset={spacing.xl}
    >
      <View style={$imageHeaderContainer}>
        <Image source={headerImage} style={$imageHeader} resizeMode="cover" />
        <View style={$profileIconContainer}>
          <View style={$profileIconContainerInside}>
            <Icon icon="edit" size={32} color={colors.textBlue} />
          </View>
        </View>
      </View>

      <View style={$formCard}>
        <Pagination.Basic
          progress={progress}
          data={data}
          dotStyle={$paginationDot as any}
          activeDotStyle={$paginationActiveDot as any}
          containerStyle={$paginationContainer}
          onPress={onPressPagination}
        />
        <Carousel
          ref={ref}
          width={windowWidth}
          height={contentHeight}
          data={data}
          onProgressChange={progress}
          renderItem={({ index }) => (
            <View style={$carouselItem} onLayout={handleContentLayout}>
              <Text preset="heading" tx={data[index].title as any} style={$headingText} />
              <Text
                preset="subheading"
                tx={data[index].description as any}
                style={$subheadingText}
              />
            </View>
          )}
        />

        <Button
          testID="login-button"
          tx="boardingScreen:getStartedButton"
          style={[themed($tapButton), $primaryButton]}
          textStyle={$primaryButtonText}
          preset="reversed"
          onPress={goSignUp}
        />
        <Text
          tx="boardingScreen:skipSignUp"
          size="sm"
          weight="light"
          style={themed($skipSignUpText)}
          onPress={goNext}
        />
      </View>
    </Screen>
  )
}

const $carouselItem: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  // paddingHorizontal: spacing.xxl,
}

const $paginationDot: ViewStyle = {
  width: 24,
  height: 4,
  borderRadius: 2,
  backgroundColor: colors.palette.accentGray,
}

const $paginationActiveDot: ViewStyle = {
  width: 24,
  height: 4,
  borderRadius: 2,
  backgroundColor: colors.palette.accentYellow,
}

const $paginationContainer: ViewStyle = {
  gap: 5,
  marginTop: 10,
}

const $skipSignUpText: ThemedStyle<TextStyle> = ({ colors }) => ({
  textAlign: "center",
  color: colors.textSecondary,
})

const $primaryButton: ViewStyle = {
  backgroundColor: colors.palette.primaryBlue,
  borderColor: colors.palette.primaryBlue,
  borderWidth: 1,
  borderRadius: 12,
  paddingVertical: 12,
}

const $primaryButtonText: TextStyle = {
  color: colors.palette.neutral100,
  fontSize: 16,
  fontWeight: "600",
}

const $tapButton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.lg,
  marginBottom: spacing.md,
})

const $container: ViewStyle = {
  flexGrow: 1,
}

const $imageHeaderContainer: ViewStyle = {
  height: "38%", // Adjust based on your image aspect ratio
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
}

const $imageHeader: ImageStyle = {
  width: "100%",
  height: "120%",
}

const $profileIconContainerInside: ViewStyle = {
  position: "absolute",
  bottom: 10, // Half the icon height to overlap the card
  width: 60,
  height: 60,
  borderRadius: 40,
  backgroundColor: colors.palette.neutral100, // Should match card background
  justifyContent: "center",
  alignItems: "center",
  zIndex: 10,
  borderWidth: 1,
  borderColor: colors.borderSecondaryBlue, // Matching input border
}
const $profileIconContainer: ViewStyle = {
  position: "absolute",
  bottom: -40, // Half the icon height to overlap the card
  width: 80,
  height: 80,
  borderRadius: 40,
  backgroundColor: colors.palette.neutral100, // Should match card background
  justifyContent: "center",
  alignItems: "center",
  zIndex: 10,
}

const $formCard: ViewStyle = {
  padding: spacing.lg,
  flexGrow: 1,
  marginTop: spacing.sm, // Initial push down before overlap
  borderTopLeftRadius: spacing.lg,
  borderTopRightRadius: spacing.lg,
  backgroundColor: colors.palette.neutral100, // Standard White Card
  justifyContent: "flex-start",
  paddingTop: 40, // Space for the icon that overlaps
  zIndex: 5,
}

const $headingText: TextStyle = {
  textAlign: "center",
  color: colors.textPrimary,
  // ...spacing.margin.marginNone,
}

const $subheadingText: TextStyle = {
  textAlign: "center",
  // color: colors.textDim, // A softer secondary text color
  color: colors.textSecondary, // A softer secondary text color
  marginHorizontal: spacing.md,
  marginVertical: spacing.md,
  fontSize: 16,
}
