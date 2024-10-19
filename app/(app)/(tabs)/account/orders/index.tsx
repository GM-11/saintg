import { BASE_URL } from "@/constants/constant";
import { IUser } from "@/constants/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React from "react";
import { Text, View, StyleSheet, Pressable, FlatList } from "react-native";

// const _orders: orderProps[] = [
//   {
//     status: "Delivered",
//     date: new Date(),
//     orderId: "1234",
//     numsItems: 4,
//   },
//   {
//     status: "Processing",
//     date: new Date(),
//     orderId: "2345",
//     numsItems: 4,
//   },
// ];

function ordersPage() {
  const [orders, setOrders] = React.useState<orderProps[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  async function fetchOrders() {
    setLoading(true);
    const userDetails = await AsyncStorage.getItem("userDetails");
    if (!userDetails) return;

    const user = JSON.parse(userDetails) as IUser;

    try {
      const response = await fetch(`${BASE_URL}order/user/orders`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": user.token,
        },
      });

      const data = await response.json();

      data.forEach((d: any) => {
        console.log(d);

        const personName = d.address.firstName + " " + d.address.lastName;
        const deliveryAddress = d.address.addressLine1 + ", " + d.address.city;
        +", " +
          d.address.state +
          ", " +
          d.address.zipCode +
          ", " +
          d.address.country;

        let order: orderProps = {
          status: d.paymentDetails.status,
          date: new Date(d.createdAt),
          numsItems: d.orderItems[0].quantity,
          orderId: d.orderId,
          personNumber: d.address.phoneNumber,
          deliveryAddress,
          size: d.orderItems[0].size,
          price: d.orderItems[0].amount,
          personName,
          quantity: 0,
          productSubtitle: d.orderItems[0].product.product_name,
          productTitle: d.orderItems[0].product.description,
        };

        setOrders((prev) => [...prev, order]);
        // setOrders([]);
      });

      // setOrders(data ?? []);
    } catch (error) {
      console.error(error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "white", height: "100%" }}>
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
        <OrdersView orders={orders} />
      )}
    </View>
  );
}

function OrdersView({ orders }: { orders: orderProps[] }) {
  return (
    <View>
      {orders.length === 0 ? (
        <View
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: 600, marginBottom: 16 }}>
            No Orders Yet
          </Text>
          <Text style={{ fontSize: 16, fontWeight: 400 }}>
            You haven't placed any orders yet
          </Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          style={{ margin: 16 }}
          renderItem={(val) => {
            return (
              <OrderComponent
                status={val.item.status}
                date={val.item.date}
                orderId={val.item.orderId}
                numsItems={val.item.numsItems}
                personName={val.item.personName}
                personNumber={val.item.personNumber}
                deliveryAddress={val.item.deliveryAddress}
                size={val.item.size}
                price={val.item.price}
                quantity={val.item.quantity}
                productTitle={val.item.productTitle}
                productSubtitle={val.item.productSubtitle}
              />
            );
          }}
        />
      )}
    </View>
  );
}

type orderProps = {
  status: string;
  date: Date;
  orderId: string;
  numsItems: number;
  quantity: number;
  price: number;
  personName: string;
  personNumber: string;
  deliveryAddress: string;
  size: number;
  productTitle: string;
  productSubtitle: string;
};

function OrderComponent({
  status,
  date,
  orderId,
  numsItems,
  price,
  personName,
  personNumber,
  deliveryAddress,
  size,
  productTitle,
  productSubtitle,
}: orderProps) {
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
              params: {
                orderId,
                status,
                date: date.toDateString(),
                personName,
                personNumber,
                deliveryAddress,
                size,
                quantity: numsItems,
                price,
                productTitle,
                productSubtitle,
              },
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

export default ordersPage;
