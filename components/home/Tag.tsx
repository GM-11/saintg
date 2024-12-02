import React from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";
import { router } from "expo-router";

export default function Tag({ title }: { title: string }) {
  return (
    <View style={styles.mainContainer}>
      <Text
        style={{
          fontFamily: "Lato-Regular",
          fontSize: 12,
          textTransform: "capitalize",
        }}
      >
        #{title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#DEDEDE",

    fontFamily: "Lato-Regular",
    padding: 10,
    marginHorizontal: 4,
  },
});
