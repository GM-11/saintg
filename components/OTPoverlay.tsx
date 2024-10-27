import { BASE_URL } from "@/constants/constant";
import { IUser } from "@/constants/types";
import textStyles from "@/styles/textStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import Toast from "react-native-toast-message";

interface OTPVerificationProps {
  otpLength: number;
  resendDelay?: number;
  closeModel: () => void;
  userDetails?: {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    gender: string;
    regionId: number;
  };
}

const OTPOverlay: React.FC<OTPVerificationProps> = ({
  otpLength = 6,
  resendDelay = 30,
  closeModel,
  userDetails,
}) => {
  const [otp, setOtp] = useState<string[]>(Array(otpLength).fill(""));
  const [timeLeft, setTimeLeft] = useState<number>(resendDelay);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [timeLeft]);

  async function sendOTPForRegister() {
    if (!userDetails) return;
    const otpString = otp.join("");
    if (otpString.length !== otpLength) {
      return;
    }

    try {
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

      // const data = {
      //   token:
      //     "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiOWMwZTc2NGEtMDgwMi00MmY5LTgyZGUtODIwNTc4ZTc5YzFlIiwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNzI2NjAwNzQ1LCJleHAiOjE3MjkxOTI3NDV9.SgbjH-5BICP0Dh3cUeYYs4ZPbyeED_yXGA75t_BFJX7ABY9OxLklFZmLZIQNBkjCEz8QOXjPeaTnGUvZ9gYPkA",
      // };

      await AsyncStorage.setItem(
        "userDetails",
        JSON.stringify({ ...userDetails, token: data.token }),
      );
      setTimeout(() => {
        router.replace("/");
      }, 1000);

      closeModel();
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  }

  async function sendOTPForPasswordChange() {
    const otpString = otp.join("");
    if (otpString.length !== otpLength) {
      return;
    }

    try {
      const result = await fetch(`${BASE_URL}/user/verify-otp`, {
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

      // console.log("Password reset successful");
      closeModel();
      // Navigate to password reset success screen or login screen
      // router.replace("/login");
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  }

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otpLength - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleResend = () => {
    // Implement resend logic here
    setTimeLeft(resendDelay);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            marginBottom: 12,
            textAlign: "left",
            fontSize: 16,
            ...textStyles.font,
            fontWeight: "200",
          }}
        >
          VERIFY YOUR OTP
        </Text>

        <Pressable
          onPress={() => {
            closeModel();
          }}
        >
          <Text> X </Text>
        </Pressable>
      </View>

      <Text
        style={{
          marginBottom: 20,
          fontWeight: "500",
          textAlign: "left",
          ...textStyles.font,
          fontSize: 16,
        }}
      >
        We have sent an OTP to your mobile number
      </Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.otpInput}
            value={digit}
            onChangeText={(value) => handleOtpChange(value, index)}
            keyboardType="numeric"
            maxLength={1}
            ref={(ref) => (inputRefs.current[index] = ref)}
          />
        ))}
      </View>

      {/* <Text style={styles.autoCapture}>Trying to auto capture</Text> */}

      <TouchableOpacity
        onPress={handleResend}
        disabled={timeLeft > 0}
        style={styles.resendButton}
      >
        <Text style={styles.resendText}>
          {timeLeft > 0
            ? `Didn't get the code? Resend in 00:${timeLeft
                .toString()
                .padStart(2, "0")}`
            : "Didn't get the code? Resend"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.submitButton}
        onPress={sendOTPForRegister}
      >
        <Text style={styles.submitButtonText}>SUBMIT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "flex-start",
    backgroundColor: "white",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: "center",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  otpInput: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: "black",
    textAlign: "center",
    fontSize: 18,
  },
  autoCapture: {
    fontSize: 12,
    color: "#666",
    marginBottom: 20,
  },
  resendButton: {
    marginBottom: 20,
  },
  resendText: {
    color: "black",
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: "black",
    paddingVertical: 16,
    paddingHorizontal: 30,
    width: 340,
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    letterSpacing: 4,
  },
});

export default OTPOverlay;
