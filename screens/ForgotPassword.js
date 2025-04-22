import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import COLORS from "../constants/colors";
import { Image } from "expo-image";
import FONTS from "../constants/fonts";

const ForgotPasssword = ({ navigation }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [loginMethod, setLoginMethod] = useState('phone'); // 'phone' or 'email'
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');


  // Handle button press
  const handleSignupPress = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false); // Simulate API call completion
    navigation.navigate("ConfirmationCode");

    }, 2000);
    // Navigate to the next screen with the entered phone number and password
  };

  return (
    <ScrollView style={styles.container}>
      {/* Logo */}
      <Image source={require("../assets/icons/logo.png")} style={styles.logo} />

      {/* Title */}
      <Text style={styles.title}>Forgot Password</Text>

      {/* Phone Number Input */}
      <Text style={styles.label}>{loginMethod === 'phone' ? "Phone Number" : "Email"}</Text>
        {loginMethod === 'phone' ? (
        <View
            style={[
            styles.inputContainer,
            focusedInput === "phone" && styles.focusedInput,
            ]}
        >
            <Text style={styles.countryCode}>(+234)</Text>
            <TextInput
            style={[styles.input, { flex: 1 }]}
            keyboardType="numeric"
            placeholder="9012345678"
            value={phone}
            onChangeText={setPhone}
            onFocus={() => setFocusedInput("phone")}
            onBlur={() => setFocusedInput(null)}
            />
        </View>
        ) : (
        <View
            style={[
            styles.inputContainer,
            focusedInput === "email" && styles.focusedInput,
            ]}
        >
            <TextInput
            style={[styles.input, { flex: 1 }]}
            keyboardType="email-address"
            placeholder="example@email.com"
            value={email}
            onChangeText={setEmail}
            onFocus={() => setFocusedInput("email")}
            onBlur={() => setFocusedInput(null)}
            autoCapitalize="none"
            />
        </View>
        )}

      <TouchableOpacity onPress={() => setLoginMethod(prev => prev === 'phone' ? 'email' : 'phone')}>
        <Text style={styles.emailLoginText}>
          {loginMethod === 'phone' ? "Reset with email" : "Reset with phone number"}
        </Text>
      </TouchableOpacity>


      {/* Submit Button */}
      <TouchableOpacity style={styles.button} onPress={handleSignupPress} disabled={isLoading}>
        {isLoading ? (
          <Image
            source={require("../assets/icons/loader.gif")}
            style={styles.loader}
            contentFit="contain"
          />
        ) : (
          <Text style={styles.buttonText}>Reset Password</Text>
        )}
      </TouchableOpacity>
      <StatusBar style="dark" backgroundColor="#fff" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
  logo: {
    alignSelf: "center",
    width: 150,
    height: 50,
    resizeMode: "contain",
    marginTop: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  subtitle: {
    textAlign: "center",
    color: "gray",
    fontSize: 14,
    marginTop: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 50,
    marginTop: 5,
    borderWidth: 1,
    borderColor: "transparent",
  },
  focusedInput: {
    borderColor: COLORS.primary, // Change to your theme color
  },
  countryCode: {
    fontSize: 16,
    marginRight: 10,
    color: "black",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "black",
  },
  helperText: {
    fontSize: 12,
    color: "gray",
    marginTop: 5,
  },
  button: {
    backgroundColor: COLORS.primary,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginTop: 30,
    elevation: 5,
    shadowColor: COLORS.black,
    shadowOffset: 0,
    shadowRadius: 10,
    shadowOpacity: 0.2,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  loader: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  bottomText: {
    fontSize: 14,
    fontWeight: "500",
  },
  loginText: {
    color: "red",
    fontWeight: "500",
    fontSize: 15,
  },
  linkContainer:{
    marginTop: 20,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 1,
    justifyContent: "center",
    gap: 5
  },
  emailLoginText:{
    fontFamily: FONTS.semiBold,
    marginTop: 16
  },
  forgotPassword:{
    textAlign: "center",
    fontFamily: FONTS.semiBold,
  }
});

export default ForgotPasssword;
