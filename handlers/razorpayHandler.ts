import { BASE_URL } from "@/constants/constant";
import { IUser } from "@/constants/types";
import RazorpayCheckout from "react-native-razorpay";

export default async function razorpayHandler(
  user: IUser,
  data: any,
): Promise<Response | string | any> {
  const res2 = await fetch(`${BASE_URL}payment/create-order`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      "x-access-token": user.token,
    },

    body: JSON.stringify({
      orderId: data.orderId,
      provider: "razorpay",
      currencyType: "INR",
    }),
  });

  const orderData = await res2.json();
  console.log("in razorpayhandler");
  console.log(orderData);

  if (orderData.error) {
    // Toast.show({ text1: orderData.error });
    return orderData.error;
  }
  const res = await RazorpayCheckout.open({
    description: "Confirm Order",
    image:
      "https://www.saintg.in/cdn/shop/files/new-web6.png?v=1727171817&width=140",
    currency: "INR",
    key: "rzp_test_9DtTuk9KjkdDSX",
    amount: parseInt(orderData.amount) * 100,
    name: "Order",

    order_id: orderData.id, // Added missing required property
    prefill: {
      email: user.email,
      contact: user.phoneNumber,
      name: "SaintG",
    },
    theme: { color: "#F37254" },
  });
  const verify = await fetch(`${BASE_URL}payment/verify-payment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": user.token,
    },
    body: JSON.stringify({
      orderId: data.orderId,
      paymentId: res.razorpay_payment_id,
      signature: res.razorpay_signature,
      razorpayOrderId: res.razorpay_order_id,
      provider: "razorpay",
    }),
  });

  return verify;
}
