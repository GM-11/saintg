import CustomCarousel from "@/components/CustomCarousel";
import TopCategory from "@/components/home/TopCategory";
import { BASE_URL } from "@/constants/constant";
import { IUser } from "@/constants/types";
import textStyles from "@/styles/textStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Link, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View, Image, FlatList, ScrollView } from "react-native";

const data = [
  {
    id: "1",
    title: "Sandals",
    subtitle: "Upto 40% off",
    image: {
      uri: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    },
  },
  {
    id: "2",
    title: "Winter Jackets",
    subtitle: "Stay warm this winter",
    image: {
      uri: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    },
  },
  {
    id: "3",
    title: "Spring Dresses",
    subtitle: "Stay warm this winter",

    image: {
      uri: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
    },
  },
  {
    id: "4",
    title: "Fall Boots",
    subtitle: "Trendy and comfortable",
    image: {
      uri: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a",
    },
  },
  {
    id: "5",
    title: "Casual Shirts",
    subtitle: "Perfect for any occasion",
    image: {
      uri: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb",
    },
  },
  {
    id: "6",
    title: "Accessories",
    subtitle: "Stay warm this winter",

    image: {
      uri: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
    },
  },
];

type t = {
  title: string;
  subtitle: string;
  amount: number;
  price: number;
  imageUri: string;
  originalPrice?: number;
  sizes: string[];
  productId: number;
  discountPercentage?: number;
};

function categoryListView() {
  const [items, setItems] = useState<t[]>([]);

  const { name } = useLocalSearchParams();

  async function fetchItems() {
    const userDetails = await AsyncStorage.getItem("userDetails");
    if (!userDetails) return;
    const user = JSON.parse(userDetails) as IUser;

    const response = await axios.get(
      `${BASE_URL}products/search?keyword=${name}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": user.token,
        },
      },
    );

    const data = response.data.data;

    let i: t[] = [];
    data.forEach((val: any) => {
      const sizes = (val.product_size as { label: string }[]).map(
        (val) => val.label,
      );

      i.push({
        title: val.product_name,
        subtitle: val.description,
        imageUri: val.product_images[0].image_url,
        amount: 1,
        price: 100,
        originalPrice: 200,
        discountPercentage: 50,
        productId: parseInt(val.product_id),
        sizes,
      });
    });

    setItems(i);
  }

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <Image
        source={require("../../../../assets/offers/deals_banner.png")}
        style={{ width: "100%", marginVertical: 20 }}
      />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 24,
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 16 }}>
          {items.length} "{name}"
        </Text>
        {/* <Text style={{ fontSize: 16 }}>{"O"}</Text> */}
      </View>
      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={Array(10).fill("New Arrival")}
          style={{ marginVertical: 40 }}
          renderItem={(val) => <TopCategory title={val.item} />}
        />
      </View>

      <CustomCarousel
        data={data}
        title={"SHOP BY CURATION"}
        mainTitleStyle={{ textAlign: "left", marginHorizontal: 16 }}
        imageHeight="400px"
        imageWidth="200px"
        additionalStyles={{ marginHorizontal: 16, marginTop: 0 }}
        titleStyle={{ fontSize: 16, textAlign: "center", color: "white" }}
        subTitleStyle={{ fontSize: 14, textAlign: "center", color: "white" }}
      />

      <Text
        style={{
          textAlign: "left",
          marginHorizontal: 16,
          fontFamily: textStyles.title.fontFamily,
          letterSpacing: textStyles.title.letterSpacing,
          color: "black",
          fontSize: 16,
          marginVertical: 32,
        }}
      >
        Shop all {name}
      </Text>

      <View>
        {items.map((item, index) => (
          <Link
            key={index}
            href={{
              pathname: "/product/productDetail",
              params: {
                productId: item.productId,
                searchKeyWord: name,
              },
            }}
          >
            <Item
              title={item.title}
              subtitle={item.subtitle}
              amount={item.amount}
              price={item.price}
              productId={item.productId}
              imageUri={item.imageUri}
              originalPrice={item.originalPrice}
              sizes={item.sizes}
              discountPercentage={item.discountPercentage}
            />
          </Link>
        ))}
      </View>
    </ScrollView>
  );
}

export default categoryListView;

function Item({
  title,
  subtitle,
  originalPrice,
  discountPercentage,
  sizes,
  imageUri,
  price,
}: t) {
  return (
    <View style={{ padding: 20 }}>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Image source={{ uri: imageUri }} style={{ width: 150, height: 150 }} />
        <View
          style={{
            marginHorizontal: 16,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 16, flexWrap: "wrap", maxWidth: "70%" }}>
            {title}
          </Text>
          <Text style={{ fontSize: 16, fontWeight: 300, maxWidth: "60%" }}>
            {subtitle}
          </Text>
          <View style={{ display: "flex", flexDirection: "row" }}>
            {sizes.map((val) => (
              <Text
                key={val}
                style={{
                  margin: 5,
                  padding: 5,
                  fontWeight: 200,
                }}
              >
                {val}
              </Text>
            ))}
          </View>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={{ fontSize: 16, fontWeight: 600 }}>${price}</Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginHorizontal: 10,
                textDecorationLine: "line-through",
              }}
            >
              ${originalPrice}
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginRight: 20,
                color: "green",
              }}
            >
              {discountPercentage}% off
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
