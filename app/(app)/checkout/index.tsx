import Tag from "@/components/home/Tag";

import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Image,
  View,
  Text,
  Pressable,
  FlatList,
} from "react-native";

function formatDate(date: Date) {
  const day = date.getDate().toString().padStart(2, "0");
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];
  return `${day} ${month}`;
}

type item = {
  image: string;
  title: string;
  subtitle: string;
  price: number;
  quantity: number;
  size: number;
  estimatedDelivery: string[];
};

// const data = [
//   {
//     image: "https://www.istockphoto.com/photos/converse-sneakers",
//     title: "Title",
//     subtitle: "Subtitle",
//     price: 100,
//     originalPrice: 200,
//     discountPercentage: 50,
//     id: 1,
//   },

//   {
//     image: "https://picsum.photos/200/300",
//     title: "Title",
//     subtitle: "Subtitle",
//     price: 100,
//     originalPrice: 200,
//     discountPercentage: 50,
//     id: 2,
//   },

//   {
//     image: "https://picsum.photos/200/300",
//     title: "Title",
//     subtitle: "Subtitle",
//     price: 100,
//     originalPrice: 200,
//     discountPercentage: 50,
//     id: 3,
//   },

//   {
//     image: "https://picsum.photos/200/300",
//     title: "Title",
//     subtitle: "Subtitle",
//     price: 100,
//     originalPrice: 200,
//     discountPercentage: 50,
//     id: 4,
//   },
// ];

// const tags = [
//   "Trendy",
//   "Heels",
//   "Women",
//   "Stilletos",
//   "Shoe",
//   "Heels",
//   "Women",
//   "Stilletos",
//   "Shoe",
//   "Heels",
//   "Women",
//   "Stilletos",
//   "Shoe",
// ];

function index() {
  const [deliveryPincode, setDeliveryPincode] = React.useState("120021");
  const [deliveryCity, setDeliveryCity] = React.useState("Gurugram");
  const [showSizeOverlay, setShowSizeOverlay] = React.useState(false);

  const [items, setItems] = React.useState<item[]>([]);

  async function getData() {
    const userDetails = await AsyncStorage.getItem("userDetails");
    if (!userDetails) return;
    const user = JSON.parse(userDetails) as IUser;
    try {
      console.log("asdfjk");
      const result = await fetch(`${BASE_URL}cart`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": user.token,
        },
      });
      const data = await result.json();
      // console.log(data.data.items);
      //
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

      let d: item[] = [];
      data.data.items.forEach((item: any) => {
        if (productIds.includes(item.productId)) {
          const today = new Date();
          const deliveryEnd = new Date(today);
          deliveryEnd.setDate(today.getDate() + 7);

          const p: item = {
            image: item.coverImage,
            title: item.productName,
            subtitle: item.description,
            quantity: item.quantity,
            estimatedDelivery: [formatDate(today), formatDate(deliveryEnd)],
            price: (regionData.data as any[]).find(
              (val) => val.product_id === item.productId,
            ).price,
            size: 36,
          };
          d.push(p);
        }
      });

      setItems(d);

      // setItems(data.items);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);
  return (
    <ScrollView style={{ backgroundColor: "white", flex: 1 }}>
      <Image
        source={require("../../../assets/offers/deals_banner.png")}
        style={{ width: "100%", marginVertical: 20 }}
      />

      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderWidth: 1,
          borderColor: "gray",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: 10,
        }}
      >
        <View>
          <Text style={{ fontSize: 16, fontWeight: 600 }}>
            Delivery to {deliveryPincode}
          </Text>
          <Text style={{ fontSize: 16, fontWeight: 600, color: "#555555" }}>
            Delivery to {deliveryCity}
          </Text>
        </View>

        <Pressable
          style={{
            padding: 10,
            borderColor: "gray",
            borderWidth: 1,
          }}
        >
          <Text style={{ letterSpacing: 4, fontSize: 16 }}>CHANGE</Text>
        </Pressable>
      </View>

      {items.length === 0 ? (
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <Text>No items in checkout</Text>
        </View>
      ) : (
        <View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignContent: "center",
              justifyContent: "space-between",
              paddingHorizontal: 10,
              paddingVertical: 15,
              backgroundColor: "#F8F0E7",
              marginVertical: 20,
            }}
          >
            <Text>{items.length} items selected</Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                width: "20%",
                justifyContent: "space-around",
              }}
            >
              {/* <Image
                    style={{ width: 15, height: 15 }}
                    source={require("../../../assets/images/icons/search.png")}
                  />
                  <Image
                    style={{ width: 15, height: 15 }}
                    source={require("../../../assets/images/icons/search.png")}
                  />
                  <Image
                    style={{ width: 15, height: 15 }}
                    source={require("../../../assets/images/icons/search.png")}
                  /> */}
            </View>
          </View>
          <View>
            {items.map((val, index) => {
              return (
                <Item
                  key={index}
                  price={val.price}
                  image={val.image}
                  quantity={val.quantity}
                  size={val.size}
                  estimatedDelivery={val.estimatedDelivery}
                />
              );
            })}
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignContent: "center",
              justifyContent: "space-between",
              paddingHorizontal: 10,
              paddingVertical: 15,
              backgroundColor: "#F8F0E7",
              marginVertical: 20,
            }}
          >
            <Text>Assured Quality | 100% Handpicked | Easy Exchange</Text>
          </View>
          {/* <Text
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  marginHorizontal: 10,
                  letterSpacing: 1.6,
                }}
              >
                YOU MAY ALSO LIKE
              </Text>
              <View>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={tags}
                  style={{ marginTop: 40 }}
                  renderItem={(val) => <Tag title={val.item} />}
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
                      <View style={{ display: "flex", flexDirection: "row" }}>
                        <Text style={{ fontSize: 16, fontWeight: 600 }}>
                          ${val.item.price}
                        </Text>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: 400,
                            marginHorizontal: 10,
                            textDecorationLine: "line-through",
                          }}
                        >
                          ${val.item.originalPrice}
                        </Text>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: 400,
                            marginRight: 20,
                            color: "green",
                          }}
                        >
                          {val.item.discountPercentage}% off
                        </Text>
                      </View>
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
              </View> */}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
              }}
            >
              <Image
                style={{
                  width: 15,
                  height: 15,
                  justifyContent: "center",
                  marginRight: 10,
                  alignItems: "center",
                  alignContent: "center",
                }}
                source={require("../../../assets/images/icons/search.png")}
              />
              <Text style={{ fontSize: 16 }}>Apply Coupon</Text>
            </View>

            <Text style={{ marginHorizontal: 10, fontSize: 16 }}>Select</Text>
          </View>
          <View style={{ padding: 10 }}>
            <Text style={{ fontSize: 16, letterSpacing: 2, fontWeight: 600 }}>
              price details ({items.length} items)
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <View style={{ flex: 1 }}>
                <Text style={{ marginTop: 8, fontWeight: 300 }}>Bag Total</Text>
                <Text style={{ marginTop: 8, fontWeight: 300 }}>
                  Bag Savings
                </Text>
                <Text style={{ marginTop: 8, fontWeight: 300 }}>
                  Coupon Savings
                </Text>
                <Text style={{ marginTop: 8, fontWeight: 300 }}>
                  Platform Fee
                </Text>
                <Text style={{ marginTop: 8, fontWeight: 300 }}>
                  Shipping Fee
                </Text>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Text style={{ marginTop: 8, fontWeight: 300 }}>
                  ${items.reduce((acc, val) => acc + val.price, 0)}
                </Text>
                <Text style={{ marginTop: 8, fontWeight: 300 }}>$0.00</Text>
                <Text style={{ marginTop: 8, fontWeight: 300 }}>$0.00</Text>
                <Text style={{ marginTop: 8, fontWeight: 300 }}>$5</Text>
                <Text style={{ marginTop: 8, fontWeight: 300 }}>FREE</Text>
              </View>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                borderTopColor: "gray",
                borderTopWidth: 1,
                marginTop: 20,
                paddingTop: 20,
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 16, letterSpacing: 3 }}>
                {" "}
                EST. TOTAL{" "}
              </Text>
              <Text style={{ fontSize: 16, letterSpacing: 3 }}>
                ${items.reduce((a, b) => a + b.price, 0) + 5}
              </Text>
            </View>
          </View>
          <Text
            style={{
              fontSize: 16,
              letterSpacing: 3,
              marginVertical: 20,
              textAlign: "center",
            }}
          >
            YOU SAVED <Text style={{ color: "green" }}>$120</Text> ON THIS ORDER
          </Text>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <View
              style={{
                flex: 3,
                padding: 20,
                borderTopColor: "gray",
                borderTopWidth: 1,
              }}
            >
              <Text
                style={{ fontSize: 16, letterSpacing: 3, textAlign: "center" }}
              >
                ${items.reduce((a, b) => a + b.price, 0) + 5}
              </Text>
            </View>
            <Pressable
              style={{
                flex: 7,
                padding: 20,
                backgroundColor: "black",
              }}
              onPress={async () => {
                // // console.log(await result.json());

                const itemsToPass = items.map(
                  (val) => `
                      ${val.title}SEP${val.subtitle}SEP${val.price}SEP${val.size}SEP${val.image}SEP${val.estimatedDelivery}SEP${val.quantity}SEP`,
                );
                router.push({
                  pathname: "/checkout/payment",
                  params: {
                    items: itemsToPass,
                  },
                });
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  letterSpacing: 3,
                  color: "white",
                  textAlign: "center",
                }}
              >
                PROCEED TO BUY
              </Text>
            </Pressable>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

export default index;

import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUser } from "@/constants/types";
import { BASE_URL } from "@/constants/constant";
import axios from "axios";

function Item({
  image,
  quantity,
  size,
  price,
  estimatedDelivery,
}: {
  image: string;
  quantity: number;
  size: number;
  price: number;
  estimatedDelivery: string[];
}) {
  const sizes = ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"];
  const numsLeft = 5;
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [selectedQuantity, setSelectedQuantity] = useState(0);

  return (
    <View style={{ margin: 10 }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          height: 200,
        }}
      >
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />

        <View
          style={{
            marginHorizontal: 10,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <Text style={{ fontSize: 12, color: "#555555" }}>Saint G</Text>
          <Text>Black Boots With Glittery Stars</Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "50%",
            }}
          >
            <Text style={{ marginRight: 10 }}>Size </Text>
            <Picker
              selectedValue={selectedSize}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedSize(itemValue)
              }
            >
              {sizes.map((val, index) => (
                <Picker.Item key={index} label={val} value={val} />
              ))}
            </Picker>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "50%",
            }}
          >
            <Text style={{ marginRight: 10 }}>Qty </Text>
            <Picker
              selectedValue={selectedQuantity}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedQuantity(itemValue)
              }
            >
              {Array(numsLeft)
                .fill(0)
                .map((_, i) => i + 1)
                .map((val, index) => (
                  <Picker.Item key={index} label={val.toString()} value={val} />
                ))}
            </Picker>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text>Total</Text>
            <Text>{price}</Text>
          </View>
        </View>
      </View>
      <Text>Estimated Delivery Between {estimatedDelivery.join("-")}</Text>
    </View>
  );
}
