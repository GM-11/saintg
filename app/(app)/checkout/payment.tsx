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
import { Link, useLocalSearchParams } from "expo-router";
import { RAZORPAY_KEY, RAZORPAY_SECRET_KEY } from "@/constants/constant";

interface ProductItem {
  id: string;
  name: string;
  description: string;
  size: string;
  price: number;
  imageUrl: string;
}

const ConfirmOrderScreen = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [user, setUser] = useState<IUser>();
  const [showPaymentMethod, setShowPaymentMethod] = useState<boolean>(true);

  const { items } = useLocalSearchParams<{ items: string[] }>();

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
    try {
      console.log("Processing payment...");
      // const res = await RazorpayCheckout.open({
      //   description: "Credits towards consultation",
      //   image: "https://i.imgur.com/3g7nmJC.png",
      //   currency: "INR",
      //   key: RAZORPAY_KEY!,
      //   amount: 5000,
      //   name: "foo",
      //   order_id: "order_123456", // Added missing required property
      //   prefill: {
      //     email: "void@razorpay.com",
      //     contact: "9191919191",
      //     name: "Razorpay Software",
      //   },
      //   theme: { color: "#F37254" },
      // });

      // console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  async function getData() {
    const userDetails = await AsyncStorage.getItem("userDetails");
    if (!userDetails) return;
    const user = JSON.parse(userDetails) as IUser;
    setUser(user);

    let i: ProductItem[] = [];

    console.log(items);

    for (let str of items) {
      const parts = str.split("SEP");

      const map: ProductItem = {
        id: items.indexOf(str).toString(),
        name: parts[0].replace("${val.", "").replace("}", ""),
        description: parts[1].replace("${val.", "").replace("}", ""),
        price: parseInt(parts[2].replace("${val.", "").replace("}", "")),
        size: parts[3].replace("${val.", "").replace("}", ""),
        imageUrl: parts[4].replace("${val.", "").replace("}", ""),
      };
      console.log(map);
      i.push(map);
    }

    setProductItems(i);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.addressContainer}>
        <Text style={styles.addressTitle}>DELIVERS TO</Text>
        <Text style={styles.addressName}>{user?.name}</Text>
        <Text style={styles.addressDetails}>
          {user && user.address ? (
            user.address
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
          {/* B-36, 2nd Floor, Baba House,{"\n"}
          Neb sarai, New Delhi 110 068{"\n"} */}
          {user?.phoneNumber}
        </Text>
        <Pressable style={styles.changeButton}>
          <Text style={styles.changeButtonText}>CHANGE</Text>
        </Pressable>
      </View>

      <View style={styles.productContainer}>
        {productItems.map((item) => (
          <View key={item.id} style={styles.productItem}>
            <Image
              source={{ uri: item.imageUrl }}
              style={styles.productImage}
            />
            <View style={styles.productDetails}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productDescription}>{item.description}</Text>
              <Text style={styles.productSize}>Size: {item.size}</Text>
            </View>
            <Text style={styles.productPrice}>${item.price}</Text>
          </View>
        ))}
      </View>

      <View
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
        )}
      </View>
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>TOTAL</Text>
        <Text style={styles.totalAmount}>$240</Text>
      </View>

      <Pressable style={styles.makePaymentButton} onPress={handleMakePayment}>
        <Text style={styles.makePaymentButtonText}>MAKE PAYMENT</Text>
      </Pressable>
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
    fontWeight: "bold",
    marginBottom: 8,
    ...textStyles.font,
  },
  addressName: {
    fontSize: 16,
    fontWeight: "bold",
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
    fontWeight: "bold",
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
