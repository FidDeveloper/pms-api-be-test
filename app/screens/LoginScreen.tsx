import { ComponentType, FC, useMemo, useRef, useState } from "react"
// eslint-disable-next-line no-restricted-imports
import { TextInput, TextStyle, View, ViewStyle } from "react-native"

import { AuthFormLayout } from "@/components/AuthFormLayout"
import { Button } from "@/components/Button"
import { PressableIcon } from "@/components/Icon"
import { Text } from "@/components/Text"
import { TextField, type TextFieldAccessoryProps } from "@/components/TextField"
import { useAuth } from "@/context/AuthContext"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { login as loginApi } from "@/services/api/auth.svc"
import { ApiError } from "@/services/api/http"
import { useAppTheme } from "@/theme/context"
import { spacing } from "@/theme/spacing"
import type { ThemedStyle } from "@/theme/types"

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

export const LoginScreen: FC<LoginScreenProps> = () => {
  const authPasswordInput = useRef<TextInput>(null)
  const headerImage = require("@assets/images/boarding-image2.png")

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isPasswordHidden, setIsPasswordHidden] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState("")

  const { setAuthToken } = useAuth()

  const {
    themed,
    theme: { colors: themeColors },
  } = useAppTheme()

  const usernameError = username.trim().length === 0 ? "Username is required" : ""
  const passwordError = password.length === 0 ? "Password is required" : ""

  const handleLogin = async () => {
    setApiError("")

    if (usernameError || passwordError) return

    setIsLoading(true)
    try {
      const result = await loginApi({ username: username.trim(), password })
      // Keep AuthContext in sync so the navigator's isAuthenticated check fires
      setAuthToken(result.accessToken)
    } catch (err) {
      if (err instanceof ApiError) {
        setApiError(err.message)
      } else {
        setApiError("An unexpected error occurred. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const PasswordRightAccessory: ComponentType<TextFieldAccessoryProps> = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <PressableIcon
            icon={isPasswordHidden ? "view" : "hidden"}
            color={themeColors.palette.neutral800}
            containerStyle={props.style}
            size={20}
            onPress={() => setIsPasswordHidden(!isPasswordHidden)}
          />
        )
      },
    [isPasswordHidden, themeColors.palette.neutral800],
  )

  return (
    <AuthFormLayout imageSource={headerImage} fillScreen imageHeight={340}>
      <View style={themed($formContent)}>
        <Text preset="heading" tx="loginAccount:heading" style={themed($headingText)} />
        <Text preset="subheading" tx="loginAccount:subheading" style={themed($subheadingText)} />

        {!!apiError && <Text text={apiError} size="sm" weight="light" style={themed($apiError)} />}

        <TextField
          value={username}
          onChangeText={setUsername}
          containerStyle={[themed($textField), $emailFieldContainer]}
          autoCapitalize="none"
          autoComplete="username"
          autoCorrect={false}
          placeholder="Enter your username"
          onSubmitEditing={() => authPasswordInput.current?.focus()}
          inputWrapperStyle={themed($textFieldInputWrapper)}
          style={themed($textFieldInputText)}
        />

        <TextField
          ref={authPasswordInput}
          value={password}
          onChangeText={setPassword}
          containerStyle={[themed($textField), $passwordFieldContainer]}
          autoCapitalize="none"
          autoComplete="password"
          autoCorrect={false}
          secureTextEntry={isPasswordHidden}
          placeholderTx="loginScreen:passwordFieldPlaceholder"
          onSubmitEditing={handleLogin}
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
        onPress={handleLogin}
        disabled={isLoading}
      />
    </AuthFormLayout>
  )
}

// const $screenContentContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
//   paddingVertical: spacing.xxl,
//   paddingHorizontal: spacing.lg,
// })

const $apiError: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.error,
  marginBottom: spacing.sm,
  textAlign: "center",
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
