import textStyles from "@/styles/textStyles";
import React from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ImageBackground,
} from "react-native";
import CustomCarousel from "../CustomCarousel";

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

function TrendingNow() {
  return (
    <View>
      <CustomCarousel
        titleStyle={{ color: "white", textAlign: "center" }}
        subTitleStyle={{ color: "white", textAlign: "center" }}
        title={"TRENDING NOW"}
        data={data}
        imageHeight="40vh"
        imageWidth="40vw"
        additionalStyles={{ margin: 12 }}
      />
      {/* <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        style={{
          width: "100%",
        }}
        data={data}
        renderItem={(val) => (
          <ImageBackground
            ///@ts-ignore
            style={{
              width: "40vw",
              height: "40vh",
              marginHorizontal: 12,
              flexDirection: "column-reverse",
              display: "flex",
            }}
            source={val.item.image}
          >
            <View
              style={{
                margin: 16,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "white",
                  ...textStyles.font,
                  fontSize: 16,
                  textAlign: "center",
                }}
              >
                {val.item.title}
              </Text>
              <Text
                style={{
                  color: "white",
                  ...textStyles.font,
                  fontSize: 14,
                  textAlign: "center",
                }}
              >
                {val.item.subtitle}
              </Text>
            </View>
          </ImageBackground>
        )}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({});

export default TrendingNow;
