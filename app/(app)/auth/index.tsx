import { ImageBackground, Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { router, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { IUser } from "@/constants/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function Index() {
  const navigation = useNavigation();

  const [selectedCountry, setSelectedCountry] = useState(1);

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  async function maybeLater() {
    const userDetails: IUser = {
      name: "",
      email: "",
      phoneNumber: "",
      gender: "",
      password: "",
      token: "",
      address: "",
      regionId: `${selectedCountry}`,
    };

    await AsyncStorage.setItem("userDetails", JSON.stringify(userDetails));
    setTimeout(() => {
      router.replace("/");
    }, 1000);
  }

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
        <View style={styles.container}>
          <Picker
            selectedValue={selectedCountry}
            style={styles.picker}
            dropdownIconColor={"white"}
            onValueChange={(itemValue) => setSelectedCountry(itemValue)}
          >
            <Picker.Item label="🇬🇧 United Kingdom (GBP)" value={1} />
            <Picker.Item label="🇺🇸 United States (USD)" value={2} />
            <Picker.Item label="🇮🇳 India (INR)" value={3} />
          </Picker>
        </View>
        <Image
          style={{ alignSelf: "center", marginBottom: 40, marginTop: 0 }}
          source={require("../../../assets/images/saintg-logo-white.png")}
        />
        <Text
          style={{
            ...styles.text,
            lineHeight: 48,
            marginVertical: 30,
            width: "65%",
            letterSpacing: 2,
            alignSelf: "center",
          }}
        >
          EXPERIENCE TRUE LUXURY NOW ON YOUR MOBILE
        </Text>

        <TouchableOpacity
          onPress={() => {
            router.push({
              pathname: "/auth/signin",
              params: { regionId: selectedCountry },
            });
          }}
          style={styles.buttonSignIn}
        >
          <Text style={styles.text}>SIGN IN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            router.push({
              pathname: "/(app)/auth/signup_mobile",
              params: { regionId: selectedCountry },
            });
          }}
          style={styles.buttonCreate}
        >
          <Text style={styles.text}>CREATE ACCOUNT</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={maybeLater}
          style={{
            display: "flex",
            alignSelf: "center",
            flexDirection: "row",
            alignItems: "center",
            width: "27%",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.textLater}>MAYBE LATER</Text>
          <AntDesign name="arrowright" size={18} color="white" />
        </TouchableOpacity>
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
  container: {
    alignItems: "center",
    width: "100%",
    top: -125,
  },
  selectedContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  flag: {
    fontSize: 30,
    marginRight: 10,
  },
  textDropdown: {
    fontSize: 18,
    color: "white",
  },
  picker: {
    width: 250,
    height: 30,
    color: "white",
  },
  text: {
    color: "white",
    textAlign: "center",
    fontWeight: "300",
    fontFamily: "Lato-Regular",
  },

  buttonSignIn: {
    backgroundColor: "transparent",
    borderColor: "white",
    borderWidth: 1,
    marginHorizontal: 18,
    marginVertical: 8,
    padding: 16,
  },
  buttonCreate: {
    backgroundColor: "black",
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
