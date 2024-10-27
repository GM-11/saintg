import React from "react";
import { Link, router, Stack } from "expo-router";
import { View, Text, Image, Pressable, SafeAreaView } from "react-native";
import SvgUri from "react-native-svg-uri";

function h() {
  return (
    <SafeAreaView>
      <View
        style={{
          paddingHorizontal: 24,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "white",
          justifyContent: "space-between",
          paddingTop: 40,
          paddingBottom: 20,
        }}
      >
        <Image
          source={require("../../../../assets/images/saintg-logo-black.png")}
          style={{
            width: 100,
            height: 50,
            resizeMode: "contain",
          }}
        />

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            height: "100%",
            alignItems: "center",
            gap: 20,
          }}
        >
          <Link
            href={"/search"}
            style={{
              // backgroundColor: "red",
              height: 30,
              alignItems: "center",
              width: 30,
            }}
          >
            <Image
              height={20}
              width={20}
              source={require("../../../../assets/images/icons/search.png")}
            />
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
import Feather from "@expo/vector-icons/Feather";

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
          {/* <Image
            style={{ marginRight: 20, marginLeft: 15 }}
            source={require("../../../../assets/images/icons/forward-arrow.png")}
          /> */}
          <Feather
            style={{ marginRight: 20, marginLeft: 15 }}
            name="arrow-left"
            size={24}
            color="black"
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
            return h();
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
