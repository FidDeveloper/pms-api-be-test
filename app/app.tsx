/* eslint-disable import/first */

if (__DEV__) {
  require("./devtools/ReactotronConfig.ts")
}

import "./utils/gestureHandler"

import { useEffect, useState } from "react"
import { Platform, ViewStyle } from "react-native"
import { useFonts } from "expo-font"
import * as Linking from "expo-linking"
//Add Platform - use to detect which platform app is running (iOS, Android, web)
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { KeyboardProvider } from "react-native-keyboard-controller"
import { SafeAreaProvider } from "react-native-safe-area-context"

import { AuthProvider } from "./context/AuthContext"
import { initI18n } from "./i18n"
import { AppNavigator } from "./navigators/AppNavigator"
import { useNavigationPersistence } from "./navigators/navigationUtilities"
import { ThemeProvider } from "./theme/context"
import { customFontsToLoad } from "./theme/typography"
import { loadDateFnsLocale } from "./utils/formatDate"
import * as storage from "./utils/storage"

// 👇 IMPORTANT: Wrap KeyboardProvider for web compatibility
const Providers = ({ children }: { children: React.ReactNode }) => {
  if (Platform.OS === "web") {
    return <>{children}</>
  }
  return <KeyboardProvider>{children}</KeyboardProvider>
}

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"

const $rootView: ViewStyle = {
  flex: 1,
}

// Web linking configuration
const prefix = Platform.OS === "web" ? "/" : Linking.createURL("/")

const config = {
  screens: {
    Login: {
      path: "",
    },
    Welcome: "welcome",
    Demo: {
      screens: {
        DemoShowroom: {
          path: "showroom/:queryIndex?/:itemIndex?",
        },
        Dashboard: {
          path: "dashboard",
        },
        DemoDebug: "debug",
        DemoPodcastList: "podcast",
        DemoCommunity: "community",
      },
    },
  },
}

export function App() {
  const {
    initialNavigationState,
    onNavigationStateChange,
    isRestored: isNavigationStateRestored,
  } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY)

  const [_areFontsLoaded, _fontLoadError] = useFonts(customFontsToLoad)
  const [isI18nInitialized, setIsI18nInitialized] = useState(false)

  useEffect(() => {
    initI18n()
      .then(() => setIsI18nInitialized(true))
      .then(() => loadDateFnsLocale())
  }, [])

  // ⚠️ Avoid blocking web render too much
  if (!isNavigationStateRestored || !isI18nInitialized) {
    return null
  }

  const linking = {
    prefixes: [prefix],
    config,
  }

  return (
    <GestureHandlerRootView style={$rootView}>
      {!isNavigationStateRestored || !isI18nInitialized ? null : (
        <SafeAreaProvider>
          <Providers>
            <AuthProvider>
              <ThemeProvider>
                <AppNavigator
                  linking={linking}
                  initialState={initialNavigationState}
                  onStateChange={onNavigationStateChange}
                />
              </ThemeProvider>
            </AuthProvider>
          </Providers>
        </SafeAreaProvider>
      )}
    </GestureHandlerRootView>
  )
}
