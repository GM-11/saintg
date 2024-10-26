import { Image, StyleSheet, View } from "react-native";
import SvgUri from "react-native-svg-uri";

const shipping = require("../../assets/whyus/free_shipping.png");
const handcrafted = require("../../assets/whyus/handcrafted.png");
const leather = require("../../assets/whyus/leather.png");
const quality = require("../../assets/whyus/quality.png");
const secure = require("../../assets/whyus/secure.png");
const sustainability = require("../../assets/whyus/sustainability.png");

export default function WhyChooseUs() {
  return (
    <View style={{ ...styles.mainContainer }}>
      <Image width={20} source={quality} />
      <Image source={shipping} />
      <Image source={leather} />
      <Image source={sustainability} />
      <Image source={secure} />
      <Image source={handcrafted} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginVertical: 32,

    gap: 30,
  },
});
