import { BASE_URL } from "@/constants/constant";
import { IUser } from "@/constants/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React from "react";
import { Text, View, StyleSheet, Pressable, FlatList } from "react-native";

const _orders: orderProps[] = [
  {
    status: "Delivered",
    date: new Date(),
    orderId: "1234",
    numsItems: 4,
  },
  {
    status: "Processing",
    date: new Date(),
    orderId: "2345",
    numsItems: 4,
  },
];

function orders() {
  const [orders, setOrders] = React.useState<orderProps[]>([]);

  async function fetchOrders() {
    const userDetails = await AsyncStorage.getItem("userDetails");
    if (!userDetails) return;

    const user = JSON.parse(userDetails) as IUser;

    try {
      const response = await fetch(
        `${BASE_URL}/order/user/orders`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": user.token,
          },
        },
      );
      const data = await response.json();

      setOrders(data.data ?? []);
    } catch (error) {
      console.error(error);
    }
  }

  React.useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "white", height: "100%" }}>
      <FlatList
        data={_orders}
        renderItem={(val) => (
          <OrderComponent
            status={val.item.status}
            date={val.item.date}
            orderId={val.item.orderId}
            numsItems={val.item.numsItems}
          />
        )}
      />
    </View>
  );
}

type orderProps = {
  status: "Delivered" | "Processing";
  date: Date;
  orderId: string;
  numsItems: number;
};

function OrderComponent({ status, date, orderId, numsItems }: orderProps) {
  return (
    <View
      style={{
        width: "90%",
        display: "flex",
        flexDirection: "column",
        borderWidth: 1,
        borderColor: "grey",
        padding: 8,
        margin: 16,
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: 600 }}>{status}</Text>
      <Text style={{ fontSize: 14 }}>on {date.toDateString()}</Text>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          padding: 12,
          justifyContent: "space-between",
        }}
      >
        <View
          style={{ display: "flex", flexDirection: "column", marginTop: 12 }}
        >
          <Text style={{ fontSize: 14, marginBottom: 12 }}>
            {numsItems} items in pack
          </Text>
          <Text style={{ fontSize: 14 }}>OrderId: {orderId}</Text>
        </View>

        <Pressable
          style={{ marginRight: 24 }}
          onPress={() =>
            router.push({
              pathname: "/(tabs)/account/orders/orderSummary",
              params: { orderId, status, date: date.toDateString() },
            })
          }
        >
          <Text style={{ fontSize: 28 }}>{">"}</Text>
        </Pressable>
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
            {status === "Delivered" ? "Return" : "Exchange"}
          </Text>
        </Pressable>
        <Pressable style={styles.button}>
          <Text style={{ color: "white", textAlign: "center" }}>
            {status === "Delivered" ? "Cancel Order" : "Track Order"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

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

export default orders;
