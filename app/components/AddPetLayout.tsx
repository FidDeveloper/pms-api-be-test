import { FC, ReactNode } from "react"
import { ViewStyle, View, TextStyle } from "react-native"

import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import { spacing } from "@/theme/spacing"
import { ThemedStyle } from "@/theme/types"

import { AddPetHeader } from "./AddPetHeader"
import { Button } from "./Button"
import { Screen } from "./Screen"

export interface AddPetLayoutProp {
  progressPercentage: number
  step: number
  children: ReactNode
  petName: string
}

export const AddPetLayout: FC<AddPetLayoutProp> = ({
  progressPercentage,
  step,
  children,
  petName,
}) => {
  const {
    theme: { colors },
    themed,
  } = useAppTheme()
  return (
    <>
      <Screen
        contentContainerStyle={$container}
        safeAreaEdges={["top"]}
        backgroundColor={colors.palette.neutral200}
        keyboardOffset={spacing.xl}
      >
        <AddPetHeader progressPercentage={progressPercentage} step={step} petName={petName} />
        <Screen
          preset="scroll"
          contentContainerStyle={$container}
          backgroundColor={colors.palette.neutral200}
          keyboardOffset={spacing.xl}
        >
          {children}
        </Screen>
        <View style={themed($floatingButtonContainer)}>
          <Button
            text="Continue"
            preset="filled"
            // style={$ctaButton}
            // textStyle={{ color: 'white' }}
            style={[themed($tapButton), themed($primaryButton)]}
            textStyle={themed($primaryButtonText)}
          />
          <Text
            text="Skip for now"
            size="sm"
            weight="light"
            style={themed($textBottom)}
            // onPress={goNext}
          />
        </View>
      </Screen>
    </>
  )
}

const $container: ViewStyle = {
  flexGrow: 1,
}

const $floatingButtonContainer: ThemedStyle<ViewStyle> = ({ colors }) => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  paddingTop: spacing.sm,
  paddingBottom: spacing.lg,
  paddingHorizontal: spacing.lg,
  backgroundColor: colors.palette.neutral100,
  borderTopLeftRadius: spacing.lg,
  borderTopRightRadius: spacing.lg,
  shadowColor: "#000",
  shadowOffset: { width: 1, height: -2 },
  shadowOpacity: 0.28,
  shadowRadius: 10,
  elevation: 10,
})

const $ctaButton: ViewStyle = {
  borderRadius: 12,
  backgroundColor: "blue",
}

const _$ctaButton = $ctaButton // Keep for future use if needed

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

const $tapButton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.lg,
  marginBottom: spacing.md,
})

const $textBottom: ThemedStyle<TextStyle> = ({ colors }) => ({
  textAlign: "center",
  color: colors.textSecondary,
})
