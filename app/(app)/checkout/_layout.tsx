import { Stack } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native";

function AuthRoot() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerTitle: "CHECKOUT" }} />
      <Stack.Screen name="payment" options={{ headerTitle: "CONFIRM ORDER" }} />
      <Stack.Screen name="success" options={{ headerShown: false }} />
    </Stack>
  );
}

export default AuthRoot;
