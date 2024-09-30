import Colors from "@/components/filters/Colors";
import Discount from "@/components/filters/Discount";
import Gender from "@/components/filters/Gender";
import HeelHeight from "@/components/filters/HeelHeight";
import HeelType from "@/components/filters/HeelType";
import Price from "@/components/filters/Price";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View, Image, Pressable } from "react-native";

const filters = [
  "Gender",
  "Categories",
  "Price",
  "Occasion",
  "Discount",
  "Heel Type",
  "Heel Height",
  "Colors",
  "Rating",
  "Quick Filter",
];

function filter() {
  const { numProducts } = useLocalSearchParams();
  const [selecetedFilter, setSelecedFilter] = React.useState(0);
  return (
    <>
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <View
          style={{
            borderBottomColor: "gray",
            borderBottomWidth: 1,
            padding: 20,
            marginTop: 40,
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Pressable
              onPress={() => {
                router.back();
              }}
            >
              <Image
                source={require("../../../assets/images/icons/backward.png")}
              />
            </Pressable>
            <Text style={{ fontSize: 16 }}>
              Filters ({numProducts} products)
            </Text>
          </View>
        </View>
        <View style={{ display: "flex", flexDirection: "row", flex: 1 }}>
          <View style={{ width: "20%", backgroundColor: "#dfe5eb", flex: 3 }}>
            {filters.map((val) => (
              <View
                key={filters.indexOf(val)}
                style={
                  selecetedFilter === filters.indexOf(val)
                    ? {
                        backgroundColor: "white",
                        padding: 10,
                      }
                    : {
                        backgroundColor: "#dfe5eb",
                        padding: 10,
                      }
                }
              >
                <Pressable
                  onPress={() => setSelecedFilter(filters.indexOf(val))}
                >
                  <Text>
                    {filters.indexOf(val)} {val}
                  </Text>
                </Pressable>
              </View>
            ))}
          </View>
          <View style={{ width: "80%", flex: 7 }}>
            {selecetedFilter === 0 ? <Gender /> : <View />}
            {selecetedFilter === 2 ? <Price /> : <View />}
            {selecetedFilter === 4 ? <Discount /> : <View />}
            {selecetedFilter === 5 ? <HeelType /> : <View />}
            {selecetedFilter === 6 ? <HeelHeight /> : <View />}
            {selecetedFilter === 7 ? <Colors /> : <View />}
          </View>
        </View>
      </View>

      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          backgroundColor: "#dfe5eb",
          justifyContent: "space-between",
        }}
      >
        <Pressable
          style={{
            paddingHorizontal: 24,
            paddingVertical: 8,
            flex: 3,
            margin: 12,
            borderWidth: 1,
            borderColor: "black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 16, letterSpacing: 4 }}>RESET</Text>
        </Pressable>
        <Pressable
          style={{
            paddingHorizontal: 28,
            paddingVertical: 8,
            flex: 7,
            margin: 12,
            display: "flex",
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 16, letterSpacing: 4 }}>
            APPLY FILTERS
          </Text>
        </Pressable>
      </View>
    </>
  );
}

export default filter;
