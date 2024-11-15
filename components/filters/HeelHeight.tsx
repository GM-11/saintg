import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Checkbox from "../Checkbox";

const heigts = [5, 4, 3, 2, 1];

function HeelHeight() {
  return (
    <View>
      {heigts.map((val) => (
        <View
          style={{
            padding: 10,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
          key={heigts.indexOf(val)}
        >
          <Checkbox />
          <Text style={{ fontSize: 14, marginLeft: 10 }}>{val} inch (746)</Text>
        </View>
      ))}
    </View>
  );
}

export default HeelHeight;
