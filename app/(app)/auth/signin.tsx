import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "@/constants/constant";
import { router } from "expo-router";
import { IUser } from "@/constants/types";
import Toast from "react-native-toast-message";
import Eye from "@/components/Eye";

function signin() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isPhoneNumber, setIsPhoneNumber] = useState<boolean>(false);
  const [countryCodeDropDownExpanded, setCountryCodeExpanded] =
    useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const countryCodeOptions = ["+91", "+44", "+1"];
  const [countryCode, setCountryCode] = useState<string>(countryCodeOptions[0]);
  const [loading, setLoading] = useState<boolean>(false);

  async function signInUser() {
    setLoading(true);
    if (email === "" || password === "") {
      setError(true);
      setErrorText("Email/Phone and password are required");
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;

    const isEmail = emailRegex.test(email);
    const isPhone = phoneRegex.test(email);

    if (!isEmail && !isPhone) {
      setError(true);
      setErrorText("Invalid email or phone number");
      Toast.show({ text1: "Invalid email or phone number" });
      setLoading(false);
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
        setError(true);
        setErrorText(data.msg || data.message);
        Toast.show({ text1: data.msg || data.message });
        setLoading(false);
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

      let regionId: string;
      if (countryCode === "+44") {
        regionId = "1";
      } else if (countryCode === "+1") {
        regionId = "2";
      } else {
        regionId = "3";
      }
      const u: IUser = {
        name: userDetails.fullName,
        email: userDetails.email,
        phoneNumber: userDetails.phoneNumber,
        token: data.token,
        gender: userDetails.gender,
        password: password,
        address: addressText,
        regionId,
      };

      await AsyncStorage.setItem("userDetails", JSON.stringify(u));

      Toast.show({ text1: "User sign in successful" });

      setTimeout(() => {
        router.replace("/");
      }, 1000);
    } catch (error) {
      console.error("Error signing in user:", error);
      setError(true);
      setErrorText(`Error signing in user: ${error}`);
      Toast.show({ text1: "Error signing in user" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.body}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color="black" size="large" />
        </View>
      ) : (
        <View />
      )}
      <Image
        style={{ alignSelf: "center", marginBottom: 30 }}
        source={require("../../../assets/images/saintg-logo-black.png")}
      />
      <Text style={{ ...styles.text, marginBottom: 40 }}>SIGN IN</Text>
      <View style={styles.form}>
        <Text style={styles.textSize12}> EMAIL ID / MOBILE NO. </Text>

        <View style={styles.inputContainer}>
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
              setError(false);
              setErrorText("");
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
                <Text style={styles.dropdownOptions}>{val}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View />
        )}

        <View style={styles.passwordContainer}>
          <Text style={styles.textSize12}> PASSWORD </Text>
          <View style={styles.passwordInputContainer}>
            <TextInput
              value={password}
              style={styles.passwordInput}
              secureTextEntry={!showPassword}
              onChangeText={(e) => {
                setPassword(e);
                setError(false);
                setErrorText("");
              }}
            />
            <Eye
              condition={showPassword}
              func={() => setShowPassword(!showPassword)}
              rightMargin={10}
            />
            {/* <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={24}
                color="black"
              />
            </TouchableOpacity> */}
          </View>
          {error && <Text style={styles.errorText}>{errorText}</Text>}
        </View>
      </View>

      <TouchableOpacity onPress={signInUser} style={styles.buttonSignIn}>
        <Text style={{ ...styles.buttonText, marginBottom: 10 }}>SIGN IN</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          router.push("/(app)/auth/signup");
        }}
      >
        <Text>CREATE ACCOUNT</Text>
      </TouchableOpacity>

      <Text style={styles.textTnc}>
        By clicking on sign in you agree to our terms of use and privacy policy
      </Text>
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
  loadingContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "transparent",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  passwordContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
    width: "100%",
    marginVertical: 16,
  },
  passwordInput: {
    flex: 1,
    padding: 8,
  },
  eyeIcon: {
    padding: 8,
  },
  dropdownOptions: {
    padding: 16,
    fontSize: 12,
    fontFamily: "Lato-Regular",
    textAlign: "left",
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
  inputContainer: {
    borderColor: "black",
    borderWidth: 1,
    width: "100%",
    marginVertical: 16,
    padding: 8,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    fontFamily: "Lato-Regular",
    marginTop: 5,
    alignSelf: "flex-start",
    width: "100%",
  },
});

export default signin;
