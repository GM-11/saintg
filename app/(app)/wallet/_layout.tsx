import { Stack } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native";

function AuthRoot() {
  return (
    <Stack>
      <Stack.Screen name="addFunds" options={{ headerTitle: "ADD FUNDS" }} />
      <Stack.Screen name="index" options={{ headerTitle: "WALLET" }} />
      <Stack.Screen name="walletHistory" options={{ headerTitle: "HISTORY" }} />
    </Stack>
  );
}

export default AuthRoot;
