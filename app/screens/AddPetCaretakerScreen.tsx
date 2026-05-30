import { FC, useState } from "react"
import { View, ViewStyle, TextStyle, ImageStyle, Image, Dimensions, Modal } from "react-native"

import { Button } from "@/components/Button"
import { Header } from "@/components/Header"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { TextField } from "@/components/TextField"
import { colors } from "@/theme/colors"
import { useAppTheme } from "@/theme/context"
import { spacing } from "@/theme/spacing"
import { ThemedStyle } from "@/theme/types"

interface Props {}

const { width } = Dimensions.get("screen")

// 🔥 carousel sizing
const _ITEM_WIDTH = width * 0.4

export const AddPetCaretakerScreen: FC<Props> = () => {
  const headerImage = require("@assets/images/boarding-image2.png")

  const petCaretaker = [
    { username: "Deniel0507", email: "Deniel0507@gmail.com" },
    { username: "Ali0507", email: "Ali0507@gmail.com" },
  ]

  const [visible, setVisible] = useState(false)

  const { themed } = useAppTheme()

  return (
    <Screen
      preset="scroll"
      contentContainerStyle={$container}
      safeAreaEdges={["top"]}
      backgroundColor={colors.palette.neutral100}
    >
      <Header leftIcon="user" preset="pet" titleTx="SignupScreen:title" />

      <View style={$formCard}>
        <View style={$flexContainer}>
          {/* IMAGE */}
          <View style={$imageHeaderContainer}>
            <Image source={headerImage} style={$imageHeader} resizeMode="cover" />
          </View>

          {/* TITLE */}
          <TextField
            placeholder="Search by name, tag, email..."
            containerStyle={[$searchFieldContainer]}
            style={[]}
          />
          <View style={$searchFieldContainer}>
            <Text text="Added Contacts" style={$textStyle} />
          </View>
          {petCaretaker.map((pet, index) => (
            <View key={index} style={$profileContainer}>
              {/* <PetProfile
                firstText={pet.username}
                secondText={pet.email}
                preset="filled"
                image="https://i.pravatar.cc/150"
                module="date"
                // onPress={() => {
                //     setSelectedIndex(index)
                //     setVisible(true)
                //     }
                // }
              /> */}
            </View>
          ))}
        </View>

        {/* BUTTON */}
        <Button
          testID="next-button"
          tx="AddPetSizeRangeScreen:button"
          style={themed($primaryButton)}
          textStyle={themed($primaryButtonText)}
          preset="reversed"
        />
        <Modal
          visible={visible}
          transparent
          animationType="slide"
          onRequestClose={() => setVisible(false)}
        >
          <View style={$overlay}>
            <View style={$modal}></View>
          </View>
        </Modal>
      </View>
    </Screen>
  )
}

/* ================== STYLES ================== */

const $container: ViewStyle = {
  flexGrow: 1,
}

const $formCard: ViewStyle = {
  flex: 1,
  padding: spacing.lg,
  borderTopLeftRadius: spacing.lg,
  borderTopRightRadius: spacing.lg,
  backgroundColor: colors.palette.neutral100,
  paddingTop: 40,
}

const $flexContainer: ViewStyle = {
  flex: 1,
}

const $imageHeaderContainer: ViewStyle = {
  height: 220,
  width: "100%",
}

const $imageHeader: ImageStyle = {
  width: "100%",
  height: "100%",
  borderRadius: 20,
}

const $textStyle: TextStyle = {
  color: colors.palette.neutral900,
}

const $searchFieldContainer: ViewStyle = {
  marginTop: spacing.xxxl,
  marginBottom: spacing.xxxl,
}

const $primaryButton: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.primaryBlue,
  borderColor: colors.palette.primaryBlue,
  borderWidth: 1,
  borderRadius: 12,
  paddingVertical: 12,
  marginTop: spacing.md,
})

const $primaryButtonText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.neutral100,
  fontSize: 16,
  fontWeight: "600",
})

const $profileContainer: ViewStyle = {
  marginBottom: 20,
}

const $overlay: ViewStyle = {
  flex: 1,
  backgroundColor: "rgba(0,0,0,0.5)",
  justifyContent: "flex-end",
  alignItems: "center",
}

const $modal: ViewStyle = {
  width: "100%",
  borderRadius: 12,
  backgroundColor: "white",
  padding: 16,
}
