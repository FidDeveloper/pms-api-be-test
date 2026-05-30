import { FC, useState } from "react"
import { View, ViewStyle } from "react-native"

import { AddPetLayout } from "@/components/AddPetLayout"
import { PetProfile } from "@/components/PetProfile"
import { useAppTheme } from "@/theme/context"
import { spacing } from "@/theme/spacing"
import { ThemedStyle } from "@/theme/types"

interface Props {}

export const AddPetScreen: FC<Props> = () => {
  const { themed } = useAppTheme()
  const petConst = [
    { petTypeDesc: "CAT", petBreedDesc: "British Short Hair" },
    { petTypeDesc: "CAT", petBreedDesc: "Persian" },
    { petTypeDesc: "DOG", petBreedDesc: "Bulldog" },
    { petTypeDesc: "DOG", petBreedDesc: "Shephard" },
    { petTypeDesc: "CAT", petBreedDesc: "British Short Hair" },
    { petTypeDesc: "DOG", petBreedDesc: "Bulldog" },
    { petTypeDesc: "DOG", petBreedDesc: "Bulldog" },
    { petTypeDesc: "DOG", petBreedDesc: "Shephard" },
    { petTypeDesc: "CAT", petBreedDesc: "British Short Hair" },
    { petTypeDesc: "DOG", petBreedDesc: "Bulldog" },
    { petTypeDesc: "DOG", petBreedDesc: "Bulldog" },
  ]

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const step = 1
  const percentage = (step / 9) * 100

  return (
    <AddPetLayout progressPercentage={percentage} step={step} petName="Breed">
      {/* SCROLL CONTENT */}
      <View style={themed($formCard)}>
        {petConst.map((pet, index) => (
          <View key={index} style={$gridItem}>
            <PetProfile
              type={pet.petTypeDesc}
              breed={pet.petBreedDesc}
              image="https://i.pravatar.cc/150"
              isActive={selectedIndex === index}
              onPress={() => setSelectedIndex((prev) => (prev === index ? null : index))}
              preset="filled"
            />
          </View>
        ))}
      </View>
    </AddPetLayout>
  )
}

const _$root: ViewStyle = {
  flex: 1,
}

/* scroll container spacing */
const _$container: ViewStyle = {
  paddingBottom: 120, // IMPORTANT so content doesn't hide behind button
}

/* grid */
const $formCard: ThemedStyle<ViewStyle> = ({ colors }) => ({
  padding: spacing.lg,
  backgroundColor: colors.palette.neutral200,
  borderRadius: spacing.lg,
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
})

const $gridItem: ViewStyle = {
  width: "48%",
  marginBottom: 16,
}

const _$floatingButtonContainer: ViewStyle = {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  padding: spacing.lg,
  backgroundColor: "#D7CEC9",
  borderTopWidth: 1,
  borderTopColor: "#eee",
}

const _$ctaButton: ViewStyle = {
  borderRadius: 12,
}
