import { ComponentType, FC, useEffect, useMemo, useRef, useState } from "react"
// eslint-disable-next-line no-restricted-imports
import { TextInput, TextStyle, View, ViewStyle, Image, ImageStyle } from "react-native"

import { Button } from "@/components/Button"
import { Icon, PressableIcon } from "@/components/Icon"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { TextField, type TextFieldAccessoryProps } from "@/components/TextField"
import { useAuth } from "@/context/AuthContext"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { colors } from "@/theme/colors"
import { useAppTheme } from "@/theme/context"
import { spacing } from "@/theme/spacing"

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

export const LoginScreen: FC<LoginScreenProps> = () => {
  const authPasswordInput = useRef<TextInput>(null)
  const headerImage = require("@assets/images/welcome-face.png")

  const [authPassword, setAuthPassword] = useState("")
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [attemptsCount, setAttemptsCount] = useState(0)
  const { authEmail, setAuthEmail, setAuthToken, validationError } = useAuth()

  const {
    theme: { colors },
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
    setAttemptsCount((value) => value + 1)

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
            color={colors.palette.neutral800}
            containerStyle={props.style}
            size={20}
            onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
          />
        )
      },
    [isAuthPasswordHidden, colors.palette.neutral800],
  )

  return (
    <Screen
      preset="scroll"
      contentContainerStyle={$container}
      safeAreaEdges={["top"]}
      backgroundColor={colors.background} // Ensure this background color is set correctly
    >
      <View style={$imageHeaderContainer}>
        <Image source={headerImage} style={$imageHeader} resizeMode="cover" />
        <View style={$profileIconContainer}>
          <Icon icon="lock" size={40} color={colors.text} />
        </View>
      </View>

      <View style={$formCard}>
        <Text preset="heading" tx="loginScreen:logIn" style={$headingText} />
        <Text preset="subheading" tx="loginScreen:enterDetails" style={$subheadingText} />
        {attemptsCount > 2 && <Text tx="loginScreen:hint" size="sm" weight="light" />}

        <TextField
          value={authEmail}
          onChangeText={setAuthEmail}
          containerStyle={$textField}
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          keyboardType="email-address"
          labelTx="loginScreen:emailFieldLabel"
          placeholderTx="loginScreen:emailFieldPlaceholder"
          helper={error}
          status={error ? "error" : undefined}
          onSubmitEditing={() => authPasswordInput.current?.focus()}
        />

        <TextField
          ref={authPasswordInput}
          value={authPassword}
          onChangeText={setAuthPassword}
          containerStyle={$textField}
          autoCapitalize="none"
          autoComplete="password"
          autoCorrect={false}
          secureTextEntry={isAuthPasswordHidden}
          labelTx="loginScreen:passwordFieldLabel"
          placeholderTx="loginScreen:passwordFieldPlaceholder"
          RightAccessory={PasswordRightAccessory}
          onSubmitEditing={login}
        />

        <Button
          testID="login-button"
          tx="loginScreen:tapToLogIn"
          style={$tapButton}
          preset="filled"
          onPress={login}
        />

        <Text tx="loginScreen:hint" style={$hintText} />
      </View>
    </Screen>
  )
}

const $container: ViewStyle = {
  flex: 1,
}

const $imageHeaderContainer: ViewStyle = {
  height: "40%", // Adjust based on your image aspect ratio
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
  bottom: -40, // Half the icon height to overlap the card
  width: 80,
  height: 80,
  borderRadius: 40,
  backgroundColor: colors.palette.neutral100, // Should match card background
  justifyContent: "center",
  alignItems: "center",
  zIndex: 10,
  borderWidth: 1,
  borderColor: colors.palette.neutral300, // Matching input border
}

const $formCard: ViewStyle = {
  // ...spacing.padding.paddingLarge,
  flex: 1,
  marginTop: spacing.lg, // Initial push down before overlap
  borderTopLeftRadius: spacing.lg,
  borderTopRightRadius: spacing.lg,
  backgroundColor: colors.palette.neutral100, // Standard White Card
  justifyContent: "space-between",
  paddingTop: 60, // Space for the icon that overlaps
  zIndex: 5,
}

const $headingText: TextStyle = {
  textAlign: "center",
  // ...spacing.margin.marginNone,
}

const $subheadingText: TextStyle = {
  textAlign: "center",
  color: colors.textDim, // A softer secondary text color
  marginHorizontal: spacing.md,
}

const $textField: ViewStyle = {
  margin: spacing.md,
}

const $tapButton: ViewStyle = {
  // ...spacing.margin.marginExtraLarge,
  margin: spacing.xl,
  backgroundColor: colors.palette.neutral300,
}

const $hintText: TextStyle = {
  marginHorizontal: spacing.md,
  marginBottom: spacing.lg,
  textAlign: "center",
  color: colors.textDim,
}
