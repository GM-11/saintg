import textStyles from "@/styles/textStyles";
import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  FlatList,
} from "react-native";
const data = [
  {
    id: 1,
    title: "WATCHES",
    image: {
      uri: "https://images.pexels.com/photos/2430953/pexels-photo-2430953.jpeg", // Watches
    },
  },
  {
    id: 2,
    title: "CLOTHING",
    image: {
      uri: "https://images.pexels.com/photos/2430953/pexels-photo-2430953.jpeg", // Watches
    },
  },
  {
    id: 3,
    title: "LINGERIE",
    image: {
      uri: "https://images.pexels.com/photos/2430953/pexels-photo-2430953.jpeg", // Watches
    },
  },
  {
    id: 4,
    title: "HANDBAGS",
    image: {
      uri: "https://images.pexels.com/photos/2430953/pexels-photo-2430953.jpeg", // Watches
    },
  },
  {
    id: 5,
    title: "EYE WEAR",
    image: {
      uri: "https://images.pexels.com/photos/2430953/pexels-photo-2430953.jpeg", // Watches
    },
  },
  {
    id: 6,
    title: "LUXE BEAUTY",
    image: {
      uri: "https://images.pexels.com/photos/2430953/pexels-photo-2430953.jpeg", // Watches
    },
  },
  {
    id: 7,
    title: "JEWELRY",
    image: {
      uri: "https://images.pexels.com/photos/2430953/pexels-photo-2430953.jpeg", // Watches
    },
  },
  {
    id: 8,
    title: "INDIE LUXE",
    image: {
      uri: "https://images.pexels.com/photos/2430953/pexels-photo-2430953.jpeg", // Watches
    },
  },
  {
    id: 9,
    title: "EDITOR'S PICK",
    image: {
      uri: "https://images.pexels.com/photos/2430953/pexels-photo-2430953.jpeg", // Watches
    },
  },
];

function AllAccess() {
  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
      }}
    >
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
        ALL ACCESS
      </Text>

      <FlatList
        key={"_"}
        data={data}
        style={{
          width: "100%",
        }}
        numColumns={3}
        renderItem={(val) => {
          return (
            <ImageBackground
              style={{ height: 100, width: 100, margin: 12 }}
              source={val.item.image}
            >
              <Text>{val.item.title}</Text>
            </ImageBackground>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});

export default AllAccess;
