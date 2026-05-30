import { FC, useRef, useState, ComponentType, useMemo } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
// eslint-disable-next-line no-restricted-imports
import type { TextInput } from "react-native"

import { Button } from "@/components/Button"
import { Icon, PressableIcon } from "@/components/Icon"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { TextField, type TextFieldAccessoryProps } from "@/components/TextField"
import { Checkbox } from "@/components/Toggle/Checkbox"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { colors } from "@/theme/colors"
import { useAppTheme } from "@/theme/context"
import { spacing } from "@/theme/spacing"
import type { ThemedStyle } from "@/theme/types"

interface SignupScreenProps extends AppStackScreenProps<"Signup"> {}

export const SignupScreen: FC<SignupScreenProps> = function SignupScreen(props) {
  const [authEmail, setAuthEmail] = useState("")
  const [authPassword, setAuthPassword] = useState("")
  const [checked, setChecked] = useState(false)
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const authPasswordInput = useRef<TextInput>(null)

  const headerImage = require("@assets/images/boarding-image2.png")

  const { navigation } = props

  const {
    themed,
    theme: { colors: themeColors },
  } = useAppTheme()

  const PasswordRightAccessory: ComponentType<TextFieldAccessoryProps> = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <PressableIcon
            icon={isAuthPasswordHidden ? "view" : "hidden"}
            color={themeColors.palette.neutral800}
            containerStyle={props.style}
            size={20}
            onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
          />
        )
      },
    [isAuthPasswordHidden, themeColors.palette.neutral800],
  )

  return (
    <Screen
      preset="scroll"
      contentContainerStyle={$container}
      safeAreaEdges={["top"]}
      backgroundColor={themeColors.background}
      keyboardOffset={spacing.xl}
    >
      {/* HEADER */}
      <View style={$imageHeaderContainer}>
        <Image source={headerImage} style={$imageHeader} resizeMode="cover" />

        <View style={$profileIconContainer}>
          <View style={$profileIconContainerInside}>
            <Icon icon="user" size={32} color={colors.textBlue} />
          </View>
        </View>
      </View>

      {/* FORM CARD */}
      <View style={themed($formCard)}>
        <Text preset="heading" tx="SignupScreen:title" style={themed($headingText)} />
        <Text preset="heading" tx="SignupScreen:subtitle" style={themed($subheadingText)} />

        <TextField
          value={authEmail}
          onChangeText={setAuthEmail}
          containerStyle={[themed($textField), $emailFieldContainer]}
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          keyboardType="email-address"
          placeholderTx="loginAccount:emailPlaceholder"
          inputWrapperStyle={themed($textFieldInputWrapper)}
          style={themed($textFieldInputText)}
        />

        <TextField
          ref={authPasswordInput}
          value={authPassword}
          onChangeText={setAuthPassword}
          containerStyle={[themed($textField), $passwordFieldContainer]}
          autoCapitalize="none"
          autoComplete="password"
          autoCorrect={false}
          secureTextEntry={isAuthPasswordHidden}
          placeholderTx="loginScreen:passwordFieldPlaceholder"
          RightAccessory={PasswordRightAccessory}
          inputWrapperStyle={themed($textFieldInputWrapper)}
          placeholderTextColor={themeColors.textSecondary}
          style={themed($textFieldInputText)}
        />

        <View style={themed($checkboxContainer)}>
          <Checkbox value={checked} onValueChange={setChecked} icon="check" />
          <Text tx="SignupScreen:Checkbox" style={themed($subheadingText)} />
        </View>

        <Button
          testID="login-button"
          tx="SignupScreen:button"
          style={[themed($tapButton), themed($primaryButton)]}
          textStyle={themed($primaryButtonText)}
          preset="reversed"
          onPress={() => navigation.navigate("Validation")}
        />

        <View style={themed($linkContainer)}>
          <Text text="Already have account?" style={themed($subheadingText)} />
          <Text
            text="Login"
            style={themed($linkText)}
            onPress={() => navigation.navigate("Login")}
          />
        </View>
      </View>
    </Screen>
  )
}

/* ================= STYLES ================= */

const $container: ViewStyle = {}

/* ✅ FIXED HEADER */
const $imageHeaderContainer: ViewStyle = {
  height: 260, // 🔥 FIXED
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
}

const $imageHeader: ImageStyle = {
  width: "100%",
  height: "100%", // 🔥 FIXED
}

const $profileIconContainer: ViewStyle = {
  position: "absolute",
  bottom: -40,
  width: 80,
  height: 80,
  borderRadius: 40,
  backgroundColor: colors.palette.neutral100,
  justifyContent: "center",
  alignItems: "center",
  zIndex: 10,
}

const $profileIconContainerInside: ViewStyle = {
  width: 60,
  height: 60,
  borderRadius: 40,
  backgroundColor: colors.palette.neutral100,
  justifyContent: "center",
  alignItems: "center",
  borderWidth: 1,
  borderColor: colors.borderSecondaryBlue,
}

const $formCard: ThemedStyle<ViewStyle> = ({ colors }) => ({
  padding: spacing.lg,
  borderTopLeftRadius: spacing.lg,
  borderTopRightRadius: spacing.lg,
  backgroundColor: colors.palette.neutral100,
  paddingTop: 50,
})

const $textField: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.xs,
})

const $emailFieldContainer: ViewStyle = {
  marginTop: spacing.md,
  marginBottom: spacing.md,
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
  color: "blue",
}

const $linkContainer: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: 4,
})

const $checkboxContainer: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
  alignItems: "center",
  gap: 6,
})

const $textFieldInputWrapper: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.neutral100,
  borderColor: colors.borderSecondaryBlue,
  borderWidth: 1,
  borderRadius: 12,
  paddingVertical: 6,
})

const $textFieldInputText: ThemedStyle<TextStyle> = ({ colors }) => ({
  fontSize: 16,
  color: colors.textSecondary,
})

const $passwordFieldContainer: ViewStyle = {
  marginBottom: spacing.md,
}

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
