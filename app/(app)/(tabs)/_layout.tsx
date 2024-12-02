import React, { useContext, useState } from "react";
import { Link, Redirect, router, Stack, Tabs } from "expo-router";
import {
  View,
  Text,
  Pressable,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Entypo from "@expo/vector-icons/Entypo";

import { GenderContext } from "@/contexts/genderForHome";

function tabHeader() {
  const { gender, setGender, showGender, setShowGender } =
    useContext(GenderContext);
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
        }}
      >
        <Image
          source={require("../../../assets/images/saintg-logo-black.png")}
          style={{
            width: 100,
            height: 50,
            resizeMode: "contain",
            left: 0,
            right: 6,
            marginRight: 20,
          }}
        />

        <View
          style={{
            width: "27%",
            display: "flex",
            flexDirection: "row",
            right: 20,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Lato-Regular",
              letterSpacing: 1.2,
              color: "black",
            }}
          >
            {gender}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setShowGender(true);
              console.log(showGender);
            }}
          >
            <Entypo name="chevron-thin-down" size={20} color="black" />
          </TouchableOpacity>
        </View>

        <Link
          href="/(app)/search/search"
          style={{
            right: 0,
            height: 30,
            alignItems: "center",
            width: 30,
          }}
        >
          <Image
            height={20}
            width={20}
            source={require("../../../assets/images/icons/search.png")}
          />
        </Link>
      </View>
      {showGender ? (
        <View
          style={{
            position: "absolute",
            backgroundColor: "white",
            alignSelf: "center",
            width: "40%",
            zIndex: 1,
            top: 80,
            left: 160,
          }}
        >
          <TouchableOpacity
            style={{ padding: 10 }}
            onPress={() => {
              setGender("MEN");
              setShowGender(false);
            }}
          >
            <Text> MEN </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ padding: 10 }}
            onPress={() => {
              setGender("WOMEN");
              setShowGender(false);
            }}
          >
            <Text> WOMEN </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View />
      )}
    </SafeAreaView>
  );
}

function _layout() {
  const [userDetails, setUserDetails] = React.useState<any>();

  React.useEffect(() => {
    async function getUserDetails() {
      const userDetails = await AsyncStorage.getItem("userDetails");

      setUserDetails(userDetails);
    }
    getUserDetails();
  }, []);

  if (userDetails !== null) {
    return (
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "black",
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon(props) {
              return <Feather name="home" size={24} color="black" />;
            },
            header(props) {
              return tabHeader();
            },
          }}
        />
        <Tabs.Screen
          name="categories"
          options={{
            title: "Categories",
            tabBarIcon(props) {
              return <Ionicons name="grid-outline" size={24} color="black" />;
            },
            header(props) {
              return tabHeader();
            },
          }}
        />
        <Tabs.Screen
          name="wishlist/index"
          options={{
            title: "Wishlist",
            tabBarIcon(props) {
              return <AntDesign name="hearto" size={24} color="black" />;
            },
            header(props) {
              return tabHeader();
            },
          }}
        />
        <Tabs.Screen
          name="cart/index"
          options={{
            title: "Cart",
            tabBarIcon(props) {
              return (
                <Ionicons name="bag-outline" size={24} color="black" />
                // <Image
                //   source={require("../../../assets/images/navbar/cart.png")}
                // />
              );
            },
            header(props) {
              return tabHeader();
            },
          }}
        />
        <Tabs.Screen
          name="account"
          options={{
            title: "Account",
            tabBarIcon(props) {
              return (
                <MaterialCommunityIcons
                  name="account-outline"
                  size={30}
                  color="black"
                />
                // <SvgUri
                //   source={require("../../../assets/images/account/person.svg")}
                //   width="23"
                //   height="23"
                // />
              );
            },
            header(props) {
              return <View></View>;
            },
          }}
        />
      </Tabs>
    );
  } else {
    return <Redirect href={"/auth"} />;
  }
}

export default _layout;
