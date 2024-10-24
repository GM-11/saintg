import { BASE_URL } from "@/constants/constant";
import { IUser } from "@/constants/types";
import "react-native-paypal";

export default async function razorpayHandler(
  user: IUser,
  data: any,
  currency: string,
): Promise<Response | string> {
  const res2 = await fetch(`${BASE_URL}payment/create-order`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      "x-access-token": user.token,
    },

    body: JSON.stringify({
      orderId: data.orderId,
      provider: "paypal",
      currencyType: currency,
    }),
  });

  const orderData = await res2.json();

  console.log(orderData);

  if (orderData.error) {
    // Toast.show({ text1: orderData.error });
    return orderData.error;
  }

  // return verify;
}
