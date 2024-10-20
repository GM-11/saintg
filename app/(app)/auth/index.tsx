import {
  ImageBackground,
  Text,
  View,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import { router, useNavigation } from "expo-router";
import { useEffect } from "react";

export default function Index() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <View style={styles.body}>
      <ImageBackground
        source={require("../../../assets/images/first_page_bg.png")}
        style={{
          height: "100%",
          width: "100%",
          alignContent: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <Image
          style={{ alignSelf: "center" }}
          source={require("../../../assets/images/saintg-logo-white.png")}
        />
        <Text style={styles.text}>
          EXPERIENCE TRUE LUXURY {"\n\n"} NOW ON YOUR MOBILE
        </Text>

        <Pressable
          onPress={() => {
            router.push("/auth/signin");
          }}
          style={styles.buttonSignIn}
        >
          <Text style={styles.text}>SIGN IN</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            router.push("/auth/signup");
          }}
          style={styles.buttonCreate}
        >
          <Text style={styles.text}>CREATE ACCOUNT</Text>
        </Pressable>
        {/* <Text style={styles.textLater}>MAYBE LATER</Text> */}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: "center",
    fontFamily: "Lato-Regular",
    alignItems: "center",
  },
  text: {
    color: "white",
    textAlign: "center",
    fontWeight: "300",
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "Lato-Regular",
  },

  buttonSignIn: {
    backgroundColor: "black",
    marginHorizontal: 18,
    marginVertical: 8,
    padding: 16,
  },
  buttonCreate: {
    backgroundColor: "transparent",
    borderColor: "white",
    borderWidth: 1,
    marginHorizontal: 18,
    marginVertical: 8,
    padding: 16,
  },

  textLater: {
    color: "white",
    fontFamily: "Lato-Regular",
    textAlign: "center",
    fontWeight: "300",
    fontSize: 12,
    lineHeight: 24,
  },
});
