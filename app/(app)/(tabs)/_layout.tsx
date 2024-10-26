import React from "react";
import { Link, Redirect, router, Stack, Tabs } from "expo-router";
import { View, Text, Pressable, Image, SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import SvgUri from "react-native-svg-uri";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

function tabHeader() {
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
            <SvgUri
              height={20}
              width={20}
              source={require("../../../assets/images/icons/search.svg")}
            />
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}

function _layout() {
  const [loggedIn, setLoggedIn] = React.useState(true);

  const [userDetails, setUserDetails] = React.useState<any>();

  React.useEffect(() => {
    async function getUserDetails() {
      const userDetails = await AsyncStorage.getItem("userDetails");

      setUserDetails(userDetails);
    }
    getUserDetails();
  }, []);

  // React.useEffect(() => {
  //   async function checkUserLoggedIn() {
  //     try {
  //       const userDetails = await AsyncStorage.getItem('userDetails');
  //       if (userDetails !== null) {
  //         setLoggedIn(true);
  //       }
  //     } catch (error) {
  //       console.error('Error checking user login status:', error);
  //       setLoggedIn(false);
  //     }
  //   };

  //   checkUserLoggedIn();
  // }, []);

  if (userDetails !== null) {
    return (
      <Tabs screenOptions={{}}>
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon(props) {
              return (
                // <Image
                //   source={require("../../../assets/images/navbar/home.png")}
                // />
                <Feather name="home" size={24} color="black" />
              );
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
              return (
                <AntDesign name="hearto" size={24} color="black" />
                // <Image
                //   source={require("../../../assets/images/navbar/wishlist.png")}
                // />
              );
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
                <SvgUri
                  source={require("../../../assets/images/account/person.svg")}
                  width="23"
                  height="23"
                />
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
