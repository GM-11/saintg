import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
} from "react-native";

import Toast from "react-native-simple-toast";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "@/constants/constant";
import { router } from "expo-router";

function signin() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function signInUser() {
    if (email === "" || password === "") {
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;

    const isEmail = emailRegex.test(email);
    const isPhone = phoneRegex.test(email);

    if (!isEmail && !isPhone) {
      Toast.show("Invalid email or phone number", Toast.SHORT);
      return;
    }

    let body;
    let url;

    if (isEmail) {
      body = { email, password };
      url = `${BASE_URL}user/login/email`;
    } else {
      body = {
        phoneNumber: email,
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
      console.log(data);
      if (data.code !== 200) {
        Toast.show(data.msg || data.message, Toast.SHORT);
        console.log("Error signing in user");
        return;
      }

      // await AsyncStorage.setItem(
      //   "userDetails",
      //   JSON.stringify({ ...userDetails, token: data.token }),
      // );
      //

      Toast.show("User sign in successful", Toast.SHORT);

      console.log("User details stored successfully");
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
        style={{ alignSelf: "center" }}
        source={require("../../../assets/images/saintg-logo-black.png")}
      />
      <Text style={styles.text}>SIGN IN</Text>
      <View style={styles.form}>
        <Text style={styles.textSize12}> EMAIL ID / MOBILE NO. </Text>

        <TextInput
          value={email}
          style={styles.input}
          onChangeText={(e) => setEmail(e)}
        />
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
        <Text style={styles.buttonText}>SIGN IN</Text>
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
