import React, { useState } from "react";
import textStyles from "@/styles/textStyles";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { BASE_URL } from "@/constants/constant";
import { IUser } from "@/constants/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const AddressForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [saveAddressAs, setSaveAddressAs] = useState("");
  const [isDefaultAddress, setIsDefaultAddress] = useState(false);

  async function handleAddAddress() {
    const userDetails = await AsyncStorage.getItem("userDetails");
    if (!userDetails) return;

    const user = JSON.parse(userDetails) as IUser;

    const body = {
      firstName,
      lastName,
      addressLine1: address + addressLine2,
      city,
      state,
      zipCode,
      country,
      phoneNumber,
      tag: saveAddressAs,
    };

    // console.log(body);

    const addressText = `${address}${addressLine2 ? ", " + addressLine2 : ""}, ${city}, ${state}, ${zipCode}, ${country}`;

    // console.log(addressText);

    try {
      const result = await fetch(`${BASE_URL}address`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": user.token,
        },
        body: JSON.stringify(body),
      });
      const data = await result.json();
      // console.log(data);

      user.address = `${addressText}//ID=${data.data.id}`;
      await AsyncStorage.setItem("userDetails", JSON.stringify(user));
      // console.log(user.address);
    } catch (error) {
      console.error("Error adding address:", error);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Address Line 2 (optional)"
        value={addressLine2}
        onChangeText={setAddressLine2}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        value={city}
        onChangeText={setCity}
      />
      <TextInput
        style={styles.input}
        placeholder="State"
        value={state}
        onChangeText={setState}
      />
      <TextInput
        style={styles.input}
        placeholder="Zip Code"
        value={zipCode}
        onChangeText={setZipCode}
      />

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={country}
          onValueChange={(itemValue) => setCountry(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Country" value="" />

          {[
            "India",
            "USA",
            "UK",
            "France",
            "Germany",
            "Spain",
            "Italy",
            "Japan",
            "Australia",
            "Canada",
          ].map((item, index) => (
            <Picker.Item label={item} value={item} key={index} />
          ))}
        </Picker>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Phone number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />

      <Text
        style={{
          fontSize: 16,
          fontWeight: 600,
          marginBottom: 8,
          letterSpacing: 2,
        }}
      >
        SAVE ADDRESS AS
      </Text>
      <View style={styles.addressTypeContainer}>
        <TouchableOpacity
          style={[
            styles.addressTypeButton,
            saveAddressAs === "HOME" && styles.selectedAddressType,
          ]}
          onPress={() => setSaveAddressAs("HOME")}
        >
          <Text style={saveAddressAs === "HOME" && styles.addressTypeText}>
            HOME
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.addressTypeButton,
            saveAddressAs === "OFFICE" && styles.selectedAddressType,
          ]}
          onPress={() => setSaveAddressAs("OFFICE")}
        >
          <Text style={saveAddressAs === "OFFICE" && styles.addressTypeText}>
            OFFICE
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.addressTypeButton,
            saveAddressAs === "OTHER" && styles.selectedAddressType,
          ]}
          onPress={() => setSaveAddressAs("OTHER")}
        >
          <Text style={saveAddressAs === "OTHER" && styles.addressTypeText}>
            OTHER
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => setIsDefaultAddress(!isDefaultAddress)}
        >
          {isDefaultAddress && <View style={styles.checkboxInner} />}
        </TouchableOpacity>
        <Text style={styles.checkboxLabel}>MAKE THIS A DEFAULT ADDRESS</Text>
      </View>

      <Pressable
        style={{
          backgroundColor: "black",
          paddingVertical: 12,
          alignItems: "center",
        }}
        onPress={handleAddAddress}
      >
        <Text
          style={{
            color: "white",
            fontSize: 16,
            fontWeight: 600,
          }}
        >
          ADD ADDRESS
        </Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    ...textStyles.font,
  },
  header: {
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  pickerContainer: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 16,
    backgroundColor: "white",
  },
  picker: {
    height: 40,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    backgroundColor: "white",
  },

  label: {
    fontSize: 14,
    fontWeight: 400,
    marginBottom: 8,
    letterSpacing: 2,
  },
  addressTypeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  addressTypeButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  selectedAddressType: {
    backgroundColor: "#000",
  },
  addressTypeText: {
    color: "white",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#000",
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxInner: {
    width: 12,
    height: 12,
    backgroundColor: "#000",
  },
  checkboxLabel: {
    fontSize: 14,
  },
  addButton: {
    backgroundColor: "#000",
    paddingVertical: 12,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: 600,
  },
});

export default AddressForm;
