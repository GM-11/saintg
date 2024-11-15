import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function TopCategory({ title }: { title: string }) {
  return (
    <Pressable style={{ margin: 0 }} onPress={() => {}}>
      <View style={styles.mainContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: "https://www.pngall.com/wp-content/uploads/13/Nike-Shoes-Jordan-PNG-Pic.png",
            }}
            style={styles.image}
          />
        </View>
        <Text style={{ width: 50, textAlign: "center" }}>{title}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 70,
    height: 70,
  },
  imageContainer: {
    backgroundColor: "#DEDEDE",
    borderRadius: 60,
    padding: 10,
    marginBottom: 10,
  },
});
