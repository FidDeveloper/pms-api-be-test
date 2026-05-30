import { FC, ReactNode } from "react"
import { ViewStyle } from "react-native"

import { useAppTheme } from "@/theme/context"
import { spacing } from "@/theme/spacing"

import { Screen } from "./Screen"

export interface DashboardLayoutProps {
  children: ReactNode
}

export const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  const {
    theme: { colors },
  } = useAppTheme()

  return (
    <Screen
      preset="scroll"
      contentContainerStyle={$container}
      safeAreaEdges={["top"]}
      backgroundColor={colors.palette.neutral100}
      keyboardOffset={spacing.xl}
    >
      {children}
    </Screen>
  )
}

const $container: ViewStyle = {
  flexGrow: 1,
}
