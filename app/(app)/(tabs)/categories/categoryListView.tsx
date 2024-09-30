import CustomCarousel from "@/components/CustomCarousel";
import TopCategory from "@/components/home/TopCategory";
import textStyles from "@/styles/textStyles";
import { Link } from "expo-router";
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
  discountPercentage?: number;
};

function categoryListView() {
  const [items, setItems] = useState<t[]>([]);

  useEffect(() => {
    setItems([
      {
        title: "Item 1",
        subtitle: "Subtitle 1",
        amount: 1,
        price: 10,
        imageUri: "https://via.placeholder.com/150",
        originalPrice: 20,
        discountPercentage: 50,
      },
      {
        title: "Item 2",
        subtitle: "Subtitle 2",
        amount: 2,
        price: 20,
        imageUri: "https://via.placeholder.com/150",
        originalPrice: 40,
        discountPercentage: 50,
      },
    ]);
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
        <Text style={{ fontSize: 16 }}>4500 "HEELS"</Text>
        <Text style={{ fontSize: 16 }}>{"O"}</Text>
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
        SHOP ALL HEELS
      </Text>

      <View>
        {items.map((item, index) => (
          <Link key={index} href={"/product/productDetail"}>
            <Item
              title={item.title}
              subtitle={item.subtitle}
              amount={item.amount}
              price={item.price}
              imageUri={item.imageUri}
              originalPrice={item.originalPrice}
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
  price,
  imageUri,
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
          <Text style={{ fontSize: 16 }}>{title}</Text>
          <Text style={{ fontSize: 16, fontWeight: 300 }}>{subtitle}</Text>
          <View style={{ display: "flex", flexDirection: "row" }}>
            {[36, 37, 38, 39, 40].map((val) => (
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
