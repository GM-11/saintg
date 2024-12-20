import textStyles from "@/styles/textStyles";
import { Href, Link, router } from "expo-router";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
  ImageSourcePropType,
  ImageURISource,
  TouchableOpacity,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { IUser } from "@/constants/types";

function index() {
  const [userDetails, setUserDetails] = React.useState<IUser>();
  React.useEffect(() => {
    async function getUserDetails() {
      const res = await AsyncStorage.getItem("userDetails");
      if (res) {
        setUserDetails(JSON.parse(res) as IUser);
        console.log(userDetails);
      }
    }
    getUserDetails();
  }, []);
  type tileData = {
    title: string;
    icon: ImageSourcePropType;
    uri: Href<string>;
  };
  const data: tileData[] = [
    {
      title: " Orders",
      icon: require("../../../../assets/images/account/orders.png"),
      uri: "/(tabs)/account/orders",
    },
    {
      title: "Contact",
      icon: require("../../../../assets/images/account/contact.png"),
      uri: "/(app)/(tabs)/account/contact",
    },

    {
      title: "Manage Addresses",
      icon: require("../../../../assets/images/account/person.png"),
      uri: "/(app)/(tabs)/account/addresses",
    },
    {
      title: "Coupons",
      icon: require("../../../../assets/images/account/coupons.png"),
      uri: "/(tabs)/account/coupons",
    },
    {
      title: "Checkout",
      icon: require("../../../../assets/images/account/checkout.png"),
      uri: "/(app)/checkout",
    },
    // {
    //   title: "Settings",
    //   icon: require("../../../../assets/images/account/settigns.png"),
    //   uri: "/(tabs)/account/settings",
    // },
    {
      title: "Change Password",
      icon: require("../../../../assets/images/account/settings.png"),
      uri: "/(tabs)/account/changePassword",
    },
    {
      title: "Story",
      icon: require("../../../../assets/images/account/story.png"),
      uri: "/(app)/(tabs)/account/story",
    },
    // {
    //   title: "Delete Account",
    //   icon: require("../../../../assets/images/account/delete_account.svg"),
    //   uri: "/(tabs)/account/manageAccount",
    // },
  ];

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      {/* {userDetails && userDetails.token ? ( */}
      <View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
            marginBottom: 24,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {/* <Image
              style={{ height: 48, width: 48, borderRadius: 100, margin: 16 }}
              source={{
                uri: "https://static.dc.com/dc/files/default_images/Char_Profile_Batman_20190116_5c3fc4b40faec2.47318964.jpg",
              }}
            /> */}
            <View style={{ marginLeft: 24 }}>
              <Text
                style={{ fontSize: 14, fontWeight: 300, ...textStyles.font }}
              >
                {userDetails && userDetails.token !== ""
                  ? userDetails.name
                  : "Not Logged in"}
              </Text>
              <Text
                style={{ fontSize: 10, fontWeight: 300, ...textStyles.font }}
              >
                {userDetails && userDetails.token !== ""
                  ? userDetails.email
                  : ""}
              </Text>
            </View>
          </View>

          <Link
            href={
              userDetails && userDetails.token !== ""
                ? "/(tabs)/account/manageAccount"
                : "/(app)/auth/signup_mobile"
            }
            style={{ marginRight: 24 }}
          >
            <AntDesign name="right" size={24} color="black" />
          </Link>
        </View>
        <FlatList
          data={data}
          renderItem={(val) => (
            <Tile // originalPrice={item.originalPrice}
              icon={val.item.icon}
              title={val.item.title}
              uri={val.item.uri}
            />
          )}
        />
      </View>
      {/* ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "black",
              width: "90%",
              marginTop: 36,
              padding: 16,
            }}
            onPress={() =>
              router.push({
                pathname: "/(app)/auth/signin",
                params: { regionId: userDetails?.regionId },
              })
            }
          >
            <Text
              style={{
                color: "white",
                alignSelf: "center",
                textAlign: "center",
                fontSize: 16,
                fontFamily: "Lato-Regular",
              }}
            >
              SIGN IN
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "black",
              width: "90%",
              marginTop: 36,
              padding: 16,
            }}
            onPress={() =>
              router.push({
                pathname: "/auth/signup",
                params: { regionId: userDetails?.regionId },
              })
            }
          >
            <Text
              style={{
                color: "white",
                alignSelf: "center",
                textAlign: "center",
                fontSize: 16,
                fontFamily: "Lato-Regular",
              }}
            >
              SIGN UP
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={async () => {
              await AsyncStorage.clear();
              router.replace("/auth");
            }}
          >
            <Text> Delete Account</Text>
          </TouchableOpacity>
        </View>
      )} */}
    </View>
  );
}

export default index;

function Tile({
  icon,
  title,
  uri,
}: {
  icon: ImageSourcePropType;
  title: string;
  uri: Href<string>;
}) {
  return (
    <Pressable
      onPress={() => {
        router.push(uri);
      }}
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        height: 48,
        alignItems: "center",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginLeft: 24,
        }}
      >
        <Image source={icon} width={20} height={20} />
        <Text style={{ marginLeft: 28, fontSize: 16 }}>{title}</Text>
      </View>

      <AntDesign
        name="right"
        size={20}
        color="black"
        style={{ marginRight: 24 }}
      />
    </Pressable>
  );
}
