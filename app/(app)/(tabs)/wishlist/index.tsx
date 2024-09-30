import SelectSizeOverlay from "@/components/SelectSizeOverlay";
import { BASE_URL } from "@/constants/constant";
import { IUser } from "@/constants/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
} from "react-native";

type t = {
  image: string;
  title: string;
  subtitle: string;
  price: number;
  id: number;
};

function index() {
  const [showSizeOverlay, setShowSizeOverlay] = React.useState(false);
  const [data, setData] = React.useState<t[]>([]);

  async function getData() {
    const userDetails = await AsyncStorage.getItem("userDetails");
    if (!userDetails) return;
    const user = JSON.parse(userDetails) as IUser;
    try {
      const result = await fetch(`${BASE_URL}/wishlist`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": user.token,
        },
      });
      const data = await result.json();
      console.log(data);
      setData((prev) => [
        ...prev,
        {
          image: "https://images.unsplash.com/photo-1612838320302-4b3b3b3b3b3b",
          title: "Title",
          subtitle: "Subtitle",
          price: 100,
          id: 1,
        },
      ]);
    } catch (error) {
      setData([
        {
          image: "https://images.unsplash.com/photo-1612838320302-4b3b3b3b3b3b",
          title: "Title",
          subtitle: "Subtitle",
          price: 100,
          id: 1,
        },
      ]);
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  if (data.length !== 0) {
    return (
      <View
        style={{
          backgroundColor: "white",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../../../assets/offers/deals_banner.png")}
          style={{
            width: "100%",
          }}
        />

        <FlatList
          style={{ width: "100%" }}
          data={data}
          numColumns={2}
          renderItem={(val) => (
            <View
              style={{
                width: "45%",
                display: "flex",
                flexDirection: "column",
                margin: 10,
              }}
            >
              <Image
                source={{ uri: val.item.image }}
                style={{ width: "100%", height: 200 }}
              />
              <Text
                style={{ fontSize: 16, fontWeight: 300, marginVertical: 2 }}
              >
                {val.item.title}
              </Text>
              <Text
                style={{ fontSize: 16, fontWeight: 300, marginVertical: 2 }}
              >
                {val.item.subtitle}
              </Text>
              <Text
                style={{ fontSize: 16, fontWeight: 500, marginVertical: 2 }}
              >
                ${val.item.price}
              </Text>
              <Pressable
                onPress={() => setShowSizeOverlay(true)}
                style={{
                  padding: 10,
                  borderColor: "black",
                  borderWidth: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginVertical: 10,
                  marginHorizontal: 20,
                }}
              >
                <Text>MOVE TO BAG</Text>
              </Pressable>
            </View>
          )}
        />
      </View>
    );
  } else {
    return (
      <View
        style={{
          backgroundColor: "white",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text> No items in wishlist </Text>
      </View>
    );
  }
}

export default index;
