import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";

const sizes = [36, 40, 42, 45, 50, 66];
function SelectSizeOverlay() {
  const [selectedSize, setSelectedSize] = React.useState(sizes[0]);

  return (
    <View
    //   style={{
    //     backgroundColor: "rgba(0, 0, 0, 0.63)",
    //     position: "relative",
    //   }}
    >
      <View style={{ display: "flex", flexDirection: "row" }}>
        {sizes.map((size) => (
          <Pressable
            key={size}
            onPress={() => setSelectedSize(size)}
            style={{
              width: 30,
              height: 30,
              borderRadius: 100,
              backgroundColor: selectedSize === size ? "gray" : "white",
              margin: 5,
              borderColor: "gray",
              padding: 1,
              borderWidth: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: selectedSize === size ? "white" : "black",
              }}
            >
              {size}
            </Text>
          </Pressable>
        ))}

        <Pressable>
          <Text>ADD TO BAG</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default SelectSizeOverlay;
