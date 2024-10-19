import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Checkbox from "../Checkbox";

const types = ["Stilletoe", "Block Heels", "Mules", "Pump", "Wedge Heels"];

function HeelType() {
  return (
    <View>
      {types.map((val) => (
        <View
          style={{
            padding: 10,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
          key={types.indexOf(val)}
        >
          <Checkbox />
          <Text style={{ fontSize: 14, marginLeft: 10 }}>{val} (746)</Text>
        </View>
      ))}
    </View>
  );
}

export default HeelType;
