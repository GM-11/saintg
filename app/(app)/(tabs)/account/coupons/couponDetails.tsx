import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View, Pressable, ScrollView } from "react-native";

function couponDetails() {
  const { title, code, date, subtitle, id } = useLocalSearchParams();
  return (
    <View style={{ backgroundColor: "white", padding: 20, flex: 1 }}>
      <View>
        <ScrollView
          style={{
            backgroundColor: "white",
            borderColor: "grey",
            borderWidth: 1,
            padding: 20,
            marginVertical: 20,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Pressable
              onPress={() => {
                router.push({
                  pathname: "/(tabs)/account/coupons/couponDetails",
                  params: { title, code, date: date, subtitle, id },
                });
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  lineHeight: 24,
                  width: 150,
                  color: "black",
                  fontWeight: "600",
                }}
              >
                {title}
              </Text>
              <Text>{code}</Text>
            </Pressable>
            <Text
              style={{
                borderColor: "grey",
                borderWidth: 1,
                paddingHorizontal: 20,
                paddingVertical: 10,
              }}
            >
              COPY
            </Text>
          </View>
          <View
            style={{
              borderTopColor: "grey",
              borderTopWidth: 1,
              marginTop: 20,
              paddingTop: 20,
            }}
          >
            <Text>{subtitle}</Text>
            <Text>Valid Until: {date}</Text>

            <Text style={{ marginTop: 20 }}>Terms & Conditions: </Text>

            <View style={{ padding: 10 }}>
              <Text>
                1. Eligibility: Coupons are only available to registered users
                of SaintG. Users must be at least 18 years of age to redeem
                coupons.
              </Text>
              <Text>
                2. Coupon Validity: Each coupon has a specified validity period
                mentioned within the coupon details. Coupons must be redeemed
                within this period to be considered valid.
              </Text>
              <Text>
                3. Redemption Limit: Users can redeem each coupon only once
                unless specified otherwise in the coupon details. Multiple
                coupons cannot be combined for a single transaction unless
                explicitly stated.
              </Text>
              <Text>
                4. Coupon Usage: Coupons are non-transferable and cannot be
                exchanged for cash. They can only be used for purchases on
                SaintG and are subject to the terms and conditions specified by
                the app.
              </Text>
              <Text>
                5. Exclusions: Certain products or categories may be excluded
                from coupon eligibility. Refer to the coupon details for
                specific exclusions.
              </Text>
              <Text>
                6. Cancellation and Refunds: If an order made using a coupon is
                canceled or refunded, the coupon value will not be refunded.
                However, if the cancellation is due to a fault on the part of
                SaintG, the coupon may be reinstated or replaced at the
                discretion of the app.
              </Text>
              <Text>
                7. Coupon Abuse: SaintG reserves the right to cancel coupons or
                suspend user accounts in case of misuse, including but not
                limited to, unauthorized reproduction, tampering, or fraud.
              </Text>
              <Text>
                8. Modification and Termination: SaintG reserves the right to
                modify or terminate any coupon or the coupon program at any time
                without prior notice.
              </Text>
              <Text>
                9. Liability: SaintG is not liable for any losses, damages, or
                expenses incurred by users as a result of their participation in
                the coupon program, except where prohibited by law.
              </Text>
              <Text>
                Governing Law: These terms and conditions are governed by the
                laws of your jurisdiction, and any disputes arising out of or
                relating to these terms shall be subject to the exclusive
                jurisdiction of the courts in your jurisdiction.
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

export default couponDetails;
