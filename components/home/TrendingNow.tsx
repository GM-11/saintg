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
import AsyncStorage from "@react-native-async-storage/async-storage";

const dummyData = [
  {
    id: "1",
    title: "NEW SEASON",
    subtitle: "Latest styles for your summer refresh",
    image: {
      uri: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    },
  },
  {
    id: "2",
    title: "WINTER COLLECTION",
    subtitle: "Cozy and stylish for the cold weather",
    image: {
      uri: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    },
  },
  {
    id: "3",
    title: "SPRING BLOSSOMS",
    subtitle: "Fresh looks for the new season",
    image: {
      uri: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
    },
  },
  {
    id: "4",
    title: "FALL FAVORITES",
    subtitle: "Warm and comfortable outfits",
    image: {
      uri: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a",
    },
  },
  {
    id: "5",
    title: "CASUAL WEAR",
    subtitle: "Comfort meets style in casual wear",
    image: {
      uri: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb",
    },
  },
];

type dataProps = {
  data: {
    title?: string;
    subtitle?: string;
    id?: string;
    image: { uri: string };
  }[];
};

function TrendingNow({ data }: dataProps) {
  return (
    <View>
      <CustomCarousel
        titleStyle={{ color: "white", textAlign: "center" }}
        subTitleStyle={{ color: "white", textAlign: "center" }}
        title={"TRENDING NOW"}
        data={data.length < 2 ? dummyData : data}
        viewWidth={200}
        viewHeight={300}
        additionalStyles={{ marginHorizontal: 16 }}
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
