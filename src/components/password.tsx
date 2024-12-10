import React, { useEffect, useState } from "react";
import { View, Animated, StyleSheet } from "react-native";

type PasswordStrengthBarProps = {
  password: string;
};

const PasswordStrengthBar = ({ password }: PasswordStrengthBarProps) => {
  const [widthAnim] = useState(new Animated.Value(0));
  const [colorAnim] = useState(new Animated.Value(0));

  const getStrengthDetails = (password: string) => {
    if (password === "Strong") return { color: 3, width: 100 }; // Green
    if (password === "Medium") return { color: 2, width: 70 }; // Yellow
    if (password === "Weak") return { color: 1, width: 40 }; // Red
    return { color: 0, width: 0 }; // Gray
  };

  const { color, width } = getStrengthDetails(password);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(widthAnim, {
        toValue: width,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(colorAnim, {
        toValue: color,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  }, [password, width, color]);

  const interpolatedColor = colorAnim.interpolate({
    inputRange: [0, 1, 2, 3],
    outputRange: ["#d1d5db", "#ef4444", "#facc15", "#22c55e"], // Gray, Red, Yellow, Green
    extrapolate: "clamp",
  });

  return (
    <View style={styles.container}>
      <View style={styles.outerBar}>
        <Animated.View
          style={[
            styles.innerBar,
            {
              width: widthAnim.interpolate({
                inputRange: [0, 100],
                outputRange: ["0%", "100%"],
              }),
              backgroundColor: interpolatedColor,
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  outerBar: {
    height: 12,
    width: "100%",
    backgroundColor: "#e5e7eb", // Tailwind's bg-gray-200
    borderRadius: 9999, // Tailwind's rounded-full
    overflow: "hidden",
  },
  innerBar: {
    height: "100%",
    borderRadius: 9999, // Tailwind's rounded-full
  },
});

export default PasswordStrengthBar;
