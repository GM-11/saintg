import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import { BASE_URL } from "@/constants/constant";
import OTPOverlay from "@/components/OTPoverlay";
import axios from "axios";
import Toast from "react-native-toast-message";

function signup() {
  const genderOPtions = ["men", "women", "unisex"];
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const countryCodeOptions = ["+44", "+1", "+91"];
  const [countryCode, setCountryCode] = useState<string>(countryCodeOptions[0]);
  const [selectedGender, setSelectedGender] = useState<string>(
    genderOPtions[0],
  );
  const [genderDropDownExpanded, setGenderDropDownExpaneded] =
    useState<boolean>(false);
  const [countryCodeDropDownExpanded, setCountryCodeExpanded] =
    useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [showError, setShowError] = useState<boolean>(false);

  const [showOTPOtpOverlay, setShowOTPOtpOverlay] = useState<boolean>(false);

  const { regionId } = useLocalSearchParams<{ regionId: string }>();

  function showToast(text: string) {
    Toast.show({
      text1: text,
    });
  }

  async function signUpUser() {
    if (name === "" || email === "" || password === "" || mobile === "") {
      setError("Please fill all fields");
      setShowError(true);
      showToast("Please fill all fields");
      return;
    }

    if (mobile.length !== 10) {
      setError("Mobile number should be 10 digits");
      setShowError(true);
      showToast("Mobile number should be 10 digits");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email");
      setShowError(true);
      showToast("Invalid email");
      return;
    }
    try {
      const body = {
        fullName: name,
        phoneNumber: `${countryCode}${mobile}`,
        email,
        gender: selectedGender == "men" ? "male" : "female",
        password,
        // regionId,
      };

      // setShowOTPOtpOverlay(true);

      const res = await fetch(`${BASE_URL}user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      Toast.show({ text1: data.message || data.msg });

      if (data.code !== 200) {
        setError(data.message || data.msg || "Something went wrong");
        setShowError(true);
        return;
      }
      setShowOTPOtpOverlay(true);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    } catch (error) {
      console.error("Error signing up user:", error);
      setError("Something went wrong. Please try again.");
      setShowError(true);
    }
  }

  useEffect(() => {
    setCountryCode(countryCodeOptions[parseInt(regionId) - 1]);
  }, []);

  return (
    <>
      {showOTPOtpOverlay && (
        <View
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1000,
          }}
        >
          <OTPOverlay
            otpLength={6}
            closeModel={() => {
              setShowOTPOtpOverlay(false);
            }}
            userDetails={{
              name,
              email,
              password,
              gender: selectedGender,
              phoneNumber: `${countryCode}${mobile}`,
              regionId: parseInt(regionId),
            }}
          />
        </View>
      )}
      <View style={styles.body}>
        <Image
          style={{ alignSelf: "center" }}
          source={require("../../../assets/images/saintg-logo-black.png")}
        />
        <Text style={{ ...styles.text, marginVertical: 30 }}>
          CREATE NEW ACCOUNT
        </Text>
        <View style={styles.form}>
          <Text style={styles.textSize12}> FULL NAME </Text>
          <TextInput
            value={name}
            style={styles.input}
            onChangeText={(e) => setName(e)}
          />

          <Text style={styles.textSize12}> EMAIL ID </Text>
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

          <Text style={styles.textSize12}> GENDER </Text>

          <View
            style={{
              ...styles.input,
              paddingVertical: 10,
              paddingHorizontal: 10,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.textSize12}>{selectedGender}</Text>
            <TouchableOpacity
              onPress={() =>
                setGenderDropDownExpaneded(!genderDropDownExpanded)
              }
            >
              <Text style={styles.textSize12}>V</Text>
            </TouchableOpacity>
          </View>

          {genderDropDownExpanded ? (
            <View style={styles.dropdown}>
              {genderOPtions.map((val) => (
                <TouchableOpacity
                  key={genderOPtions.indexOf(val)}
                  onPress={() => {
                    setSelectedGender(val);
                    setGenderDropDownExpaneded(false);
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

          <Text style={styles.textSize12}> MOBILE NUMBER </Text>
          <View
            style={{
              ...styles.input,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setCountryCodeExpanded(true);
              }}
            >
              <Text style={styles.textSize12}>{countryCode}</Text>
            </TouchableOpacity>

            <TextInput
              style={{ width: "95%", margin: 2 }}
              value={mobile}
              keyboardType="number-pad"
              onChangeText={(e) => setMobile(e)}
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
        </View>
        {showError && (
          <Text style={{ color: "red", fontSize: 12, marginTop: 8 }}>
            {error}
          </Text>
        )}

        <TouchableOpacity onPress={signUpUser} style={styles.buttonSignIn}>
          <Text style={styles.buttonText}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    position: "absolute",
    backgroundColor: "#dedede",
    width: "100%",
    top: 350,
    zIndex: 2,
  },
  dropdownOptions: {
    padding: 16,
  },
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

export default signup;
