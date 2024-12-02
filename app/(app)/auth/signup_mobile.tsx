import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import AntDesign from "@expo/vector-icons/AntDesign";

import OTPOverlay from "@/components/OTPoverlay";
import { BASE_URL, countryCodeOptions } from "@/constants/constant";
import Toast from "react-native-toast-message";
import { router, useLocalSearchParams } from "expo-router";
import { IUser } from "@/constants/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignInScreen = () => {
  const [selectedCountry, setSelectedCountry] = useState(1);
  const [showOTPOtpOverlay, setShowOTPOtpOverlay] = useState<boolean>(false);
  const [otpString, setOtpString] = useState<string>("");

  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [submitText, setSubmitText] = useState<string>("SEND OTP");
  const [selectedGender] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [body, setBody] = useState<any>({});

  const [showError, setShowError] = useState<boolean>(false);
  const [countryCodeDropDownExpanded, setCountryCodeExpanded] =
    useState<boolean>(false);

  const { regionId } = useLocalSearchParams<{ regionId: string }>();

  useEffect(() => {
    setSelectedCountry(parseInt(regionId));
  }, []);

  async function verifyOTP() {
    const result = await fetch(`${BASE_URL}user/register/otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        otp: otpString,
      }),
    });
    const data = await result.json();
    if (data.code !== 200) {
      Toast.show({ text1: "Something went wrong" });
      return;
    }

    const userDetails = {
      ...body,
      regionId: parseInt(regionId),
      token: data.token,
    };

    await AsyncStorage.setItem("userDetails", JSON.stringify(userDetails));
    setTimeout(() => {
      router.replace("/(app)/(tabs)");
    }, 1000);
  }

  const handleSendOTP = async () => {
    if (submitText === "SUBMIT") {
    }

    if (mobileNumber.length !== 10) {
      setError("Please enter a valid mobile number");
      setShowError(true);
      return;
    }
    const body = {
      fullName: "x",
      phoneNumber: `${countryCodeOptions[selectedCountry - 1]}${mobileNumber}`,
      email: "x",
      gender: selectedGender == "men" ? "male" : "female",
      password: "x",
      // regionId: selectedCountry,
    };
    const res = await fetch(`${BASE_URL}user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    console.log(data);
    Toast.show({ text1: data.message || data.msg });
    if (data.code !== 200) {
      setError(data.message || data.msg || "Something went wrong");
      setShowError(true);
      return;
    }
    setBody(body);
    setShowOTPOtpOverlay(true);
    setSubmitText("SUBMIT");
  };

  const handleSkip = async () => {
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
      router.replace("/(app)/(tabs)");
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: "center",
          width: "100%",
          top: -80,
        }}
      >
        <Picker
          selectedValue={selectedCountry}
          style={{
            width: 300,
            height: 60,
            color: "black",
          }}
          dropdownIconColor={"black"}
          onValueChange={(itemValue: number) => setSelectedCountry(itemValue)}
        >
          <Picker.Item label="🇬🇧 United Kingdom (GBP)" value={1} />
          <Picker.Item label="🇺🇸 United States (USD)" value={2} />
          <Picker.Item label="🇮🇳 India (INR)" value={3} />
        </Picker>
      </View>
      <Image
        style={{ alignSelf: "center", top: -30 }}
        source={require("../../../assets/images/saintg-logo-black.png")}
      />

      <Text style={styles.subtitle}>SIGN IN WITH MOBILE NUMBER</Text>

      <Text style={styles.label}>MOBILE NUMBER</Text>
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={() => setCountryCodeExpanded(true)}>
          <Text>{countryCodeOptions[selectedCountry - 1]}</Text>
        </TouchableOpacity>
        {countryCodeDropDownExpanded ? (
          <View
            style={{
              position: "absolute",
              backgroundColor: "#dedede",
              width: "100%",
              zIndex: 1,
            }}
          >
            {countryCodeOptions.map((val) => (
              <TouchableOpacity
                key={countryCodeOptions.indexOf(val)}
                onPress={() => {
                  setSelectedCountry(countryCodeOptions.indexOf(val) + 1);
                  setCountryCodeExpanded(false);
                }}
              >
                <Text
                  style={{
                    padding: 16,
                    color: "black",
                    textAlign: "left",
                    fontSize: 12,
                    fontFamily: "Lato-Regular",
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

        <TextInput
          style={styles.input}
          placeholder="Enter your number"
          keyboardType="phone-pad"
          value={mobileNumber}
          onChangeText={setMobileNumber}
        />
      </View>

      {showOTPOtpOverlay ? (
        <>
          <Text style={styles.label}>OTP</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your OTP"
              keyboardType="phone-pad"
              value={otpString}
              onChangeText={setOtpString}
            />
          </View>
        </>
      ) : (
        <View style={{ height: 100 }} />
      )}

      {showError && (
        <Text style={{ color: "red", fontSize: 14, marginTop: 10 }}>
          {error}
        </Text>
      )}

      <TouchableOpacity
        style={{
          backgroundColor: "black",
          borderColor: "white",
          borderWidth: 1,
          width: "100%",
          marginHorizontal: 18,
          marginVertical: 8,
          padding: 16,
          marginTop: 20,
        }}
        onPress={handleSendOTP}
      >
        <Text
          style={{
            fontWeight: 300,
            color: "white",
            fontSize: 16,
            fontFamily: "Lato-Regular",
            letterSpacing: 4,
            alignSelf: "center",
          }}
        >
          {submitText}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          router.push({
            pathname: "/(app)/auth/signin",
            params: { regionId },
          });
        }}
      >
        <Text
          style={{
            color: "black",
            fontSize: 12,
            fontFamily: "Lato-Regular",
            letterSpacing: 3,
            alignSelf: "center",
            marginTop: 15,
          }}
        >
          ALREADY HAVE ACCOUNT
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.skipContainer} onPress={handleSkip}>
        <Text style={styles.skipText}>SKIP</Text>
        <AntDesign name="arrowright" size={16} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "serif", // Use a serif font for similar style
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 14,
    letterSpacing: 2,
    color: "#000",
    marginBottom: 40,
    top: -20,
    fontFamily: "Lato-Regular",
  },
  label: {
    alignSelf: "flex-start",
    marginBottom: 15,
    letterSpacing: 4,
    fontFamily: "Lato-Regular",
    color: "#000",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
    paddingHorizontal: 10,
    marginBottom: 20,
    width: "100%",
  },

  input: {
    flex: 1,
    padding: 10,
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  linkText: {
    color: "#000",
    marginBottom: 20,
    letterSpacing: 2,
  },
  skipContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 100,
  },
  skipText: {
    color: "#000",
    marginRight: 5,
  },
  arrow: {
    color: "#000",
    fontSize: 18,
  },
});

export default SignInScreen;
