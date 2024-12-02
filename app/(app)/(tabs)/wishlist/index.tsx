import { BASE_URL } from "@/constants/constant";
import { IUser } from "@/constants/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect } from "react";
import { Text, View, FlatList, Image, ActivityIndicator } from "react-native";

type t = {
  image: string;
  title: string;
  subtitle: string;
  price: number;
  id: number;
  currency: string;
};

function index() {
  const [showSizeOverlay, setShowSizeOverlay] = React.useState(false);
  const [data, setData] = React.useState<t[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [userNotLoggedIn, setUserNotLoggedIn] = React.useState(false);
  const [user, setUser] = React.useState<IUser>();

  async function getData() {
    setLoading(true);
    const userDetails = await AsyncStorage.getItem("userDetails");
    if (!userDetails) return;
    const user = JSON.parse(userDetails) as IUser;
    setUser(user);

    if (user.token === "") {
      setUserNotLoggedIn(true);
      setLoading(false);
      return;
    }
    try {
      const result = await axios.get(`${BASE_URL}wishlist`, {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": user.token,
        },
      });
      const data = result.data;
      console.log(data);
      if (data.wishlist.length === 0) {
        setLoading(false);
        setData([]);

        return;
      }

      const regionData = await axios.get(
        `${BASE_URL}products/region/${user.regionId}`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": user.token,
          },
        },
      );

      const productIds: any[] = regionData.data.map(
        (val: any) => val.product_id,
      );

      data.forEach((item: any) => {
        if (productIds.includes(item.product.product_id)) {
          const p: t = {
            id: item.product.product_id,
            image: (regionData.data as any[]).find(
              (v) => v.product_id === item.product.product_id,
            ).product_images[0].image_url,
            price: (regionData.data as any[]).find(
              (v) => v.product_id === item.product.product_id,
            ).price,
            currency: (regionData.data as any[]).find(
              (v) => v.product_id === item.product.product_id,
            ).currency_type,
            subtitle: item.product.description,
            title: item.product.product_name,
          };
          setData((prev) => [...prev, p]);
        }
      });
    } catch (error) {
      setData([]);
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  // if (userNotLoggedIn) {
  //   return (
  //     <View
  //       style={{
  //         flex: 1,
  //         justifyContent: "center",
  //         alignItems: "center",
  //         backgroundColor: "white",
  //       }}
  //     >
  //       <TouchableOpacity
  //         style={{
  //           backgroundColor: "black",
  //           width: "90%",
  //           marginTop: 36,
  //           padding: 16,
  //         }}
  //         onPress={() =>
  //           router.push({
  //             pathname: "/(app)/auth/signin",
  //             params: { regionId: user?.regionId },
  //           })
  //         }
  //       >
  //         <Text
  //           style={{
  //             color: "white",
  //             alignSelf: "center",
  //             textAlign: "center",
  //             fontSize: 16,
  //             fontFamily: "Lato-Regular",
  //           }}
  //         >
  //           SIGN IN
  //         </Text>
  //       </TouchableOpacity>
  //       <TouchableOpacity
  //         style={{
  //           backgroundColor: "black",
  //           width: "90%",
  //           marginTop: 36,
  //           padding: 16,
  //         }}
  //         onPress={() =>
  //           router.push({
  //             pathname: "/auth/signup",
  //             params: { regionId: user?.regionId },
  //           })
  //         }
  //       >
  //         <Text
  //           style={{
  //             color: "white",
  //             alignSelf: "center",
  //             textAlign: "center",
  //             fontSize: 16,
  //             fontFamily: "Lato-Regular",
  //           }}
  //         >
  //           SIGN UP
  //         </Text>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // }

  if (data.length !== 0) {
    return (
      <View
        style={{
          backgroundColor: "white",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../../../assets/offers/deals_banner.png")}
          style={{
            width: "100%",
          }}
        />

        <FlatList
          style={{ width: "100%" }}
          data={data}
          numColumns={2}
          renderItem={(val) => (
            <View
              style={{
                width: "45%",
                display: "flex",
                flexDirection: "column",
                margin: 10,
              }}
            >
              <Image
                source={{ uri: val.item.image }}
                style={{ width: "100%", height: 200 }}
              />
              <Text
                style={{ fontSize: 16, fontWeight: 300, marginVertical: 2 }}
              >
                {val.item.title}
              </Text>
              <Text
                style={{ fontSize: 16, fontWeight: 300, marginVertical: 2 }}
              >
                {val.item.subtitle}
              </Text>
              <Text
                style={{ fontSize: 16, fontWeight: 500, marginVertical: 2 }}
              >
                {val.item.price} {"/-"} {val.item.currency}
              </Text>
              {/* <Pressable
                onPress={() => setShowSizeOverlay(true)}
                style={{
                  padding: 10,
                  borderColor: "black",
                  borderWidth: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginVertical: 10,
                  marginHorizontal: 20,
                }}
              >
                <Text>MOVE TO BAG</Text>
              </Pressable> */}
            </View>
          )}
        />
      </View>
    );
  } else {
    return (
      <View
        style={{
          backgroundColor: "white",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {loading ? (
          <View
            style={{
              backgroundColor: "white",
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size="large" color="black" />
          </View>
        ) : (
          <View
            style={{
              backgroundColor: "white",
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text> NO ITEMS IN WISHLIST </Text>
          </View>
        )}
      </View>
    );
  }
}

export default index;
