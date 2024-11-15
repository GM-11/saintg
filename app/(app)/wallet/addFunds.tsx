import React from "react";
import { Text, View, StyleSheet, Pressable, TextInput } from "react-native";

function addFunds() {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          padding: 20,
          marginVertical: 40,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontWeight: 300,
            fontSize: 14,
            letterSpacing: 1,
            color: "#555555",
          }}
        >
          Enter Amount
        </Text>

        <TextInput
          style={{
            width: 400,
            height: 40,
            fontSize: 32,
            textAlign: "center",
          }}
          keyboardType="numeric"
          placeholder="0"
        />
      </View>
    </View>
  );
}

export default addFunds;
