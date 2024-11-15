import React from "react";
import { Text, View, StyleSheet } from "react-native";
import RangeSlider from "rn-range-slider";
// import Slider from "@react-native-community/slider";
// import MultiSlider from "@ptomasroos/react-native-multi-slider";

function Price() {
  const [upper, setUpper] = React.useState(0);
  const [lower, setLower] = React.useState(0);

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
      }}
    >
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Text>{upper}</Text>
        <Text>{lower}</Text>
      </View>
      <RangeSlider
        min={0}
        max={20}
        step={0}
        style={{ width: 160, height: 80 }}
        renderThumb={() => (
          <View
            style={{
              width: 12 * 2,
              height: 12 * 2,
              borderRadius: 12,
              borderWidth: 2,
              borderColor: "#7f7f7f",
              backgroundColor: "#aaaaaa",
            }}
          >
            <Text></Text>
          </View>
        )}
        renderRail={() => (
          <View
            style={{
              flex: 1,
              height: 4,
              borderRadius: 2,
              backgroundColor: "#7f7f7f",
            }}
          >
            <Text></Text>
          </View>
        )}
        renderRailSelected={() => (
          <View
            style={{
              flex: 1,
              height: 4,
              borderRadius: 2,
              backgroundColor: "#7f7f7f",
            }}
          ></View>
        )}
        renderNotch={() => (
          <View
            style={{
              width: 8,
              height: 8,
              borderLeftColor: "transparent",
              borderRightColor: "transparent",
              borderTopColor: "#4499ff",
              borderLeftWidth: 4,
              borderRightWidth: 4,
              borderTopWidth: 8,
            }}
          ></View>
        )}
      />
    </View>
  );
}

export default Price;
