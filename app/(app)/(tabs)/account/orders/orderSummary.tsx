import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View, Image, Pressable, StyleSheet } from "react-native";

function orderSummary() {
  const { orderId, date, status } = useLocalSearchParams();
  const data = {
    orderId,
    quantity: 2,
    size: 36,
    price: 245,
    personName: "Nishita Verma",
    personNumber: "(91) 76542 12745",
    deliveryAddress:
      "606-37, Divine Villas, Roseville NH, Mohamadwadi, Pune - 114323",
  };

  return (
    <View style={{ backgroundColor: "white", flex: 1, padding: 10 }}>
      <View>
        <Text style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>
          {status}
        </Text>
        <Text style={{ fontSize: 14, marginBottom: 10 }}>
          {status === "Processing"
            ? `Expected by ${date}`
            : `Delivered on ${date}`}
        </Text>
      </View>

      <View style={{ display: "flex", flexDirection: "row", width: 350 }}>
        <Image
          source={{
            uri: "https://via.placeholder.com/150",
          }}
          style={{
            width: 150,
            height: 150,
          }}
        />
        <View style={{ marginHorizontal: 12, width: 360 }}>
          <Text style={{ letterSpacing: 1 }}>Saint G</Text>
          <Text style={{ letterSpacing: 1, width: "70%" }}>
            Black boots with glittery {"\n"}stars
          </Text>
          <View
            style={{ display: "flex", flexDirection: "row", marginTop: 12 }}
          >
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 12, color: "gray", fontWeight: 400 }}>
                Size
              </Text>
              <Text style={{ fontSize: 12, color: "gray", fontWeight: 400 }}>
                Quantity
              </Text>
              <Text style={{ fontSize: 12, color: "gray", fontWeight: 400 }}>
                OrderId
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <Text style={{ fontSize: 12, fontWeight: 400 }}>{data.size}</Text>
              <Text style={{ fontSize: 12, fontWeight: 400 }}>
                {data.quantity}
              </Text>
              <Text style={{ fontSize: 12, fontWeight: 400 }}>
                {data.orderId}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Pressable style={styles.button}>
          <Text style={{ color: "white", textAlign: "center" }}>
            {status === "Delivered" ? "Return" : "Cancel Order"}
          </Text>
        </Pressable>
        <Pressable style={styles.button}>
          <Text style={{ color: "white", textAlign: "center" }}>
            {status === "Delivered" ? "Cancel Order" : "Track Order"}
          </Text>
        </Pressable>
      </View>

      <View
        style={{ backgroundColor: "#FCFCFC", padding: 8, marginVertical: 8 }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: 600,
            marginBottom: 16,
          }}
        >
          Delivery Address
        </Text>

        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text style={{ fontWeight: 600, fontSize: 14, marginRight: 12 }}>
            {data.personName}
          </Text>
          <Text style={{ fontWeight: 600, fontSize: 14 }}>
            {data.personNumber}
          </Text>
        </View>
        <Text style={{ fontSize: 14, width: "70%" }}>
          {data.deliveryAddress}
        </Text>
      </View>
      <View
        style={{ backgroundColor: "#FCFCFC", padding: 8, marginVertical: 8 }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              Total Order Price
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 400,
              }}
            >
              You saved $120 on this order
            </Text>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              ${data.price}
            </Text>

            <Text
              style={{
                fontSize: 12,
                fontWeight: 400,
              }}
            >
              View Breakup
            </Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: 16,
            alignItems: "center",
          }}
        >
          <Image
            style={{ width: 15, height: 15 }}
            source={require("../../../../../assets/images/icons/search.png")}
          />
          <Text style={{ marginLeft: 12 }}> Paid by Credit Card</Text>
        </View>

        <Pressable
          style={{
            width: "100%",
            borderWidth: 1,
            borderColor: "gray",
            paddingVertical: 10,
            marginVertical: 8,
          }}
        >
          <Text style={{ color: "black", textAlign: "center" }}>
            Get Invoice
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

export default orderSummary;

const styles = StyleSheet.create({
  button: {
    padding: 12,
    backgroundColor: "black",
    color: "white",
    width: "45%",
    margin: 4,
    marginTop: 12,
  },
});
