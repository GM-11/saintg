import React, { useState } from "react";
import { Text, View, StyleSheet, Switch } from "react-native";

function settings() {
  const [isEnabled, setIsEnabled] = useState(false);
  function toggleSwitch() {
    setIsEnabled((previousState: boolean) => !previousState);
  }

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 20,
          alignItems: "center",
        }}
      >
        <View>
          <Text style={{ fontSize: 16 }}>Language</Text>
          <Text style={{ fontSize: 16, fontWeight: 300 }}>
            Select your preffered language
          </Text>
        </View>
        <Text style={{ fontSize: 16 }}>English</Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 20,
          alignItems: "center",
        }}
      >
        <View>
          <Text style={{ fontSize: 16 }}>Notification</Text>
          <Text style={{ fontSize: 16, fontWeight: 300 }}>
            This won't affect your orders
          </Text>
        </View>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 20,
          alignItems: "center",
        }}
      >
        <View>
          <Text style={{ fontSize: 16 }}>Dark Mode</Text>
        </View>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </View>
  );
}

export default settings;
