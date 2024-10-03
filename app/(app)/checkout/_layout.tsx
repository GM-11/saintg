import { Stack } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native";

function AuthRoot() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerTitle: "CHECKOUT" }} />
    </Stack>
  );
}

export default AuthRoot;
