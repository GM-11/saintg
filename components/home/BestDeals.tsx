import React from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ImageBackground,
} from "react-native";
import CustomCarousel from "../CustomCarousel";
import textStyles from "@/styles/textStyles";

const dummyData = [
  {
    id: "1",
    title: "Sandals",
    subtitle: "Flat 50% Off",
    image: {
      uri: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb",
    },
  },
  {
    id: "2",
    title: "Sneakers",
    subtitle: "Limited Edition",
    image: {
      uri: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb",
    },
  },
  {
    id: "3",
    title: "Dresses",
    subtitle: "Summer Collection",
    image: {
      uri: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb",
    },
  },
  {
    id: "4",
    title: "Handbags",
    subtitle: "Designer Picks",
    image: {
      uri: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb",
    },
  },
  {
    id: "5",
    title: "Accessories",
    subtitle: "Spring Essentials",
    image: {
      uri: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb",
    },
  },
];

function BestDeals() {
  return (
    <CustomCarousel
      titleStyle={{ color: "white", textAlign: "center" }}
      subTitleStyle={{ color: "white", textAlign: "center" }}
      title={"BEST DEALS"}
      data={dummyData}
      viewWidth={200}
      viewHeight={300}
      additionalStyles={{ marginHorizontal: 16 }}
    />
    // <View>
    //   <Text
    //     style={{
    //       fontFamily: textStyles.title.fontFamily,
    //       letterSpacing: textStyles.title.letterSpacing,
    //       textAlign: "center",
    //       color: "black",
    //       fontSize: 16,
    //       marginVertical: 32,
    //     }}
    //   >
    //     BEST DEALS
    //   </Text>
    //   <FlatList
    //     horizontal
    //     showsHorizontalScrollIndicator={false}
    //     pagingEnabled
    //     style={{
    //       width: "100%",
    //     }}
    //     data={data}
    //     renderItem={(val) => (
    //       <View
    //         style={{
    //           display: "flex",
    //           justifyContent: "center",
    //           alignItems: "center",
    //         }}
    //       >
    //         <ImageBackground
    //           ///@ts-ignore
    //           style={{
    //             width: 400 * 0.4,
    //             height: 350,
    //             flexDirection: "column-reverse",
    //             marginHorizontal: 12,
    //           }}
    //           source={val.item.image}
    //         >
    //           <View
    //             style={{
    //               display: "flex",
    //               justifyContent: "center",
    //               alignItems: "center",
    //               height: "100%",
    //               width: "100%",
    //               backgroundColor: "rgba(0,0,0,0.4)",
    //             }}
    //           >
    //             <Text
    //               style={{ color: "white", fontSize: 16, ...textStyles.font }}
    //             >
    //               Flat 50% off
    //             </Text>
    //           </View>
    //         </ImageBackground>
    //         <Text style={{ fontSize: 16, ...textStyles.font }}>Sandals</Text>
    //       </View>
    //     )}
    //   />
    // </View>
  );
}

const styles = StyleSheet.create({});

export default BestDeals;
