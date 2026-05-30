import { FC } from "react"
import { View, ViewStyle } from "react-native"

import { isRTL } from "@/i18n"
import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"

import { PressableIcon } from "./Icon"
import { Text } from "./Text"

export interface AddPetHeaderProps {
  progressPercentage: number
  step: number
  petName: string
}

export const AddPetHeader: FC<AddPetHeaderProps> = ({ progressPercentage, step, petName }) => {
  const {
    theme: { colors },
    themed,
  } = useAppTheme()
  return (
    <View style={{}}>
      <View style={$alignItemsCenter}>
        <View style={$flexContainer}>
          <PressableIcon
            size={24}
            icon="back"
            color={colors.palette.neutral900}
            containerStyle={themed([$actionIconContainer])}
            style={isRTL ? { transform: [{ rotate: "180deg" }] } : {}}
          />

          <View style={$alignItemsCenter}>
            <Text text="Add Pet Profile" />
            <Text text={petName} />
          </View>

          <View>
            <Text text="Step" />
            <Text text={`${step}/9`} />
          </View>
        </View>
      </View>
      <View style={[$alignItemsCenter, $progressContainer]}>
        <View style={themed($backgroundLine)}>
          <View style={[themed($mainLine), { width: `${progressPercentage}%` }]} />
        </View>
      </View>
    </View>
  )
}

const $actionIconContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexGrow: 0,
  alignItems: "center",
  justifyContent: "center",
  paddingHorizontal: spacing.md,
  zIndex: 2,
})

const $flexContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  width: "90%",
}

const $backgroundLine: ThemedStyle<ViewStyle> = ({ colors }) => ({
  height: 10,
  backgroundColor: colors.palette.neutral300,
  width: "80%",
  marginTop: 10,
  borderRadius: 23,
  overflow: "hidden", // important
})

const $mainLine: ThemedStyle<ViewStyle> = () => ({
  height: 10,
  backgroundColor: "#FFC542",
  borderRadius: 23,
})

const $alignItemsCenter: ViewStyle = {
  alignItems: "center",
}

const $progressContainer: ViewStyle = {
  paddingVertical: 20,
}
