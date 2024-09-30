import { BASE_URL } from "@/constants/constant";
import { IUser } from "@/constants/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

type t = {
  title: string;
  subtitle: string;
  amount: number;
  price: number;
  imageUri: string;
};

function index() {
  const [data, setItems] = useState<t[]>([]);

  async function getItems() {
    try {
      const userDetails = await AsyncStorage.getItem("userDetails");
      if (!userDetails) return;
      const user = JSON.parse(userDetails) as IUser;
      const result = await fetch(`${BASE_URL}/cart`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": user.token,
        },
      });
      const data = await result.json();
      console.log(data);

      if (data.code === 200) {
        setItems(
          data ?? [
            {
              title: "Item 1",
              subtitle: "Item 1 subtitle",
              amount: 1,
              price: 100,
              imageUri:
                "https://images.unsplash.com/photo-1612838320302-4b3b3b3b3b3b",
            },
            {
              title: "Item 2",
              subtitle: "Item 2 subtitle",
              amount: 1,
              price: 200,
              imageUri:
                "https://images.unsplash.com/photo-1612838320302-4b3b3b3b3b3b",
            },
          ],
        );
      } else {
        setItems([
          {
            title: "Item 1",
            subtitle: "Item 1 subtitle",
            amount: 1,
            price: 100,
            imageUri:
              "https://images.unsplash.com/photo-1612838320302-4b3b3b3b3b3b",
          },
          {
            title: "Item 2",
            subtitle: "Item 2 subtitle",
            amount: 1,
            price: 200,
            imageUri:
              "https://images.unsplash.com/photo-1612838320302-4b3b3b3b3b3b",
          },
        ]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    getItems();
  }, []);

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
        <Text style={{ fontSize: 24 }}>No items in cart</Text>
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
                    <Text style={{ fontSize: 16 }}>-</Text>
                  </Pressable>
                </View>
                <Text style={{ fontSize: 16, fontWeight: 600 }}>
                  ₹{item.price}
                </Text>
              </View>
            </View>
            <Text style={{ fontWeight: 700, fontSize: 12, marginTop: 12 }}>
              Estimated delivery between 11 Mar - 12 Mar
            </Text>
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
              ₹{data.reduce((acc, item) => acc + item.price * item.amount, 0)}
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
