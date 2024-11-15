import { useFonts } from "expo-font";
import { Href, Redirect, router, Slot, Stack } from "expo-router";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { View, Text } from "react-native";
import { GenderContextProvider } from "@/contexts/genderForHome";

export default function RootLayout() {
  SplashScreen.preventAutoHideAsync();

  const [loaded, error] = useFonts({
    "Lato-Regular": require("../../assets/fonts/Lato-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <GenderContextProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="search" options={{ headerShown: false }} />
        <Stack.Screen name="auth" options={{ headerShown: false }} />
        <Stack.Screen name="wallet" options={{ headerShown: false }} />
        <Stack.Screen name="product" options={{ headerShown: false }} />
        <Stack.Screen name="checkout" options={{ headerShown: false }} />
      </Stack>
    </GenderContextProvider>
  );

  // return <Slot />;
}
