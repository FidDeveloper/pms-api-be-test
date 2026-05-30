import { useCallback } from "react"
import { View, Pressable, Platform, ViewStyle, TextStyle } from "react-native"
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { Gesture, GestureDetector } from "react-native-gesture-handler"
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from "react-native-reanimated"

import { Text } from "@/components/Text"
import { colors } from "@/theme/colors"

type Props = {
  onSwipeRight: () => void
  disabled?: boolean
}

export function SwipeField({ onSwipeRight, disabled }: Props) {
  const translateX = useSharedValue(0)
  const triggered = useSharedValue(false)

  const MAX_SWIPE = 220 // adjust based on your UI
  const THRESHOLD = 160

  const safeCallback = useCallback(() => {
    onSwipeRight()
  }, [onSwipeRight])

  const gesture = Gesture.Pan()
    .enabled(!disabled && Platform.OS !== "web")
    .onUpdate((e) => {
      if (e.translationX > 0) {
        translateX.value = Math.min(e.translationX, MAX_SWIPE)
      }
    })
    .onEnd((e) => {
      const success = e.translationX > THRESHOLD

      if (success && !triggered.value) {
        triggered.value = true
        runOnJS(safeCallback)()
      }

      // snap back
      translateX.value = withSpring(0)
      triggered.value = false
    })

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }))

  // ✅ WEB fallback
  if (Platform.OS === "web") {
    return (
      <Pressable onPress={onSwipeRight} disabled={disabled} style={$parent}>
        <View style={$container}>
          <Text style={$text}>Tap to continue →</Text>
        </View>
      </Pressable>
    )
  }

  return (
    <View style={$parent}>
      <View style={$container}>
        <Text style={$text}>Swipe right to continue</Text>

        <GestureDetector gesture={gesture}>
          <Animated.View style={[$thumb, animatedStyle]}>
            {/* <Text style={$thumbText}>→</Text> */}
            <FontAwesomeIcon icon={faAnglesRight} size={20} color={colors.palette.neutral100} />
          </Animated.View>
        </GestureDetector>
      </View>
    </View>
  )
}

// ================== STYLES ==================

const $parent: ViewStyle = {
  flex: 1,
  justifyContent: "flex-end",
  padding: 16,
}

const $container: ViewStyle = {
  height: 60,
  borderRadius: 12,
  backgroundColor: colors.palette.secondaryBlue,
  justifyContent: "center",
  overflow: "hidden", // 👈 keeps thumb inside
}

const $thumb: ViewStyle = {
  position: "absolute",
  left: 0,
  height: 60,
  width: 60,
  borderRadius: 12,
  backgroundColor: colors.palette.primaryBlue,
  justifyContent: "center",
  alignItems: "center",
}

const $text: TextStyle = {
  textAlign: "center",
  fontSize: 16,
  fontWeight: "500",
  color: colors.palette.primaryBlue,
}

const _$thumbText: TextStyle = {
  fontSize: 20,
  fontWeight: "bold",
  color: colors.palette.neutral100,
}
