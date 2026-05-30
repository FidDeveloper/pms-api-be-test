import { ComponentType, FC, useEffect, useMemo, useRef, useState } from "react"
// eslint-disable-next-line no-restricted-imports
import { TextInput, TextStyle, View, ViewStyle } from "react-native"

import { AuthFormLayout } from "@/components/AuthFormLayout"
import { Button } from "@/components/Button"
import { PressableIcon } from "@/components/Icon"
import { Text } from "@/components/Text"
import { TextField, type TextFieldAccessoryProps } from "@/components/TextField"
import { useAuth } from "@/context/AuthContext"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { useAppTheme } from "@/theme/context"
import { spacing } from "@/theme/spacing"
import type { ThemedStyle } from "@/theme/types"

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

export const LoginScreen: FC<LoginScreenProps> = () => {
  const authPasswordInput = useRef<TextInput>(null)
  const headerImage = require("@assets/images/boarding-image2.png")

  const [authPassword, setAuthPassword] = useState("")
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [attemptsCount, setAttemptsCount] = useState(0)
  const { authEmail, setAuthEmail, setAuthToken, validationError } = useAuth()

  const {
    themed,
    theme: { colors: themeColors },
  } = useAppTheme()

  useEffect(() => {
    // Here is where you could fetch credentials from keychain or storage
    // and pre-fill the form fields.
    setAuthEmail("ignite@infinite.red")
    setAuthPassword("ign1teIsAwes0m3")
  }, [setAuthEmail])

  const error = isSubmitted ? validationError : ""

  function login() {
    setIsSubmitted(true)
    setAttemptsCount(attemptsCount + 1)

    if (validationError) return

    // Make a request to your server to get an authentication token.
    // If successful, reset the fields and set the token.
    setIsSubmitted(false)
    setAuthPassword("")
    setAuthEmail("")

    // We'll mock this with a fake token.
    setAuthToken(String(Date.now()))
  }

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
    <AuthFormLayout imageSource={headerImage} fillScreen imageHeight={340}>
      <View style={themed($formContent)}>
        {/* <Text testID="login-heading" tx="loginScreen:logIn" preset="heading" style={themed($logIn)} />
        <Text tx="loginScreen:enterDetails" preset="subheading" style={themed($enterDetails)} /> */}
        <Text preset="heading" tx="loginAccount:heading" style={themed($headingText)} />
        <Text preset="subheading" tx="loginAccount:subheading" style={themed($subheadingText)} />
        {attemptsCount > 2 && (
          <Text tx="loginScreen:hint" size="sm" weight="light" style={themed($hint)} />
        )}

        <TextField
          value={authEmail}
          onChangeText={setAuthEmail}
          containerStyle={[themed($textField), $emailFieldContainer]}
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          keyboardType="email-address"
          // labelTx="loginAccount:emailLabel"
          placeholderTx="loginAccount:emailPlaceholder"
          helper={error}
          status={error ? "error" : undefined}
          onSubmitEditing={() => authPasswordInput.current?.focus()}
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
          // labelTx="loginScreen:passwordFieldLabel"
          placeholderTx="loginScreen:passwordFieldPlaceholder"
          onSubmitEditing={login}
          RightAccessory={PasswordRightAccessory}
          inputWrapperStyle={themed($textFieldInputWrapper)}
          placeholderTextColor={themeColors.textSecondary}
          style={themed($textFieldInputText)}
        />
      </View>

      <Button
        testID="login-button"
        tx="loginAccount:loginButton"
        style={[themed($tapButton), themed($primaryButton), $bottomButton]}
        textStyle={themed($primaryButtonText)}
        preset="reversed"
        onPress={login}
      />
    </AuthFormLayout>
  )
}

// const $screenContentContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
//   paddingVertical: spacing.xxl,
//   paddingHorizontal: spacing.lg,
// })

const $hint: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.tint,
  marginBottom: spacing.md,
})

const $emailFieldContainer: ViewStyle = {
  marginTop: spacing.md,
  marginBottom: spacing.md,
}

const $passwordFieldContainer: ViewStyle = {
  marginBottom: spacing.md,
}

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

const $primaryButton: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.primaryBlue,
  borderColor: colors.palette.primaryBlue,
  borderWidth: 1,
  borderRadius: 12,
  paddingVertical: 12,
})

const $primaryButtonText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.neutral100,
  fontSize: 16,
  fontWeight: "600",
})

const $textField: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  // marginBottom: spacing.lg,
  marginBottom: spacing.xs,
})

const $tapButton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.lg,
  marginBottom: spacing.md,
})

const $bottomButton: ViewStyle = {
  marginTop: "auto",
}

const $formContent: ThemedStyle<ViewStyle> = () => ({
  flexGrow: 1,
})

const $headingText: ThemedStyle<TextStyle> = ({ colors }) => ({
  textAlign: "center",
  color: colors.textPrimary,
  // ...spacing.margin.marginNone,
})

const $subheadingText: ThemedStyle<TextStyle> = ({ colors }) => ({
  textAlign: "center",
  // color: colors.textDim, // A softer secondary text color
  color: colors.textSecondary, // A softer secondary text color
  marginHorizontal: spacing.md,
  marginVertical: spacing.md,
  fontSize: 16,
})
