import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
// import { CheckCircle } from "react-native-feather";

const PaymentSuccessScreen = () => {
  const { orderId } = useLocalSearchParams();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>PAYMENT SUCCESS</Text>

      <Image
        source={require("../../../assets/images/icons/payment-success.png")}
        style={{
          marginVertical: 12,
        }}
      />
      <Text style={styles.message}>Your payment was successful!</Text>
      <Text style={styles.subMessage}>Your order has been placed.</Text>
      <Text style={styles.orderId}>Order ID : {orderId}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          router.push("/(app)/(tabs)/account/orders");
        }}
      >
        <Text style={styles.buttonText}>TRACK ORDER</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => {
          router.push("/");
        }}
      >
        <Text style={styles.linkButtonText}>BACK TO SHOPPING</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  icon: {
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    marginBottom: 10,
  },
  subMessage: {
    fontSize: 16,
    marginBottom: 20,
  },
  orderId: {
    fontSize: 14,
    marginBottom: 30,
  },
  button: {
    backgroundColor: "black",
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginBottom: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "400",
    letterSpacing: 4,
  },
  linkButton: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: "black",
  },
  linkButtonText: {
    color: "black",
    fontSize: 14,
    letterSpacing: 4,
    fontWeight: "400",
  },
});

export default PaymentSuccessScreen;
