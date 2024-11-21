import React, { useEffect, useState } from "react";
import textStyles from "@/styles/textStyles";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUser } from "@/constants/types";
import { Link, router, useLocalSearchParams } from "expo-router";
import { BASE_URL, EXPO_PUBLIC_API_KEY } from "@/constants/constant";
import RazorpayCheckout from "react-native-razorpay";
import Toast from "react-native-toast-message";
import razorpayHandler from "@/handlers/razorpayHandler";
import { paypalHandler, verifyPayment } from "@/handlers/paypalHandler";
import WebView from "react-native-webview";

interface ProductItem {
  // id: string;
  name: string;
  description: string;
  size: string;
  price: number;
  estimatedDelivery: string;
  imageUrl: string;
  quantity: string;
}

const ConfirmOrderScreen = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [user, setUser] = useState<IUser>();
  const [showPaymentMethod, setShowPaymentMethod] = useState<boolean>(true);
  const [currency, setCurrency] = useState("GBP");
  const [webView, setWebView] = useState<string>("");
  const [showWebView, setShowWebView] = useState<boolean>(false);
  const [paypalPaymentId, setPaypalPaymentId] = useState<string>("");
  const [paypalOrderId, setPaypalOrderId] = useState<string>("");

  const { items } = useLocalSearchParams();

  const [productItems, setProductItems] = useState<ProductItem[]>([]);
  const paymentMethods = [
    // { id: "wallet", name: "Wallet" },
    // { id: "credit", name: "Credit / Debit Card" },
    // { id: "emi", name: "EMI UPI" },
    { id: "netbanking", name: "Net Banking" },
    { id: "cod", name: "Cash On Delivery (COD)" },
    { id: "paylater", name: "Pay Later" },
  ];

  const handlePaymentMethodSelect = (id: string) => {
    setSelectedPaymentMethod(id);
  };

  const handleMakePayment = async () => {
    const userDetails = await AsyncStorage.getItem("userDetails");
    if (!userDetails) return;
    const user = JSON.parse(userDetails) as IUser;

    if (user.address === "") {
      Toast.show({ text1: "Please add address" });

      return;
    }

    const addressId = user.address.substring(user.address.length - 1);

    const result = await fetch(`${BASE_URL}order/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": user.token,
      },
      body: JSON.stringify({
        addressId: parseInt(addressId),
        paymentMethod: "UPI",
      }),
    });

    const data = await result.json();
    console.log(data);
    if (data.error) {
      console.log(data.error);
      Toast.show({ text1: data.error });
      return;
    }

    try {
      let verify: Response | string;
      console.log(typeof user.regionId);
      if (user.regionId === "3") {
        verify = await razorpayHandler(user, data);
        if (typeof verify === "string") {
          Toast.show({ text1: verify });
          return;
        }

        if (verify.ok) {
          router.push({
            pathname: "/(app)/checkout/success",
            params: {
              orderId: data.orderId,
            },
          });
        }
      } else {
        const { url, orderId, paymentId } = await paypalHandler(
          user,
          data,
          currency,
          // productItems
          //   .reduce((a, b) => a + b.price * parseInt(b.quantity), 0)
          //   .toString(),
        );
        console.log(url);
        setWebView(url as string);
        setPaypalOrderId(orderId);
        setPaypalPaymentId(paymentId);
        setShowWebView(true);
      }
    } catch (error: any) {}
  };

  async function getData() {
    const userDetails = await AsyncStorage.getItem("userDetails");
    if (!userDetails) return;
    const user = JSON.parse(userDetails) as IUser;
    setUser(user);

    if (user.regionId === "1") setCurrency("GBP");
    if (user.regionId === "2") setCurrency("USD");
    if (user.regionId === "3") setCurrency("INR");

    let i: ProductItem[] = [];

    // for (let item of items as string[]) {
    const parts = (items as string).split("SEP");

    const map: ProductItem = {
      name: parts[0],
      description: parts[1],
      price: parseInt(parts[2]),
      size: parts[3],
      imageUrl: parts[4],
      estimatedDelivery: parts[5],
      quantity: parts[6],
    };
    console.log(map);
    i.push(map);
    // }

    setProductItems(i);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View>
        {showWebView ? (
          <View
            style={{
              alignSelf: "stretch",
            }}
          >
            <WebView
              style={{ left: 0, width: 450, height: 800 }}
              javaScriptEnabled
              onNavigationStateChange={async (state) => {
                if (state.url.includes("?message=success")) {
                  setShowWebView(false);
                  setWebView("");

                  const verify = await verifyPayment(
                    user!,
                    paypalOrderId,
                    paypalPaymentId,
                  );

                  if (verify.ok) {
                    router.push({
                      pathname: "/(app)/checkout/success",
                      params: {
                        orderId: paypalOrderId,
                      },
                    });
                  }
                }
              }}
              source={{
                uri: webView,
              }}
            />
          </View>
        ) : (
          <View>
            <View style={styles.addressContainer}>
              <Text style={styles.addressTitle}>DELIVERS TO</Text>
              <Text style={styles.addressName}>{user?.name}</Text>
              <Text style={styles.addressDetails}>
                {user && user.address ? (
                  user.address.substring(0, user.address.length - 6) + "\n"
                ) : (
                  <>
                    <Link
                      href={{
                        pathname: "/(app)/account/addresses",
                      }}
                    >
                      <Text> Add new address {"\n"} </Text>
                    </Link>
                  </>
                )}

                {user?.phoneNumber}
              </Text>
              <Pressable style={styles.changeButton}>
                <Text style={styles.changeButtonText}>CHANGE</Text>
              </Pressable>
            </View>

            <View style={styles.productContainer}>
              {productItems.map((item) => (
                <View
                  key={productItems.indexOf(item)}
                  style={styles.productItem}
                >
                  <Image
                    source={{ uri: item.imageUrl }}
                    style={styles.productImage}
                  />
                  <View style={styles.productDetails}>
                    <Text style={styles.productName}>{item.name}</Text>
                    {/* <Text style={styles.productDescription}>
                      {item.description}
                    </Text> */}
                    <Text style={styles.productSize}>Size: {item.size}</Text>
                    <Text style={styles.productSize}>
                      Quantity: {item.quantity}
                    </Text>
                  </View>
                  <Text style={styles.productPrice}>
                    {item.price} {"/-"} {currency}
                  </Text>
                </View>
              ))}
            </View>

            {/* <View
                   style={{
                     backgroundColor: "black",
                     padding: 16,
                     flexDirection: "row",
                     display: "flex",
                     justifyContent: "space-between",
                     width: "100%",
                     marginBottom: 12,
                   }}
                 >
                   <Text
                     style={{
                       color: "white",
                       letterSpacing: 1,
                       fontWeight: 300,
                     }}
                   >
                     PAYMENT METHOD
                   </Text>

                   <Pressable
                     onPress={() => {
                       setShowPaymentMethod((prev) => !prev);
                     }}
                   >
                     <Text
                       style={{
                         color: "white",
                         letterSpacing: 1,
                         fontWeight: 300,
                       }}
                     >
                       {showPaymentMethod ? "V" : "A"}
                     </Text>
                   </Pressable>
                 </View>
                 <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
                   {showPaymentMethod ? (
                     paymentMethods.map((method) => (
                       <TouchableOpacity
                         key={method.id}
                         style={styles.paymentMethodItem}
                         onPress={() => handlePaymentMethodSelect(method.id)}
                       >
                         <View style={styles.radioButton}>
                           {selectedPaymentMethod === method.id && (
                             <View style={styles.radioButtonInner} />
                           )}
                         </View>
                         <Text style={styles.paymentMethodName}>{method.name}</Text>
                       </TouchableOpacity>
                     ))
                   ) : (
                     <View />
                 </View>
                   )} */}
            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>TOTAL</Text>
              <Text style={styles.totalAmount}>
                {productItems.reduce(
                  (a, b) => a + b.price * parseInt(b.quantity),
                  0,
                )}
                {"/-"} {currency}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.makePaymentButton}
              onPress={handleMakePayment}
            >
              <Text style={styles.makePaymentButtonText}>MAKE PAYMENT</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backButton: {
    marginBottom: 16,
  },
  backButtonText: {
    fontSize: 24,
    fontWeight: "bold",
    ...textStyles.font,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    ...textStyles.font,
  },
  addressContainer: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    padding: 16,
    paddingVertical: 16,
    marginBottom: 16,
  },
  addressTitle: {
    fontSize: 14,
    // fontWeight: "bold",
    marginBottom: 8,
    ...textStyles.font,
  },
  addressName: {
    fontSize: 16,
    // fontWeight: "bold",
    marginBottom: 4,
    ...textStyles.font,
  },
  addressDetails: {
    fontSize: 14,
    marginBottom: 8,
    ...textStyles.font,
  },
  changeButton: {
    alignSelf: "flex-start",
  },
  changeButtonText: {
    color: "#000",
    fontWeight: "bold",
    ...textStyles.font,
  },
  productContainer: {
    marginBottom: 16,
    padding: 16,
  },
  productItem: {
    flexDirection: "row",
    marginBottom: 16,
  },
  productImage: {
    height: 100,
    width: 100,
    marginRight: 12,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    // fontWeight: "bold",
    ...textStyles.font,
  },
  productDescription: {
    fontSize: 14,
    ...textStyles.font,
  },
  productColor: {
    fontSize: 14,
    ...textStyles.font,
  },
  productSize: {
    fontSize: 14,
    ...textStyles.font,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    ...textStyles.font,
  },
  paymentMethodTitle: {
    fontSize: 16,
    marginBottom: 8,
    color: "white",
    width: "100%",
    ...textStyles.font,
  },
  paymentMethodItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#000",
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#000",
  },
  paymentMethodName: {
    fontSize: 16,
    ...textStyles.font,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
    padding: 16,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    ...textStyles.font,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
    ...textStyles.font,
  },
  makePaymentButton: {
    backgroundColor: "#000",
    paddingVertical: 16,
    alignItems: "center",
  },
  makePaymentButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    ...textStyles.font,
  },
});

export default ConfirmOrderScreen;
