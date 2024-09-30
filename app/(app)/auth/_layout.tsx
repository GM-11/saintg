import { Stack } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native";

function AuthRoot() {
  return (
    <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="signin" options={{ headerShown: false }} />
    </Stack>
  );
}

export default AuthRoot;
