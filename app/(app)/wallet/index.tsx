import { router } from "expo-router";
import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";

function index() {
  const [funds, setFunds] = React.useState(2640.0);
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
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 60,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "#555555",
            letterSpacing: 1,
            fontWeight: 300,
          }}
        >
          Available Funds
        </Text>
        <Text
          style={{
            letterSpacing: 4,
            fontSize: 32,
            marginTop: 20,
            fontWeight: 300,
          }}
        >
          ${funds}
        </Text>
        <Pressable
          onPress={() => {
            router.push("/wallet/addFunds");
          }}
          style={{
            paddingHorizontal: 20,
            paddingVertical: 20,
            borderWidth: 1,
            borderColor: "#dedede",
            width: "95%",
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontSize: 15,
              textAlign: "center",
              fontWeight: 600,
            }}
          >
            Add Funds
          </Text>
        </Pressable>
      </View>
      <Text
        style={{
          marginVertical: 20,
          marginLeft: 10,
          letterSpacing: 1,
          fontWeight: 300,
        }}
      >
        Transaction History
      </Text>
      <View
        style={{
          marginHorizontal: 30,
        }}
      >
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
      </View>
      <Pressable
        onPress={() => {
          router.push("/wallet/walletHistory");
        }}
      >
        <Text
          style={{
            marginVertical: 20,
            marginHorizontal: 20,
            borderTopColor: "#dedede",
            textAlign: "center",
            borderTopWidth: 1,
            paddingTop: 20,
            letterSpacing: 1,
            fontWeight: 300,
            fontSize: 18,
          }}
        >
          View All Transactions
        </Text>
      </Pressable>
    </View>
  );
}

export default index;
