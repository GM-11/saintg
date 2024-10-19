import { BASE_URL } from "@/constants/constant";
import { IUser } from "@/constants/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Link, router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  FlatList,
  Text,
  TextInput,
  View,
  Image,
  Pressable,
} from "react-native";

type t = {
  image: string;
  title: string;
  subtitle: string;
  price: number;
  id: number;
  originalPrice: number;
  discountPercentage: number;
};

const convertApiResponseToT = (apiResponse: any[]): t[] => {
  return apiResponse.map((item) => ({
    image: item.product_images[0]?.image_url || "", // Assuming the first image is the main one
    title: item.product_name,
    subtitle: item.description,
    price: item.product_specifications[0]?.value || 0, // Assuming the first specification is the price
    id: item.product_id,
    originalPrice: item.product_specifications[0]?.value || 0, // You might need to adjust this if there's an original price field
    discountPercentage: item.discount || 0,
  }));
};

function index() {
  const { searchItem } = useLocalSearchParams<{ searchItem: string }>();
  const [search, setSearch] = React.useState(searchItem || "");
  const [showResults, setShowResults] = React.useState(false);
  const [data, setData] = React.useState<t[]>([]);
  const [loading, setLoading] = React.useState(false);

  async function fetchData() {
    try {
      setLoading(true);

      const userDetails = await AsyncStorage.getItem("userDetails");
      if (!userDetails) return;
      const user = JSON.parse(userDetails) as IUser;

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

      // console.log(result.data);

      const convertedData = convertApiResponseToT(d);
      setData(convertedData);
      setShowResults(true);
    } catch (error) {
      // console.log(error);
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
          marginTop: 40,
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <Pressable onPress={() => router.back()}>
          {/* <Pressable onPress={() => setShowResults(true)}> */}
          <Image
            source={require("../../../assets/images/icons/forward-arrow.png")}
          />
        </Pressable>
        <TextInput
          style={{ width: "100%", paddingHorizontal: 10 }}
          value={search}
          onChangeText={(val) => {
            setSearch(val);
            // setShowResults(true);
          }}
          placeholder="Search By Products, Brands & More"
          placeholderTextColor={"gray"}
        />
        <Pressable
          onPress={() => {
            // console.log("searching");
            fetchData();
          }}
        >
          <Image
            source={require("../../../assets/images/icons/search.png")}
            style={{ width: 20, height: 20 }}
          />
        </Pressable>
      </View>

      {loading ? (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>Loading...</Text>
        </View>
      ) : null}

      {showResults ? (
        SearchResult(search as string, data)
      ) : (
        <View>
          {/* <Text
            style={{
              letterSpacing: 4,
              color: "gray",
              fontSize: 16,
              marginTop: 20,
              marginLeft: 20,
            }}
          >
            RECENT SEARCH
          </Text> */}
          {/* <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={Array(10).fill("New Arrival")}
            style={{ marginTop: 40 }}
            renderItem={(val) => <TopCategory title={val.item} />}
          /> */}

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
                  ${val.item.price}
                </Text>
                <Text
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
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    );
  }
}
