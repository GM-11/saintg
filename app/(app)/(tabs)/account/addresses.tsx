import React, { useState } from "react";
import textStyles from "@/styles/textStyles";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { BASE_URL } from "@/constants/constant";
import { IUser } from "@/constants/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  // async handleAddAddress() {
  //     const res = await fetch(``)
  //   };

  async function handleAddAddress() {
    const userDetails = await AsyncStorage.getItem("userDetails");
    if (!userDetails) return;

    const user = JSON.parse(userDetails) as IUser;

    const res = await fetch(`${BASE_URL}/address`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": user.token,
      },
    });

    const data = await res.json();
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

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <View style={{ ...styles.pickerContainer, width: "48%" }}>
          <Picker
            selectedValue={state}
            onValueChange={(itemValue) => setState(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="State" value="" />
            {/* Add state options here */}
          </Picker>
        </View>
        <View style={{ ...styles.pickerContainer, width: "48%" }}>
          <Picker
            selectedValue={zipCode}
            onValueChange={(itemValue) => setZipCode(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Zip Code" value="" />
            {/* Add zip code options here */}
          </Picker>
        </View>
      </View>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={country}
          onValueChange={(itemValue) => setCountry(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Country" value="" />
          {/* Add country options here */}
        </Picker>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Phone number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>SAVE ADDRESS AS</Text>
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

      <TouchableOpacity style={styles.addButton} onPress={handleAddAddress}>
        <Text style={styles.addButtonText}>ADD ADDRESS</Text>
      </TouchableOpacity>
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
    fontWeight: "bold",
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
    fontWeight: "bold",
  },
});

export default AddressForm;
