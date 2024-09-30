import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";

function walletHistory() {
  const [walletHisotry, setWalletHistory] = React.useState([
    {
      type: "Funds Added",
      amount: 1000.0,
      date: new Date(),
    },
    {
      type: "Funds Added",
      amount: 1000.0,
      date: new Date(),
    },
    {
      type: "Funds Added",
      amount: 1000.0,
      date: new Date(),
    },
    {
      type: "Funds Added",
      amount: 1000.0,
      date: new Date(),
    },
  ]);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white", padding: 30 }}>
      {walletHisotry.map((history, index) => (
        <View
          key={index}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 10,
          }}
        >
          <Text
            style={{
              color: "#555555",
              letterSpacing: 1,
              fontWeight: 300,
              fontSize: 16,
            }}
          >
            {history.type}
          </Text>
          <Text
            style={{
              letterSpacing: 1,
              fontWeight: 300,
              fontSize: 16,
            }}
          >
            ${history.amount}
          </Text>
          <Text
            style={{
              letterSpacing: 1,
              fontWeight: 300,
              fontSize: 16,
            }}
          >
            {history.date.toLocaleDateString()}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

export default walletHistory;
