import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "@/constants/constant";
import { router } from "expo-router";
import { IUser } from "@/constants/types";
import Toast from "react-native-toast-message";

function signin() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isPhoneNumber, setIsPhoneNumber] = useState<boolean>(false);
  const [countryCodeDropDownExpanded, setCountryCodeExpanded] =
    useState<boolean>(false);

  const countryCodeOptions = ["+91", "+90"];
  const [countryCode, setCountryCode] = useState<string>(countryCodeOptions[0]);

  async function signInUser() {
    if (email === "" || password === "") {
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;

    const isEmail = emailRegex.test(email);
    const isPhone = phoneRegex.test(email);

    if (!isEmail && !isPhone) {
      Toast.show({ text1: "Invalid email or phone number" });

      return;
    }

    let body: Object;
    let url: string;

    if (isEmail) {
      body = { email, password };
      url = `${BASE_URL}user/login/email`;
    } else {
      body = {
        phoneNumber: `${countryCode}${email}`,
        password,
      };
      url = `${BASE_URL}user/login/phone`;
    }

    try {
      const result = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await result.json();
      if (data.code !== 200) {
        Toast.show({ text1: data.msg || data.message });

        return;
      }

      const userData = await fetch(`${BASE_URL}user/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": data.token,
        },
      });

      const userDetails = (await userData.json()).data;

      const addressResult = await fetch(`${BASE_URL}address/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": data.token,
        },
      });

      const addressData = (await addressResult.json()).data[0];
      const addressText = `${addressData.addressLine1}${addressData.addressLine2 ? ", " + addressData.addressLine2 : ""}, ${addressData.city}, ${addressData.state}, ${addressData.zipCode}, ${addressData.country}//ID=${addressData.id}`;

      // console.log(addressData);

      const u: IUser = {
        name: userDetails.fullName,
        email: userDetails.email,
        phoneNumber: userDetails.phoneNumber,
        token: data.token,
        gender: userDetails.gender,
        password: password,
        address: addressText,
        regionId: "1",
      };

      await AsyncStorage.setItem("userDetails", JSON.stringify(u));

      Toast.show({ text1: "User sign in successful" });

      setTimeout(() => {
        router.replace("/");
      }, 1000);
    } catch (error) {
      console.error("Error signing in user:", error);
    }
  }
  return (
    <View style={styles.body}>
      <Image
        style={{ alignSelf: "center", marginBottom: 30 }}
        source={require("../../../assets/images/saintg-logo-black.png")}
      />
      <Text style={{ ...styles.text, marginBottom: 40 }}>SIGN IN</Text>
      <View style={styles.form}>
        <Text style={styles.textSize12}> EMAIL ID / MOBILE NO. </Text>

        <View
          style={{
            ...styles.input,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {isPhoneNumber ? (
            <TouchableOpacity
              onPress={() => {
                setCountryCodeExpanded(true);
              }}
            >
              <Text style={styles.textSize12}>{countryCode}</Text>
            </TouchableOpacity>
          ) : (
            <View />
          )}

          <TextInput
            style={{ width: "95%", margin: 2 }}
            value={email}
            keyboardType="number-pad"
            onChangeText={(e) => {
              if (e.match(/[^0-9]/)) {
                setIsPhoneNumber(false);
              } else {
                setIsPhoneNumber(true);
              }
              setEmail(e);
            }}
          />
        </View>

        {countryCodeDropDownExpanded ? (
          <View style={styles.dropdown}>
            {countryCodeOptions.map((val) => (
              <TouchableOpacity
                key={countryCodeOptions.indexOf(val)}
                onPress={() => {
                  setCountryCode(val);
                  setCountryCodeExpanded(false);
                }}
              >
                <Text
                  style={{
                    ...styles.dropdownOptions,
                    ...styles.textSize12,
                    textAlign: "left",
                  }}
                >
                  {val}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View />
        )}
        <Text style={styles.textSize12}> PASSWORD </Text>

        <TextInput
          value={password}
          style={styles.input}
          onChangeText={(e) => setPassword(e)}
        />
        {/* <Pressable>
          <Text>FORGOT PASSWORD</Text>
        </Pressable> */}
      </View>
      <Pressable onPress={signInUser} style={styles.buttonSignIn}>
        <Text style={{ ...styles.buttonText, marginBottom: 10 }}>SIGN IN</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          router.push("/(app)/auth/signup");
        }}
      >
        <Text>CREATE ACCOUNT</Text>
      </Pressable>
      {/* <Text>LOGIN WITH SOCIAL MEDIA</Text>

      <Pressable
        onPress={async () => {
          // router.push("/(auth)/signin");
        }}
        style={styles.googleLogin}
      >
        <Text style={styles.text}>LOGIN WITH GOOGLE</Text>
      </Pressable> */}
      <Text style={styles.textTnc}>
        By clicking on sign in you agree to our terms of use and privacy policy
      </Text>
      {/* <Text style={styles.text}>SKIP </Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    borderWidth: 0,
  },
  dropdownOptions: {
    padding: 16,
  },
  dropdown: {
    position: "absolute",
    backgroundColor: "#dedede",
    width: "100%",
    top: 90,
    zIndex: 2,
  },
  buttonSignIn: {
    backgroundColor: "black",
    width: "90%",
    marginTop: 36,
    padding: 16,
  },
  googleLogin: {
    backgroundColor: "transparent",
    borderColor: "#DEDEDE",
    borderWidth: 1,
    width: "60%",
    marginTop: 36,
    padding: 16,
  },

  text: {
    color: "black",
    alignSelf: "center",
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Lato-Regular",
  },
  buttonText: {
    color: "white",
    alignSelf: "center",
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Lato-Regular",
  },
  textSize12: {
    color: "black",
    textAlign: "right",
    fontSize: 12,
    fontFamily: "Lato-Regular",
  },
  textTnc: {
    color: "black",
    textAlign: "center",
    fontSize: 12,
    lineHeight: 24,
    width: "75%",
    fontFamily: "Lato-Regular",
  },

  form: {
    display: "flex",
    justifyContent: "flex-start",
    alignContent: "flex-start",
    alignItems: "flex-start",
    width: "80%",
  },

  input: {
    borderColor: "black",
    borderWidth: 1,
    width: "100%",
    marginVertical: 16,
    padding: 8,
  },
});

export default signin;
