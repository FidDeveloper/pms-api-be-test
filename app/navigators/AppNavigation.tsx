import { useCallback } from "react"
import { Image, LayoutAnimation, TextStyle, View, ViewStyle, ImageStyle } from "react-native"
import { faRightFromBracket, faSun, faMoon } from "@fortawesome/free-solid-svg-icons"

import { useAuth } from "@/context/AuthContext"
import { navigate } from "@/navigators/navigationUtilities"
import { colors } from "@/theme/colors"
import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"

import { Menu } from "../components/Menu"
import { Text } from "../components/Text"

export interface NavigationRouteProps {
  // No props currently used
}

export function NavigationRoute(_props: NavigationRouteProps) {
  const petList = [
    { petName: "max", petImage: "https://i.pravatar.cc/150" },
    { petName: "sam", petImage: "https://i.pravatar.cc/150" },
    { petName: "tom", petImage: "https://i.pravatar.cc/150" },
  ]

  const { logout } = useAuth()

  const {
    setThemeContextOverride,
    themeContext,
    theme: { colors },
    themed,
  } = useAppTheme()

  const toggleTheme = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut) // Animate the transition
    setThemeContextOverride(themeContext === "dark" ? "light" : "dark")
  }, [themeContext, setThemeContextOverride])

  return (
    <View style={themed($mainContainer)}>
      <View style={$petListContainer}>
        <Text text="Your Pet" style={$textStyle} />
        <View style={[$secondContainer, $rowFlexDirection, $smallMarginTop, $alignItemsCenter]}>
          {petList.map((petLists, index) => (
            <View key={index} style={$alignItemsCenter}>
              <View>
                <Image source={{ uri: "https://i.pravatar.cc/150" }} style={themed($avatar)} />
              </View>
              <Text style={[$textStyle, $textCenter]} text={petLists.petName} />
            </View>
          ))}
          <View>
            <Image
              source={{ uri: "https://cdn-icons-png.flaticon.com/512/1077/1077114.png" }}
              style={themed($avatarAdd)}
            />
            <Text style={[$textStyle, $textCenter]} text="add pet" />
          </View>
        </View>
        <View style={$alignItemsCenter}>
          <View style={$fullWidthLine} />
        </View>
        <Menu
          style={[$mediumMarginTop, $rowFlexDirection, $alignItemsCenter, $menuGap]}
          pressedStyle={{ backgroundColor: colors.palette.neutral100 }}
          menuName="Dashboard"
          onPress={() => navigate("AddPet")}
          preset="default"
          icons="user"
        />
        <Menu
          style={[$mediumMarginTop, $rowFlexDirection, $alignItemsCenter, $menuGap]}
          pressedStyle={{ backgroundColor: colors.palette.neutral100 }}
          menuName="Welcome"
          onPress={() => navigate("Welcome")}
          preset="default"
          icons="user"
        />
        <Menu
          style={[$mediumMarginTop, $rowFlexDirection, $alignItemsCenter, $menuGap]}
          pressedStyle={{ backgroundColor: colors.palette.neutral100 }}
          menuName="nothing"
          preset="default"
          icons="user"
        />
        <View style={[$alignItemsCenter, $mediumMarginTop]}>
          <View style={$fullWidthLine} />
        </View>
        <Menu
          style={[$mediumMarginTop, $rowFlexDirection, $alignItemsCenter, $menuGap]}
          pressedStyle={{ backgroundColor: colors.palette.neutral100 }}
          menuName="nothing"
          preset="default"
          icons="user"
        />
        <Menu
          style={[$mediumMarginTop, $rowFlexDirection, $alignItemsCenter, $menuGap]}
          pressedStyle={{ backgroundColor: colors.palette.neutral100 }}
          menuName={`Toggle Theme: ${themeContext}`}
          onPress={toggleTheme}
          preset="default"
          fontAwesome={true}
          fontAwesomeIcon={themeContext === "dark" ? faSun : faMoon}
        />
        <Menu
          style={[$mediumMarginTop, $rowFlexDirection, $alignItemsCenter, $menuGap]}
          pressedStyle={{ backgroundColor: colors.palette.neutral100 }}
          tx="common:logOut"
          onPress={logout}
          preset="default"
          fontAwesome={true}
          fontAwesomeIcon={faRightFromBracket}
        />
      </View>
    </View>
  )
}

const $textStyle: TextStyle = {
  color: colors.textSecondary,
}

const $mainContainer: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.neutral100,
  flexGrow: 1,
  position: "absolute",
  top: 30,
  zIndex: 100,
  width: "100%",
  alignItems: "center",
  paddingTop: 30,
})

const $secondContainer: ViewStyle = {
  gap: 20,
}

const $smallMarginTop: ViewStyle = {
  marginTop: 10,
}

const $mediumMarginTop: ViewStyle = {
  marginTop: 30,
}

const $rowFlexDirection: ViewStyle = {
  flexDirection: "row",
}

const $alignItemsCenter: ViewStyle = {
  alignItems: "center",
}

const $petListContainer: ViewStyle = {
  width: "80%",
  marginBottom: 20,
}

const $textCenter: TextStyle = {
  textAlign: "center",
}

const $menuGap: ViewStyle = {
  gap: 12,
}

const $fullWidthLine: ViewStyle = {
  width: "100%",
}

const $avatar: ThemedStyle<ImageStyle> = () => ({
  width: 56,
  height: 56,
  borderRadius: 28,
})

const $avatarAdd: ThemedStyle<ImageStyle> = () => ({
  width: 56,
  height: 56,
  borderRadius: 28,
  tintColor: colors.palette.neutral100,
})

const _$symbol: ThemedStyle<ImageStyle> = () => ({
  width: 36,
  height: 36,
  borderRadius: 28,
})

const _$line: ViewStyle = {
  height: 1,
  backgroundColor: colors.palette.neutral400,
  marginTop: 10,
}
