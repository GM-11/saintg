import TopCategory from "@/components/home/TopCategory";
import { BASE_URL } from "@/constants/constant";
import { Picker } from "@react-native-picker/picker";
import { Link, router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  FlatList,
  ImageBackground,
  Text,
  TextInput,
  View,
  Image,
  Pressable,
  ScrollView,
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

function index() {
  const [search, setSearch] = React.useState("");
  const [showResults, setShowResults] = React.useState(false);
  const [data, setData] = React.useState<t[]>([]);
  const [loading, setLoading] = React.useState(false);

  async function fetchData() {
    try {
      const res = await fetch(`${BASE_URL}/products/search?keyword=${search}`);
      const data = await res.json();
      if (data.code !== 200) {
        setData([]);
        return;
      }
      console.log(data);
      setData(data.data);
      setShowResults(true);
    } catch (error) {
      console.log(error);
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
            console.log("searching");
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
            data={Array(10).fill("New Arrival")}
            style={{ marginTop: 40 }}
            renderItem={(val) => <TopCategory title={val.item} />}
          />

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
            )}
          />

          <Text
            style={{
              letterSpacing: 4,
              color: "gray",
              fontSize: 16,
              marginTop: 20,
              marginLeft: 20,
            }}
          >
            BROWSE BY CATEGORY
          </Text>

          <FlatList
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
          />
        </View>
      )}
    </View>
  );
}

export default index;

const data: t[] = [
  {
    image: "https://picsum.photos/200/300",
    title: "Title",
    subtitle: "Subtitle",
    price: 100,
    id: 1,
    originalPrice: 200,
    discountPercentage: 50,
  },

  {
    image: "https://picsum.photos/200/300",
    title: "Title",
    subtitle: "Subtitle",
    price: 100,
    id: 2,
    originalPrice: 200,
    discountPercentage: 50,
  },

  {
    image: "https://picsum.photos/200/300",
    title: "Title",
    subtitle: "Subtitle",
    price: 100,
    id: 3,
    originalPrice: 200,
    discountPercentage: 50,
  },

  {
    image: "https://picsum.photos/200/300",
    title: "Title",
    subtitle: "Subtitle",
    price: 100,
    id: 4,
    originalPrice: 200,
    discountPercentage: 50,
  },
  {
    image: "https://picsum.photos/200/300",
    title: "Title",
    subtitle: "Subtitle",
    price: 100,
    id: 5,
    originalPrice: 200,
    discountPercentage: 50,
  },
  {
    image: "https://picsum.photos/200/300",
    title: "Title",
    subtitle: "Subtitle",
    price: 100,
    id: 6,
    originalPrice: 200,
    discountPercentage: 50,
  },
  {
    image: "https://picsum.photos/200/300",
    title: "Title",
    subtitle: "Subtitle",
    price: 100,
    id: 7,
    originalPrice: 200,
    discountPercentage: 50,
  },
  {
    image: "https://picsum.photos/200/300",
    title: "Title",
    subtitle: "Subtitle",
    price: 100,
    id: 8,
    originalPrice: 200,
    discountPercentage: 50,
  },
  {
    image: "https://picsum.photos/200/300",
    title: "Title",
    subtitle: "Subtitle",
    price: 100,
    id: 9,
    originalPrice: 200,
    discountPercentage: 50,
  },
  {
    image: "https://picsum.photos/200/300",
    title: "Title",
    subtitle: "Subtitle",
    price: 100,
    id: 10,
    originalPrice: 200,
    discountPercentage: 50,
  },
];

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
  //     console.log(error);
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
      <ScrollView>
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
            {data.length} Results {search}
          </Text>

          <View
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
          </View>
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
      </ScrollView>
    );
  }
}
