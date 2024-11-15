import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function Checkbox() {
  const [checked, setChecked] = useState(false);
  return (
    <Pressable
      style={[styles.checkboxBase, checked && styles.checkboxChecked]}
      onPress={() => setChecked(!checked)}
    >
      {checked ? (
        <Ionicons name="checkmark" size={24} color="white" />
      ) : (
        <View />
      )}
    </Pressable>
  );
}

export default Checkbox;
const styles = StyleSheet.create({
  checkboxBase: {
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "transparent",
  },
  checkboxChecked: {
    padding: 4,
    backgroundColor: "black",
  },
  appContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  checkboxLabel: {
    padding: 8,
    marginLeft: 8,
    fontWeight: "500",
    fontSize: 18,
  },
});
