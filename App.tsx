import { View, Pressable, StyleSheet, Platform } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

import ReText from "./components/ReText";

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const DEFAULT_HEIGHT = 80;
const DEFAULT_WIDTH = 160;
const DEFAULT_OFFSET = 0;
const DEFAULT_TEXT = "Tap me";
const PRESSED_HEIGHT = 70;
const PRESSED_WIDTH = 180;
const PRESSED_OFFSET = DEFAULT_HEIGHT - PRESSED_HEIGHT;

const config = { stiffness: 200 };
const squeeks = ["Ouch!", "Oof!", "Eek!", "D'oh!"];

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
    width.value = withSpring(PRESSED_WIDTH, config);
    height.value = withSpring(PRESSED_HEIGHT, config);
    offset.value = withSpring(PRESSED_OFFSET, config);
    text.value = squeeks[Math.floor(Math.random() * squeeks.length)];
  };

  const handlePressOut = () => {
    width.value = withSpring(160);
    height.value = withSpring(80);
    offset.value = withSpring(0);
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
          <ReText style={styles.buttonText} text={text} />
        </AnimatedLinearGradient>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "column",
  },
  button: {
    width: 160,
    height: 80,
    backgroundColor: "black",
    margin: 30,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    pointerEvents: "none",
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
});
