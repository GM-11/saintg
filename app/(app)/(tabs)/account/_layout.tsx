import React from "react";
import { Link, router, Stack } from "expo-router";
import { View, Text, Image, Pressable, SafeAreaView } from "react-native";

function h(title: string) {
  return (
    <View
      style={{
        backgroundColor: "white",
        padding: 26,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Text style={{ fontSize: 20, height: 50 }}>{title}</Text>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 20,
        }}
      >
        <Link href={"/search"}>
          <Image
            source={require("../../../../assets/images/icons/search.png")}
          />
        </Link>
        <Image source={require("../../../../assets/images/icons/bell.png")} />
      </View>
    </View>
  );
}
function _h(title: string) {
  return (
    <SafeAreaView
      style={{
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          marginTop: 40,
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Pressable
          onPress={() => {
            router.back();
          }}
        >
          <Image
            style={{ marginRight: 20, marginLeft: 15 }}
            source={require("../../../../assets/images/icons/forward-arrow.png")}
          />
        </Pressable>
        <Text style={{ fontSize: 20, height: 50 }}>{title}</Text>
      </View>
    </SafeAreaView>
  );
}

function _layout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="index"
        options={{
          header(props) {
            return h("ACCOUNT");
          },
        }}
      />
      <Stack.Screen
        name="manageAccount"
        options={{
          header(props) {
            return _h("MANAGE ACCOUNT");
          },
        }}
      />
      <Stack.Screen
        name="addresses"
        options={{
          header(props) {
            return _h("ADD NEW ADDRESS");
          },
        }}
      />
      <Stack.Screen
        name="orderSummary"
        options={{
          header(props) {
            return _h("ORDER SUMMARY");
          },
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          header(props) {
            return _h("SETTINGS");
          },
        }}
      />
      <Stack.Screen
        name="changePassword"
        options={{
          header(props) {
            return _h("CHANGE PASSWORD");
          },
        }}
      />
      <Stack.Screen
        name="story"
        options={{
          header(props) {
            return _h("OUR STORY");
          },
        }}
      />

      <Stack.Screen
        name="contact"
        options={{
          header(props) {
            return _h("CONTACT US");
          },
        }}
      />
      <Stack.Screen
        name="coupons"
        options={{
          header(props) {
            return _h("COUPONS");
          },
        }}
      />
      <Stack.Screen
        name="orders"
        options={{
          header(props) {
            return _h("ORDERS");
          },
        }}
      />
    </Stack>
  );
}

export default _layout;
