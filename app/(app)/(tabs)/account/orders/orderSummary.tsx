import { BASE_URL } from "@/constants/constant";
import { IUser } from "@/constants/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { Text, View, Image, Pressable, StyleSheet } from "react-native";
import Toast from "react-native-toast-message";

function orderSummary() {
  const {
    orderId,
    date,
    status,
    quantity,
    price,
    personName,
    personNumber,
    deliveryAddress,
    size,
    productTitle,
    productSubtitle,
  } = useLocalSearchParams();

  const [orderImage, setOrderImage] = React.useState<string>("");
  const [paymentMethod, setPaymentMethod] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);

  async function getOrderDetails() {
    try {
      setLoading(true);
      const userDetails = await AsyncStorage.getItem("userDetails");
      if (!userDetails) return;
      const user = JSON.parse(userDetails) as IUser;
      const response = await fetch(`${BASE_URL}order/ByOrderId/${orderId}`, {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": user.token,
        },
      });

      if (!response.ok) {
        Toast.show({
          type: "error",
          text1: "Error showing details",
        });
        return;
      }

      const data = await response.json();

      setOrderImage(data.orderItems[0].product.product_images[0].image_url);
      setPaymentMethod(data.paymentDetails.paymentMethod);
    } catch (error) {
      setOrderImage("");
      Toast.show({
        type: "error",
        text1: "Error showing details",
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getOrderDetails();
  }, []);

  return (
    <>
      {loading ? (
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text> Loading </Text>
        </View>
      ) : (
        <View style={{ backgroundColor: "white", flex: 1, padding: 10 }}>
          <View>
            <Text style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>
              {status}
            </Text>
            <Text style={{ fontSize: 14, marginBottom: 10 }}>
              {status === "PENDING"
                ? `Expected by ${date}`
                : `Delivered on ${date}`}
            </Text>
          </View>

          <View style={{ display: "flex", flexDirection: "row", width: 350 }}>
            <Image
              source={{
                uri: orderImage,
              }}
              style={{
                width: 150,
                height: 150,
              }}
            />
            <View style={{ marginHorizontal: 12, width: 360 }}>
              <Text style={{ letterSpacing: 1, fontWeight: 600, width: "60%" }}>
                {productTitle}
              </Text>

              <Text style={{ letterSpacing: 1, width: "60%" }}>
                {productSubtitle}
              </Text>
              <View
                style={{ display: "flex", flexDirection: "row", marginTop: 12 }}
              >
                <View style={{ flex: 1 }}>
                  <Text
                    style={{ fontSize: 12, color: "gray", fontWeight: 400 }}
                  >
                    Size
                  </Text>
                  <Text
                    style={{ fontSize: 12, color: "gray", fontWeight: 400 }}
                  >
                    Quantity
                  </Text>
                  <Text
                    style={{ fontSize: 12, color: "gray", fontWeight: 400 }}
                  >
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
                  <Text style={{ fontSize: 12, fontWeight: 400 }}>{size}</Text>
                  <Text style={{ fontSize: 12, fontWeight: 400 }}>
                    {quantity}
                  </Text>
                  <Text style={{ fontSize: 12, fontWeight: 400 }}>
                    {orderId}
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
            {/* <Pressable
              style={{ ...styles.button, width: "98%" }}
              onPress={() => {
                Toast.show({
                  text1: "Cannot perform this action",
                });
              }}
            >
              <Text style={{ color: "white", textAlign: "center" }}>
                {status === "Delivered" ? "Return" : "Cancel Order"}
              </Text>
            </Pressable> */}
            {/* <Pressable style={styles.button}>
              <Text style={{ color: "white", textAlign: "center" }}>
                {status === "Delivered" ? "Cancel Order" : "Track Order"}
              </Text>
            </Pressable> */}
          </View>

          <View
            style={{
              backgroundColor: "#FCFCFC",
              padding: 8,
              marginVertical: 8,
            }}
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
                {personName}
              </Text>
              <Text style={{ fontWeight: 600, fontSize: 14 }}>
                {personNumber}
              </Text>
            </View>
            <Text style={{ fontSize: 14, width: "70%" }}>
              {deliveryAddress}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#FCFCFC",
              padding: 8,
              marginVertical: 8,
            }}
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
                {/* <Text
               style={{
                 fontSize: 12,
                 fontWeight: 400,
               }}
             >
               You saved $120 on this order
             </Text> */}
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
                  ${price}
                </Text>

                {/* <Text
                  style={{
                    fontSize: 12,
                    fontWeight: 400,
                  }}
                >
                  View Breakup
                </Text> */}
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
              <Text style={{ marginLeft: 12 }}> Paid by {paymentMethod}</Text>
            </View>

            {/* <Pressable
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
            </Pressable> */}
          </View>
        </View>
      )}
    </>
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
