import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Checkbox from "../Checkbox";

const discounts = [
  { lower: 10, upper: 20 },
  { lower: 21, upper: 30 },
  { lower: 31, upper: 40 },
  { lower: 41, upper: 50 },
  { lower: 51, upper: 80 },
];

function Discount() {
  return (
    <View>
      {discounts.map((val) => (
        <View
          key={discounts.indexOf(val)}
          style={{
            padding: 10,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Checkbox />
          <Text style={{ fontSize: 14, marginLeft: 10 }}>
            {val.lower} - {val.upper}% (746)
          </Text>
        </View>
      ))}
    </View>
  );
}

export default Discount;
