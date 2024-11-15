import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Checkbox from "../Checkbox";

const colors = [
  {
    name: "Red",
    hex: "#FF0000",
  },
  {
    name: "Green",
    hex: "#00FF00",
  },
  {
    name: "Blue",
    hex: "#0000FF",
  },
  {
    name: "Yellow",
    hex: "#FFFF00",
  },
  {
    name: "Cyan",
    hex: "#00FFFF",
  },
  {
    name: "Magenta",
    hex: "#FF00FF",
  },
  {
    name: "Black",
    hex: "#000000",
  },
  {
    name: "Off White",
    hex: "#f2f4f5",
  },
];

function Colors() {
  return (
    <View>
      {colors.map((val) => (
        <View
          style={{
            padding: 10,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
          key={colors.indexOf(val)}
        >
          <Checkbox />
          <View
            style={{
              width: 20,
              height: 20,
              backgroundColor: val.hex,
              borderRadius: 100,
              marginLeft: 10,
            }}
          />
          <Text style={{ fontSize: 14, marginLeft: 10 }}>{val.name} (746)</Text>
        </View>
      ))}
    </View>
  );
}

export default Colors;
