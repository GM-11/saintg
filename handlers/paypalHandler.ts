import { BASE_URL } from "@/constants/constant";
import { IUser } from "@/constants/types";
// import {
//   paypalLocalCodes,
//   paypalSupportedCurrencies,
//   requestOneTimePayment,
// } from "react-native-paypal";

export async function paypalHandler(
  user: IUser,
  data: any,
  currency: string,
): Promise<{ url: string; orderId: string; paymentId: string }> {
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


  if (orderData.error) {
    return orderData.error;
  }
  return {
    url: orderData.links[1].href as string,
    orderId: data.orderId,
    paymentId: orderData.id,
  };
}

export async function verifyPayment(
  user: IUser,
  orderId: string,
  paymentId: string,
) {
  const verify = await fetch(`${BASE_URL}payment/verify-paypal-payment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": user.token,
    },
    body: JSON.stringify({
      orderId,
      paymentId,
    }),
  });

  return verify;
}
