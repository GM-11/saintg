import OTPOverlay from "@/components/OTPoverlay";
import { BASE_URL } from "@/constants/constant";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import Toast from "react-native-toast-message";

function changePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [currentPassHidden, setCurrentPassHidden] = useState(true);
  const [newPassHidden, setNewPassHidden] = useState(true);
  const [confirmPassHidden, setConfirmPassHidden] = useState(true);

  const [showOTPOtpOverlay, setShowOTPOtpOverlay] = useState<boolean>(false);

  async function updatePassword() {
    if (newPassword !== confirmPassword) {
      alert("Password does not match");
      return;
    }

    const userDetails = await AsyncStorage.getItem("userDetails");
    if (!userDetails) {
      return;
    }
    const user = JSON.parse(userDetails);

    try {
      const response = await fetch(`${BASE_URL}user/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailOrPhone: user.email,
          newPassword: newPassword,
        }),
      });

      if (!response.ok) {
        console.error("Error:", response);
      }
      setShowOTPOtpOverlay(true);

      Toast.show({ text1: "Password reset succesful" });
    } catch (error) {
      console.error("Error:", error);
      Toast.show({ text1: "Password reset failed" });
    }
  }

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
          />
        </View>
      )}
      <View style={{ backgroundColor: "white", flex: 1, padding: 16 }}>
        <View>
          <Text style={styles.text}>Current Password</Text>
          <View style={styles.input}>
            <TextInput
              style={{
                width: "100%",
                fontSize: 16,
              }}
              placeholder="Enter Password"
              textContentType="password"
              secureTextEntry={currentPassHidden}
              placeholderTextColor="rgba(0,0,0,0.5)"
              value={currentPassword}
              onChangeText={setCurrentPassword}
            />

            <Eye
              condition={currentPassHidden}
              func={() => setCurrentPassHidden(!currentPassHidden)}
            />
          </View>
        </View>
        <View>
          <Text style={styles.text}>New Password</Text>
          <View style={styles.input}>
            <TextInput
              style={{
                width: "100%",
                fontSize: 16,
              }}
              placeholder="Enter new password"
              textContentType="newPassword"
              placeholderTextColor="rgba(0,0,0,0.5)"
              secureTextEntry={newPassHidden}
              value={newPassword}
              onChangeText={setNewPassword}
            />

            <Eye
              condition={newPassHidden}
              func={() => setNewPassHidden(!newPassHidden)}
            />
          </View>
        </View>
        <View>
          <Text style={styles.text}>Confirm Password</Text>
          <View style={styles.input}>
            <TextInput
              style={{
                width: "100%",
                fontSize: 16,
              }}
              textContentType="newPassword"
              placeholder="Enter confirmation "
              placeholderTextColor="rgba(0,0,0,0.5)"
              secureTextEntry={confirmPassHidden}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />

            <Eye
              condition={confirmPassHidden}
              func={() => setConfirmPassHidden(!confirmPassHidden)}
            />
          </View>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: "black",
            padding: 16,
            alignItems: "center",
            marginTop: 48,
          }}
          onPress={() => updatePassword()}
        >
          <Text style={{ color: "white", fontSize: 16 }}>UPDATE NOW</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: "grey",
    borderWidth: 1,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: { marginVertical: 16, fontSize: 16 },
});

export default changePassword;

function Eye({ condition, func }: { condition: boolean; func: () => void }) {
  return (
    <Pressable
      style={{
        marginRight: 20,
        right: 25,
      }}
      onPress={func}
    >
      <Image
        source={
          condition
            ? require("../../../../assets/images/password/eye_close.png")
            : require("../../../../assets/images/password/eye_open.png")
        }
      />
    </Pressable>
  );
}
