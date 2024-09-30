import React from "react";
import CustomCarousel from "../CustomCarousel";
import {
  FlatList,
  ImageBackground,
  View,
  Text,
  ScrollView,
  Image,
} from "react-native";

// const data = [
//   {
//     image: { uri: require("../assets/partners/1.png") },
//   },
//   {
//     image: { uri: require("../assets/partners/2.png") },
//   },
//   {
//     image: { uri: require("../assets/partners/3.png") },
//   },
//   {
//     image: { uri: require("../assets/partners/4.png") },
//   },
//   {
//     image: { uri: require("../assets/partners/5.png") },
//   },
//   {
//     image: { uri: require("../assets/partners/6.png") },
//   },
// ];

function Partners() {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      style={{
        width: "100%",
        marginVertical: 12,
      }}
    >
      <Image
        style={{ marginHorizontal: 12 }}
        source={require("../../assets/partners/1.png")}
      />
      <Image
        style={{ marginHorizontal: 12 }}
        source={require("../../assets/partners/2.png")}
      />
      <Image
        style={{ marginHorizontal: 12 }}
        source={require("../../assets/partners/3.png")}
      />
      <Image
        style={{ marginHorizontal: 12 }}
        source={require("../../assets/partners/2.png")}
      />
      <Image
        style={{ marginHorizontal: 12 }}
        source={require("../../assets/partners/3.png")}
      />
      <Image
        style={{ marginHorizontal: 12 }}
        source={require("../../assets/partners/1.png")}
      />
      <Image
        style={{ marginHorizontal: 12 }}
        source={require("../../assets/partners/1.png")}
      />
    </ScrollView>
  );
}

export default Partners;
