import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  SignIn: undefined;
  CreateAccount: undefined;
  Home: undefined;
};

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

const SignInScreen: React.FC<SignInScreenProps> = ({ navigation }) => {
  const [mobileNumber, setMobileNumber] = useState<string>('');

  const handleSendOTP = () => {
    // Add OTP sending functionality here
    console.log('OTP sent to', mobileNumber);
  };

  const handleCreateAccount = () => {
    // Navigate to the create account screen
    navigation.navigate('CreateAccount');
  };

  const handleSkip = () => {
    // Handle skip functionality
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saint G</Text>
      <Text style={styles.subtitle}>SIGN IN WITH MOBILE NUMBER</Text>

      <Text style={styles.label}>MOBILE NUMBER</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.countryCode}>+91</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your mobile number"
          keyboardType="phone-pad"
          value={mobileNumber}
          onChangeText={setMobileNumber}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSendOTP}>
        <Text style={styles.buttonText}>SEND OTP</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleCreateAccount}>
        <Text style={styles.linkText}>CREATE A NEW ACCOUNT</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.skipContainer} onPress={handleSkip}>
        <Text style={styles.skipText}>SKIP</Text>
        <Text style={styles.arrow}>→</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'serif', // Use a serif font for similar style
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 14,
    letterSpacing: 2,
    color: '#000',
    marginBottom: 40,
  },
  label: {
    alignSelf: 'flex-start',
    marginBottom: 5,
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: '100%',
  },
  countryCode: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    padding: 10,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  linkText: {
    color: '#000',
    textDecorationLine: 'underline',
    marginBottom: 20,
  },
  skipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
  },
  skipText: {
    color: '#000',
    marginRight: 5,
  },
  arrow: {
    color: '#000',
    fontSize: 18,
  },
});

export default SignInScreen;
