import React from "react";
import CustomCarousel from "../CustomCarousel";
import {
  FlatList,
  ImageBackground,
  View,
  Text,
  ScrollView,
  Image,
  ImageSourcePropType,
} from "react-native";
import textStyles from "@/styles/textStyles";

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

function Partners({
  data,
}: {
  data: {
    id: string;
    name: string;
    image: string;
  }[];
}) {
  console.log(data);
  return (
    <View>
      <Text
        style={{
          fontFamily: textStyles.title.fontFamily,
          letterSpacing: textStyles.title.letterSpacing,
          textAlign: "center",
          color: "black",
          fontSize: 16,
          marginVertical: 32,
        }}
      >
        PARTNERS
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        style={{
          width: "100%",
          marginVertical: 12,
        }}
      >
        {data.map((item) => {
          console.log(item);
          return (
            <Image
              key={data.indexOf(item)}
              style={{ marginHorizontal: 12, width: 200, height: 100 }}
              source={{ uri: item.image }}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

export default Partners;
