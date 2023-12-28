import { View, Pressable, StyleSheet, Platform } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";

import ReText from "./components/ReText";
import {
  DEFAULT_HEIGHT,
  DEFAULT_OFFSET,
  DEFAULT_TEXT,
  DEFAULT_WIDTH,
  PRESSED_HEIGHT,
  PRESSED_OFFSET,
  PRESSED_WIDTH,
  squeaks,
} from "./consts";

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
const config = { stiffness: 200 };

export default function App() {
  const width = useSharedValue(DEFAULT_WIDTH);
  const height = useSharedValue(DEFAULT_HEIGHT);
  const offset = useSharedValue(DEFAULT_OFFSET);

  const text = useSharedValue(DEFAULT_TEXT);

  const animatedStyles = useAnimatedStyle(() => ({
    width: width.value,
    height: height.value,
    transform: [{ translateY: offset.value }],
  }));

  const handlePressIn = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    width.value = withSpring(PRESSED_WIDTH, config);
    height.value = withSpring(PRESSED_HEIGHT, config);
    offset.value = withSpring(PRESSED_OFFSET, config);
    text.value = squeaks[Math.floor(Math.random() * squeaks.length)];
  };

  const handlePressOut = () => {
    width.value = withSpring(DEFAULT_WIDTH);
    height.value = withSpring(DEFAULT_HEIGHT);
    offset.value = withSpring(DEFAULT_OFFSET);
    text.value = DEFAULT_TEXT;
  };

  return (
    <View style={styles.container}>
      <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
        <AnimatedLinearGradient
          start={{ x: 0.1, y: 0.2 }}
          colors={["#B58DF1", "#782AEB"]}
          style={[styles.button, animatedStyles]}
        >
          <ReText text={text} style={styles.buttonText} />
        </AnimatedLinearGradient>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  button: {
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    pointerEvents: "none",
    width: DEFAULT_WIDTH,
    textAlign: "center",
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
});
