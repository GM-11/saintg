import textStyles from "@/styles/textStyles";
import React, { useEffect, useState } from "react";
import { Image, View, Text, StyleSheet, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { IUser } from "@/constants/types";

function manageAccount() {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    async function getUserDetails() {
      const res = await AsyncStorage.getItem("userDetails");
      if (res) {
        const userDetails = JSON.parse(res) as IUser;

        if (userDetails) {
          setName((prev) => (userDetails.name ? userDetails.name : prev));
          setGender((prev) => (userDetails.gender ? userDetails.gender : prev));
          // setDate((prev) => (userDetails.date ? userDetails.date : prev));
          setNumber((prev) =>
            userDetails.phoneNumber ? userDetails.phoneNumber : prev,
          );
          setEmail((prev) => (userDetails.email ? userDetails.email : prev));
        }
      }
    }
    getUserDetails();
  }, []);

  async function logOut() {
    // console.log("deleting account");
    await AsyncStorage.clear();
    router.replace("/auth");
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      {/* <Image
        style={{ height: 96, width: 96, borderRadius: 100, margin: 16 }}
        source={{
          uri: "https://static.dc.com/dc/files/default_images/Char_Profile_Batman_20190116_5c3fc4b40faec2.47318964.jpg",
        }}
      />
      <Text>Upload Image</Text> */}

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          margin: 24,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            width: "40%",
            marginLeft: 24,
          }}
        >
          <Text style={{ ...styles.text, color: "grey" }}>Name</Text>
          <Text style={{ ...styles.text, color: "grey" }}>Gender</Text>
          {/* <Text style={{ ...styles.text, color: "grey" }}>Date of Birth</Text> */}
          <Text style={{ ...styles.text, color: "grey" }}>Mobile Number</Text>
          <Text style={{ ...styles.text, color: "grey" }}>Email</Text>
        </View>
        <View
          style={{ display: "flex", flexDirection: "column", width: "50%" }}
        >
          <Text style={{ ...styles.text, color: "black" }}>{name}</Text>
          <Text style={{ ...styles.text, color: "black" }}>{gender}</Text>
          {/* <Text style={{ ...styles.text, color: "black" }}>{date}</Text> */}
          <Text style={{ ...styles.text, color: "black" }}>{number}</Text>
          <Text style={{ ...styles.text, color: "black" }}>{email}</Text>
        </View>
      </View>

      <Pressable
        onPress={logOut}
        style={{
          paddingVertical: 24,
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderTopColor: "grey",
          borderBottomColor: "grey",
          width: "90%",
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Text style={{ ...textStyles.font, color: "grey", fontSize: 16 }}>
          Log out
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    ...textStyles.font,
    fontSize: 16,
    marginVertical: 24,
  },
});

export default manageAccount;
