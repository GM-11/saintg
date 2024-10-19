import React from "react";
import { Image, StyleSheet, FlatList } from "react-native";

function Offers() {
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={Array(4).fill(require("../../assets/offers/offer_banner.png"))}
      renderItem={(val) => <Image style={{ margin: 8 }} source={val.item} />}
    />
  );
}

const styles = StyleSheet.create({});

export default Offers;
