import { router } from "expo-router";
import React from "react";
import { Pressable, Text, View, ScrollView } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";

const coups: couponData[] = [
  {
    title: "BUY ONE GET ONE (HEELS)",
    code: "FDPD1",
    date: new Date(),
    subtitle: "$20 Off on purchase of above $200 for the first time",
    id: 0,
  },
  {
    title: "BUY ONE GET ONE (HEELS)",
    code: "FDPD1",
    date: new Date(),
    subtitle: "$20 Off on purchase of above $200 for the first time",
    id: 1,
  },
];

type couponData = {
  title: string;
  code: string;
  date: Date;
  subtitle: string;
  id: number;
};

function coupons() {
  const [showExclusive, setShowExclusive] = React.useState(true);
  const [showAll, setShowAll] = React.useState(true);

  return (
    <ScrollView style={{ height: "100%", backgroundColor: "white" }}>
      <View>
        <View style={{ padding: 20 }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 16 }}>EXCLUSIVE COUPONS FOR YOU</Text>
            <Pressable onPress={() => setShowExclusive(!showExclusive)}>
              <Text>
                {showExclusive ? (
                  <Entypo name="cross" size={24} color="black" />
                ) : (
                  <AntDesign name="down" size={24} color="black" />
                )}
              </Text>
            </Pressable>
          </View>
          {showExclusive ? (
            <>
              {coups.map((c) => {
                return couponComponent(c);
              })}
            </>
          ) : (
            <View />
          )}
        </View>
        <View style={{ padding: 20 }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 16 }}>ALL COUPONS</Text>
            <Pressable onPress={() => setShowAll(!showAll)}>
              <Text>
                {showAll ? (
                  <Entypo name="cross" size={24} color="black" />
                ) : (
                  <AntDesign name="down" size={24} color="black" />
                )}
              </Text>
            </Pressable>
          </View>
          {showAll ? (
            <>
              {coups.map((c) => {
                return couponComponent(c);
              })}
            </>
          ) : (
            <View />
          )}
        </View>
      </View>
    </ScrollView>
  );
}

function couponComponent({ title, code, date, subtitle, id }: couponData) {
  return (
    <View
      key={id}
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
              params: { title, code, date: date.toDateString(), subtitle, id },
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
        <Text>{date.toDateString()}</Text>
      </View>
    </View>
  );
}

export default coupons;
