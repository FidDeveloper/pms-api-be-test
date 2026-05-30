import "@expo/metro-runtime" // this is for fast refresh on web w/o expo-router
import { registerRootComponent } from "expo"
import { configureReanimatedLogger, ReanimatedLogLevel } from "react-native-reanimated"

// Pagination.Basic from react-native-reanimated-carousel reads SharedValues internally
// during render. Disable strict mode to suppress the false-positive warning until
// the upstream library is fixed.
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
})

import { App } from "@/app"

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App)
