import textStyles from "@/styles/textStyles";
import React from "react";
import {
  Text,
  View,
  FlatList,
  ImageBackground,
  StyleProp,
  TextStyle,
} from "react-native";

type props = {
  data: {
    title?: string;
    subtitle?: string;
    id?: string;
    image: { uri: string };
  }[];
  imageWidth: string;
  title?: string | null;
  imageHeight: string;
  titleStyle?: StyleProp<TextStyle>;
  subTitleStyle?: StyleProp<TextStyle>;
  additionalStyles?: {};
  mainTitleStyle?: {};
};

function CustomCarousel({
  data,
  imageWidth,
  imageHeight,
  title,
  titleStyle,
  subTitleStyle,
  additionalStyles,
  mainTitleStyle,
}: props) {
  return (
    <View style={{ margin: 0, padding: 0 }}>
      {title ? (
        <Text
          style={{
            fontFamily: textStyles.title.fontFamily,
            letterSpacing: textStyles.title.letterSpacing,
            textAlign: "center",
            color: "black",
            fontSize: 16,
            marginVertical: 32,
            ...mainTitleStyle,
          }}
        >
          {title}
        </Text>
      ) : (
        <View />
      )}
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        style={{
          width: "100%",
          margin: 0,
        }}
        data={data}
        renderItem={(val) => {
          return (
            <ImageBackground
              /// @ts-ignore
              style={{
                width: imageWidth,
                height: imageHeight,
                flexDirection: "column-reverse",
                display: "flex",
                ...additionalStyles,
              }}
              source={{ uri: val.item.image.uri }}
            >
              <View style={{ margin: 16 }}>
                <Text style={titleStyle}>{val.item.title}</Text>
                <Text style={subTitleStyle}>{val.item.subtitle}</Text>
              </View>
            </ImageBackground>
          );
        }}
      />
    </View>
  );
}

export default CustomCarousel;
