import textStyles from "@/styles/textStyles";
import React from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ImageBackground,
} from "react-native";
import CustomCarousel from "../CustomCarousel";

const data = [
  {
    id: "1",
    title: "NEW SEASON",
    subtitle: "Latest styles for your summer refresh",
    image: {
      uri: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    },
  },
  {
    id: "2",
    title: "WINTER COLLECTION",
    subtitle: "Cozy and stylish for the cold weather",
    image: {
      uri: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    },
  },
  {
    id: "3",
    title: "SPRING BLOSSOMS",
    subtitle: "Fresh looks for the new season",
    image: {
      uri: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
    },
  },
  {
    id: "4",
    title: "FALL FAVORITES",
    subtitle: "Warm and comfortable outfits",
    image: {
      uri: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a",
    },
  },
  {
    id: "5",
    title: "CASUAL WEAR",
    subtitle: "Comfort meets style in casual wear",
    image: {
      uri: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb",
    },
  },
];

function FeaturedCollection() {
  return (
    <View>
      <CustomCarousel
        titleStyle={textStyles.title}
        subTitleStyle={textStyles.subtitle}
        title={"FEATURED COLLECTION"}
        data={data}
        imageHeight="20vh"
        imageWidth="100vw"
        additionalStyles={{}}
      />
    </View>
  );
}

const styles = StyleSheet.create({});

export default FeaturedCollection;
