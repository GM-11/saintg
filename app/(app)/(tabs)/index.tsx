import Accessories from "@/components/home/Accessories";
import AllAccess from "@/components/home/AllAccess";
import BestDeals from "@/components/home/BestDeals";
import FeaturedCollection from "@/components/home/FeaturedCollection";
import LatestArrival from "@/components/home/LatestArrival";
import MyPager from "@/components/home/MyPager";
import Offers from "@/components/home/Offers";
import Partners from "@/components/home/Partners";
import Tag from "@/components/home/Tag";
import TopCategory from "@/components/home/TopCategory";
import TrendingNow from "@/components/home/TrendingNow";
import WhyChooseUs from "@/components/home/WhyUs";
import { Link, Redirect, router } from "expo-router";
import React from "react";
import {
  StyleSheet,
  ScrollView,
  FlatList,
  View,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUser } from "@/constants/types";
import axios from "axios";
import { BASE_URL } from "@/constants/constant";
function Index() {
  const tags = [
    "Trendy",
    "Heels",
    "Women",
    "Stilletos",
    "Shoe",
    "Heels",
    "Women",
    "Stilletos",
    "Shoe",
    "Heels",
    "Women",
    "Stilletos",
    "Shoe",
  ];

  const [latestArrival, setLatestArrival] = React.useState<any[]>([]);
  const [featuredCollection, setFeaturedCollection] = React.useState<any[]>([]);
  const [trendingNow, setTrendingNow] = React.useState<any[]>([]);
  const [brands, setBrands] = React.useState<any[]>([]);

  async function getData() {
    const userDetails = await AsyncStorage.getItem("userDetails");

    if (!userDetails) return;
    const user = JSON.parse(userDetails) as IUser;
    console.log(user);
    let gender: string;
    if (user.gender === "Male") {
      gender = "MEN";
    } else {
      gender = "WOMEN";
    }

    const response = await axios.get(
      `${BASE_URL}homePage/get?gender=${gender}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": user.token,
        },
      },
    );

    const res = JSON.parse(JSON.stringify(response.data.data));

    const _latestArrival = res.latestArrivals;
    const _featuredCollection = res.featuredCollection;
    const _trendingNow = res.trendingNow;
    const _brands = res.brands;

    const l = _latestArrival.map((item: any) => {
      return {
        id: item.id,
        title: item.text,
        subtitle: "Latest styles for you",
        image: {
          uri: item.imageUrl,
        },
      };
    });

    const f = _featuredCollection.map((item: any) => {
      return {
        id: item.id,
        title: item.category.category_name,
        subtitle: "Latest styles for you",
        image: {
          uri: item.category.category_image,
        },
      };
    });

    const t = _trendingNow.map((item: any) => {
      return {
        id: item.id,
        title: item.category.category_name,
        subtitle: "Latest styles for you",
        image: {
          uri: item.category.category_image,
        },
      };
    });

    const b = _brands.map((item: any) => {
      return {
        id: item.brand_id,
        image: item.brand_image,
        name: item.brand_name,
      };
    });

    setFeaturedCollection(f);
    setTrendingNow(t);
    setLatestArrival(l);
    setBrands(b);
  }

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <ScrollView style={styles.main}>
      <View style={{ marginBottom: 24 }}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={tags}
          style={{ marginTop: 40 }}
          renderItem={(val) => (
            <Pressable
              onPress={() => {
                router.push({
                  pathname: "/(app)/search/search",
                  params: { searchItem: val.item },
                });
              }}
            >
              <Tag title={val.item} />
            </Pressable>
          )}
        />
        {/* <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={Array(10).fill("New Arrival")}
          style={{ marginVertical: 40 }}
          renderItem={(val) => <TopCategory title={val.item} />}
        /> */}
      </View>

      <MyPager />
      <WhyChooseUs />
      <FeaturedCollection data={featuredCollection} />
      <TrendingNow data={trendingNow} />
      <Partners data={brands} />
      <BestDeals />
      <LatestArrival data={latestArrival} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tagsContainer: {
    gap: 15,
    flexDirection: "row",
    paddingHorizontal: 15,
  },
  main: {
    backgroundColor: "white",
  },

  container: {
    flex: 1,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Index;
