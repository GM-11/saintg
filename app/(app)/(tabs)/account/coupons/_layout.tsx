import React from "react";
import { Stack } from "expo-router";
import { View, Text } from "react-native";

function _layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="couponDetails" />
    </Stack>
  );
}

export default _layout;
