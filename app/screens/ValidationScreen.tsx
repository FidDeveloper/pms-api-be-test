import type { FC } from "react"
import { useRef, useState } from "react"
import {
  Dimensions,
  FlatList,
  TextStyle,
  View,
  ViewStyle,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native"

import { AuthFormLayout } from "@/components/AuthFormLayout"
import { Button } from "@/components/Button"
import { Text } from "@/components/Text"
import { ValidationField } from "@/components/ValidationField"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { colors } from "@/theme/colors"
import { useAppTheme } from "@/theme/context"
import { spacing } from "@/theme/spacing"
import type { ThemedStyle } from "@/theme/types"

interface ValidationScreenProps extends AppStackScreenProps<"Validation"> {}

export const ValidationScreen: FC<ValidationScreenProps> = function ValidationScreen(props) {
  const headerImage = require("@assets/images/boarding-image2.png")

  const { navigation } = props

  const [code, setCode] = useState("")

  const {
    themed,
    theme: { colors: _themeColors },
  } = useAppTheme()

  const _data = [
    { id: "1", title: "boardingScreen:title1", description: "boardingScreen:description1" },
    { id: "2", title: "boardingScreen:title2", description: "boardingScreen:description2" },
    { id: "3", title: "boardingScreen:title3", description: "boardingScreen:description3" },
  ]

  const [_index, setIndex] = useState(0)
  const flatListRef = useRef<FlatList>(null)

  const windowWidth = Dimensions.get("window").width

  function _goNext() {
    navigation.navigate("Login")
  }

  function _onScroll(e: NativeSyntheticEvent<NativeScrollEvent>) {
    const slideIndex = Math.round(e.nativeEvent.contentOffset.x / windowWidth)
    setIndex(slideIndex)
  }

  function _onDotPress(i: number) {
    flatListRef.current?.scrollToIndex({ index: i, animated: true })
  }

  return (
    <AuthFormLayout imageSource={headerImage} fillScreen imageHeight={380} inputIcon="check">
      {/* CARD */}
      <View style={themed($formCard)}>
        <Text preset="heading" tx="ValidationScreen:title" style={themed($headingText)} />
        <Text preset="subheading" tx="ValidationScreen:subtitle" style={themed($subheadingText)} />

        <ValidationField value={code} onChange={setCode} />
        <Button
          testID="login-button"
          tx="ValidationScreen:button"
          style={[themed($tapButton), themed($primaryButton)]}
          textStyle={themed($primaryButtonText)}
          preset="reversed"
          //onPress={login}
        />

        <View style={themed($linkContainer)}>
          <Text tx="ValidationScreen:link1" style={themed($subheadingText)} />
          <Text
            tx="ValidationScreen:link2"
            style={themed($linkText)}
            onPress={() => navigation.navigate("Login")}
          />
        </View>
      </View>
    </AuthFormLayout>
  )
}

/* ================= STYLES ================= */
const $linkContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: 1,
}

const $formCard: ViewStyle = {
  padding: spacing.md,
  flexGrow: 1,
  marginTop: spacing.xxs,
  borderTopLeftRadius: spacing.lg,
  borderTopRightRadius: spacing.lg,
  backgroundColor: colors.palette.neutral100,
}

const $headingText: TextStyle = {
  textAlign: "center",
  color: colors.textPrimary,
}

const $subheadingText: TextStyle = {
  textAlign: "center",
  color: colors.textSecondary,
  marginHorizontal: spacing.md,
  marginVertical: spacing.md,
  fontSize: 16,
}

const $linkText: TextStyle = {
  textAlign: "center",
  color: "blue",
}

const _$textFieldInputWrapper: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.neutral100,
  borderColor: colors.borderSecondaryBlue,
  borderWidth: 1,
  borderRadius: 12,
  paddingVertical: 6,
})

const _$textFieldInputText: ThemedStyle<TextStyle> = ({ colors }) => ({
  fontSize: 16,
  color: colors.textSecondary,
})

const _$passwordFieldContainer: ViewStyle = {
  marginBottom: spacing.md,
}

/* BUTTON */
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
