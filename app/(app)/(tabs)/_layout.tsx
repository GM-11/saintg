import React, { useContext, useState } from "react";
import { Link, Redirect, router, Stack, Tabs } from "expo-router";
import { View, Text, Pressable, Image, SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Picker } from "@react-native-picker/picker";
import { GenderContext } from "@/contexts/genderForHome";

function tabHeader() {
  // const [gender, selectedGender] = useState("WOMEN");
  const { gender, setGender } = useContext(GenderContext);
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

        <View style={{ width: "50%" }}>
          <Picker
            selectedValue={gender}
            onValueChange={async (itemValue) => {
              setGender(itemValue);
            }}
            style={{
              color: "black"
            }}
          >
            <Picker.Item label="WOMEN" value="WOMEN" />
            <Picker.Item label="MEN" value="MEN" />
          </Picker>
        </View>

        <Link
          href={"/search"}
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


  if (userDetails !== null) {
    return (
      <Tabs screenOptions={{}}>
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",

            tabBarIcon(props) {
              return (

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
