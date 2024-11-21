import TopCategory from "@/components/home/TopCategory";
import { BASE_URL } from "@/constants/constant";
import { IUser } from "@/constants/types";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Link, router, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import {
  FlatList,
  Text,
  TextInput,
  View,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
// import SvgUri from "react-native-svg-uri";
import Toast from "react-native-toast-message";

type t = {
  image: string;
  title: string;
  subtitle: string;
  price: number;
  currency: string;
  id: number;
  // originalPrice: number;
  // discountPercentage: number;
};

const convertApiResponseToT = (apiResponse: any[], regionData: any[]): t[] => {
  if (regionData.length === 0) {
    return [];
  }
  const productIds: any[] = regionData.map((val: any) => val.product_id);
  return apiResponse
    .map((item) => {
      if (productIds.includes(item.product_id)) {
        return {
          image: item.product_images[0]?.image_url || "", // Assuming the first image is the main one
          title: item.product_name,
          subtitle: item.description,
          price: regionData.find((v) => v.product_id === item.product_id).price,
          currency: regionData.find((v) => v.product_id === item.product_id)
            .currency_type,
          id: item.product_id,
          // originalPrice: item.product_specifications[0]?.value || 0, // You might need to adjust this if there's an original price field
          // discountPercentage: item.discount || 0,
        };
      }
      return {
        image: "",
        title: "",
        subtitle: "",
        price: 0,
        id: 0,
      };
    })
    .filter((item): item is t => item !== undefined);
};

function index() {
  const { searchItem } = useLocalSearchParams<{ searchItem: string }>();
  const [search, setSearch] = React.useState(searchItem || "");
  const [showResults, setShowResults] = React.useState(false);
  const [data, setData] = React.useState<t[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [recentSearches, setRecentSearches] = React.useState<string[]>([]);

  async function getRecentSearches() {
    const recentSearches = await AsyncStorage.getItem("recentSearches");
    const recentSearchesParsed = JSON.parse(recentSearches || "[]") as string[];
    setRecentSearches(recentSearchesParsed);
  }
  useEffect(() => {
    getRecentSearches();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);

      const userDetails = await AsyncStorage.getItem("userDetails");
      if (!userDetails) return;
      const user = JSON.parse(userDetails) as IUser;

      await AsyncStorage.setItem(
        "recentSearches",
        JSON.stringify([...recentSearches, search]),
      );

      const result = await axios.get(
        `${BASE_URL}products/search?keyword=${search}`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": user.token,
          },
        },
      );
      const d = result.data.data;

      const regionData = await axios.get(
        `${BASE_URL}products/region/${user.regionId}`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": user.token,
          },
        },
      );
      const convertedData = convertApiResponseToT(d, regionData.data);
      setData(convertedData);
      setShowResults(true);
    } catch (error) {
      Toast.show({ text1: "Something went wrong" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <View
        style={{
          borderBottomColor: "gray",
          borderBottomWidth: 1,
          width: "80%",
          padding: 10,
          margin: 20,
          marginTop: 20,
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Pressable onPress={() => router.back()}>
          {/* <Pressable onPress={() => setShowResults(true)}> */}
          {/* <Image
            source={require("../../../assets/images/icons/forward-arrow.png")}
          /> */}
          <Feather name="arrow-left" size={24} color="black" />
        </Pressable>
        <TextInput
          style={{ width: "100%", paddingHorizontal: 10 }}
          value={search}
          onSubmitEditing={fetchData}
          onChangeText={(val) => {
            setSearch(val);
            // setShowResults(true);
          }}
          placeholder="Search By Products, Brands & More"
          placeholderTextColor={"gray"}
        />
        <Pressable
          onPress={() => {
            fetchData();
          }}
        >
          <Image
            height={20}
            width={20}
            source={require("../../../assets/images/icons/search.png")}
          />
        </Pressable>
      </View>

      {loading ? (
        <View
          style={{
            backgroundColor: "white",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          <ActivityIndicator color="black" size="large" />
        </View>
      ) : null}

      {showResults ? (
        SearchResult(search as string, data)
      ) : (
        <View>
          {recentSearches.length > 0 ? (
            <View>
              <Text
                style={{
                  letterSpacing: 4,
                  color: "gray",
                  fontSize: 16,
                  marginTop: 20,
                  marginLeft: 20,
                }}
              >
                RECENT SEARCH
              </Text>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={recentSearches}
                style={{ marginTop: 40 }}
                renderItem={(val) => <TopCategory title={val.item} />}
              />
            </View>
          ) : (
            <View />
          )}
          <Text
            style={{
              letterSpacing: 4,
              color: "gray",
              fontSize: 16,
              marginTop: 20,
              marginLeft: 20,
            }}
          >
            TRENDING SEARCH
          </Text>

          <FlatList
            numColumns={3}
            data={["Boots", "Women", "Heels", "Trending", "Bags"]}
            style={{ marginVertical: 40 }}
            renderItem={(val) => (
              <Pressable
                onPress={() => {
                  setSearch(val.item);
                }}
              >
                <View
                  style={{
                    borderColor: "gray",
                    borderWidth: 1,
                    borderRadius: 20,
                    padding: 10,
                    height: 40,
                    marginHorizontal: 20,
                    marginVertical: 10,
                  }}
                >
                  <Text>{val.item} </Text>
                </View>
              </Pressable>
            )}
          />

          {/* <Text
            style={{
              letterSpacing: 4,
              color: "gray",
              fontSize: 16,
              marginTop: 20,
              marginLeft: 20,
            }}
          >
            BROWSE BY CATEGORY
          </Text> */}

          {/* <FlatList
            style={{ width: "100%" }}
            data={[
              "BEST SELLERS",
              "NEW ARRIVALS",
              "70% SALE",
              "EDITORS PICK",
              "EDITORIALS",
              "TRENDING NOW",
            ]}
            numColumns={3}
            renderItem={(val) => (
              <ImageBackground
                style={{
                  height: 100,
                  width: 100,
                  margin: 12,
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
                source={{
                  uri: "https://images.pexels.com/photos/2430953/pexels-photo-2430953.jpeg",
                }}
              >
                <Text
                  style={{
                    width: "75%",
                    textAlign: "center",
                    color: "white",
                  }}
                >
                  {val.item}
                </Text>
              </ImageBackground>
            )}
          /> */}
        </View>
      )}
    </View>
  );
}

export default index;

function SearchResult(search: string, data: t[]) {
  // const pickerVals = ["New", "Old"];
  // const [selectedPicker, setSelectedPicker] = React.useState("New");
  //
  // async function fetchData() {
  //   try {
  //     const res = await fetch(`${BASE_URL}/products/search?keyword=${search}`);
  //     const data = await res.json();
  //     setData(data);
  //   } catch (error) {
  //     // console.log(error);
  //   }
  // }

  // React.useEffect(() => {
  //   setData(data);
  // }, []);
  if (data.length === 0) {
    return (
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Text>No Results Found</Text>
      </View>
    );
  } else {
    return (
      <View>
        <View
          style={{
            margin: 20,
            display: "flex",
            flexDirection: "row",
            maxWidth: "100%",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 14, color: "black" }}>
            {data.length} results for {search}
          </Text>

          {/* <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: "15%",
              justifyContent: "space-between",
            }}
          >
            <Text>New</Text>
            <Link
              href={{
                pathname: "/search/filter",
                params: { numProducts: 738 },
              }}
            >
              <Image
                source={require("../../../assets/images/icons/listview.png")}
              />
            </Link>
          </View> */}
        </View>

        <FlatList
          style={{ width: "100%" }}
          data={data}
          numColumns={2}
          key={search}
          renderItem={(val) => (
            <View
              style={{
                width: "45%",
                display: "flex",
                flexDirection: "column",
                margin: 10,
              }}
            >
              <Pressable
                onPress={() => {
                  // console.log("asdfk");
                  router.push({
                    pathname: "/(app)/product/productDetail",
                    params: {
                      searchKeyWord: search,
                      productId: val.item.id,
                    },
                  });
                }}
              >
                <Image
                  source={{ uri: val.item.image }}
                  style={{ width: "100%", height: 200 }}
                />
              </Pressable>
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
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Text style={{ fontSize: 16, fontWeight: 600 }}>
                  {val.item.price} {"/-"} {val.item.currency}
                </Text>
                {/* <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 400,
                    marginHorizontal: 10,
                    textDecorationLine: "line-through",
                  }}
                >
                  ${val.item.originalPrice}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 400,
                    marginRight: 20,
                    color: "green",
                  }}
                >
                  {val.item.discountPercentage}% off
                </Text> */}
              </View>
            </View>
          )}
        />
      </View>
    );
  }
}
