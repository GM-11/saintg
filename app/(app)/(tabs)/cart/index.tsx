import { BASE_URL } from "@/constants/constant";
import { IUser } from "@/constants/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type t = {
  title: string;
  subtitle: string;
  amount: number;
  price: number;
  imageUri: string;
  currency: string;
};

function index() {
  const [data, setItems] = useState<t[]>([]);
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState("GBP");
  const [userNotLoggedIn, setUserNotLoggedIn] = React.useState(false);
  const [user, setUser] = React.useState<IUser>();

  async function getItems() {
    setLoading(true);
    const userDetails = await AsyncStorage.getItem("userDetails");
    if (!userDetails) return;
    const user = JSON.parse(userDetails) as IUser;

    setUser(user);

    if (user.token === "") {
      setUserNotLoggedIn(true);
      return;
    }

    try {
      const result = await axios.get(`${BASE_URL}cart`, {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": user.token,
        },
      });
      const data = result.data.data;

      const regionData = await axios.get(
        `${BASE_URL}products/region/${user.regionId}`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": user.token,
          },
        },
      );

      const productIds: any[] = regionData.data.map(
        (val: any) => val.product_id,
      );

      let d: t[] = [];
      data.items.forEach((val: any) => {
        if (productIds.includes(val.productId)) {
          const v: t = {
            title: val.productName,
            subtitle: val.description,
            amount: val.quantity,
            imageUri: val.coverImage,
            currency: (regionData.data as any[]).find(
              (v) => v.product_id === val.productId,
            ).currency_type,
            price: (regionData.data as any[]).find(
              (v) => v.product_id === val.productId,
            ).price,
          };
          setCurrency(
            (regionData.data as any[]).find(
              (v) => v.product_id === val.productId,
            ).currency_type,
          );
          d.push(v);
        }
      });

      setItems(d);
    } catch (error) {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getItems();
  }, []);

  if (userNotLoggedIn) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
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
              params: { regionId: user?.regionId },
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
              params: { regionId: user?.regionId },
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
      </View>
    );
  }

  if (data.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        {loading ? (
          <ActivityIndicator size="large" color="black" />
        ) : (
          <Text>No items in cart</Text>
        )}
      </View>
    );
  } else {
    return (
      <ScrollView style={{ backgroundColor: "white", flex: 1 }}>
        {data?.map((item, index) => (
          <View style={{ padding: 20 }} key={index}>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Image
                source={{ uri: item.imageUri }}
                style={{ width: 150, height: 150 }}
              />
              <View
                style={{
                  marginHorizontal: 16,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 16 }}>{item.title}</Text>
                <Text style={{ fontSize: 16 }}>{item.subtitle}</Text>
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <Pressable
                    onPress={() => {
                      setItems((prev) => {
                        const newItems = [...prev];
                        newItems[index].amount += 1;
                        return newItems;
                      });
                    }}
                  >
                    <Text style={{ fontSize: 16 }}>+</Text>
                  </Pressable>
                  <Text style={{ fontSize: 16, marginHorizontal: 8 }}>
                    {item.amount}
                  </Text>
                  <Pressable
                    onPress={() => {
                      setItems((prev) => {
                        const newItems = [...prev];

                        newItems[index].amount -= 1;
                        return newItems;
                      });
                    }}
                  >
                    <Text style={{ fontSize: 16 }}>{"-"}</Text>
                  </Pressable>
                </View>
                <Text style={{ fontSize: 16, fontWeight: 600 }}>
                  {item.price} {"/-"} {item.currency}
                </Text>
              </View>
            </View>
            {/* <Text style={{ fontWeight: 700, fontSize: 12, marginTop: 12 }}>
              Estimated delivery between 11 Mar - 12 Mar
            </Text> */}
          </View>
        ))}

        <View
          style={{
            borderTopColor: "grey",
            borderTopWidth: 1,
            marginHorizontal: 20,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 20,
            }}
          >
            <Text style={{ fontSize: 16 }}>Sub Total</Text>

            <Text style={{ fontSize: 16, fontWeight: 600 }}>
              {data.reduce((acc, item) => acc + item.price * item.amount, 0)}
              {"/-"} {currency}
            </Text>
          </View>

          <Text style={{ lineHeight: 24, color: "grey", fontSize: 14 }}>
            Shipping charges, taxes and discount codes are calculated at the
            time of accounting.
          </Text>
        </View>
      </ScrollView>
    );
  }
}

export default index;
