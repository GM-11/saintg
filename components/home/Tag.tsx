import React from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";
import { router } from "expo-router";

export default function Tag({ title }: { title: string }) {
  return (
    <View style={styles.mainContainer}>
      <Text>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#DEDEDE",
    padding: 10,
    marginHorizontal: 8,
  },
});
