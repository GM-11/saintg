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
        data={data}
        imageHeight="50vh"
        imageWidth="100vw"
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
