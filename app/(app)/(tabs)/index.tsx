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
import { Link, Redirect } from "expo-router";
import React from "react";
import { StyleSheet, ScrollView, FlatList, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
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

  return (
    <ScrollView style={styles.main}>
      <Link href={"/(story)/story"}>our story</Link>
      <Link href={"/(story)/contact"}>contact</Link>
      <Link href={"/checkout"}>checkout</Link>
      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={tags}
          style={{ marginTop: 40 }}
          renderItem={(val) => <Tag title={val.item} />}
        />
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={Array(10).fill("New Arrival")}
          style={{ marginVertical: 40 }}
          renderItem={(val) => <TopCategory title={val.item} />}
        />
      </View>

      <MyPager />
      <WhyChooseUs />
      <FeaturedCollection />
      <TrendingNow />
      <Partners />
      <AllAccess />
      <Offers />
      <Accessories />
      <BestDeals />
      <LatestArrival />
      <BestDeals />
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
