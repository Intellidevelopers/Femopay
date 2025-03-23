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

const Signup = ({ navigation }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

  // Handle button press
  const handleSignupPress = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false); // Simulate API call completion
    navigation.navigate("EmailVerify");

    }, 2000);
    // Navigate to the next screen with the entered phone number and password
  };

  return (
    <ScrollView style={styles.container}>
      {/* Logo */}
      <Image source={require("../assets/icons/logo.png")} style={styles.logo} />

      {/* Title */}
      <Text style={styles.title}>Create New Account</Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        Please enter your registered phone number and a secured password that includes the following criteria to proceed
      </Text>

      {/* Phone Number Input */}
      <Text style={styles.label}>Phone Number</Text>
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
          onFocus={() => setFocusedInput("phone")}
          onBlur={() => setFocusedInput(null)}
        />
      </View>

      {/* Username Input */}
      <Text style={styles.label}>UserName</Text>
      <View
        style={[
          styles.inputContainer,
          focusedInput === "username" && styles.focusedInput,
        ]}
      >
        <TextInput
          style={styles.input}
          placeholder="@femopay123"
          onFocus={() => setFocusedInput("username")}
          onBlur={() => setFocusedInput(null)}
        />
      </View>
      <Text style={styles.helperText}>
        * Username can contain only letters and underscores, minimum of two letters
      </Text>

      {/* Email Input */}
      <Text style={styles.label}>Email</Text>
      <View
        style={[
          styles.inputContainer,
          focusedInput === "email" && styles.focusedInput,
        ]}
      >
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          placeholder="sample@gmail.com"
          onFocus={() => setFocusedInput("email")}
          onBlur={() => setFocusedInput(null)}
        />
      </View>

      {/* Password Input */}
      <Text style={styles.label}>Password</Text>
      <View
        style={[
          styles.inputContainer,
          styles.passwordContainer,
          focusedInput === "password" && styles.focusedInput,
        ]}
      >
        <TextInput
          style={[styles.input, { flex: 1 }]}
          secureTextEntry={!passwordVisible}
          placeholder="************"
          onFocus={() => setFocusedInput("password")}
          onBlur={() => setFocusedInput(null)}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Ionicons name={passwordVisible ? "eye-off" : "eye"} size={20} color="gray" />
        </TouchableOpacity>
      </View>
      <Text style={styles.helperText}>
        * Your password must be 8 or more characters long & contain a mix of upper & lower case letters, numbers & symbols.
      </Text>

      {/* Submit Button */}
      <TouchableOpacity style={styles.button} onPress={handleSignupPress} disabled={isLoading}>
        {isLoading ? (
          <Image
            source={require("../assets/icons/loader.gif")}
            style={styles.loader}
            contentFit="contain"
          />
        ) : (
          <Text style={styles.buttonText}>Sign Up</Text>
        )}
      </TouchableOpacity>

      {/* Bottom Link */}
      <View style={styles.linkContainer}>
      <Text style={styles.bottomText}>
        Already have an account? 
      </Text>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>Log in</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="dark" backgroundColor="#fff" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 16,
  },
  logo: {
    alignSelf: "center",
    width: 150,
    height: 50,
    resizeMode: "contain",
    marginTop: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
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
    height: 50,
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
    marginTop: 60,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 1,
    justifyContent: "center",
    gap: 5
  }
});

export default Signup;
