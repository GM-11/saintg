import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
} from "react-native";

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

    try {
      const result = await fetch(`${BASE_URL}user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await result.json();
      console.log(data);
      if (data.code !== 200) {
        console.log("Error signing in user");
        return;
      }

      // await AsyncStorage.setItem(
      //   "userDetails",
      //   JSON.stringify({ ...userDetails, token: data.token }),
      // );
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
        <Pressable>
          <Text>FORGOT PASSWORD</Text>
        </Pressable>
      </View>
      <Pressable
        onPress={() => {
          // router.push("/(auth)/signin");
        }}
        style={styles.buttonSignIn}
      >
        <Text style={styles.buttonText}>SIGN IN</Text>
      </Pressable>
      <Pressable>
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
      <Text style={styles.text}>SKIP </Text>
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
    paddingVertical: 8,
  },
});

export default signin;
