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

const ChangePassword = ({ navigation }) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [newPasswordVisible, setNewPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [focusedInput, setFocusedInput] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    

    
      
    const handleSignupPress = () => {
        if (!newPassword || !confirmPassword) {
          alert("Please fill in both fields.");
          return;
        }
      
        if (newPassword !== confirmPassword) {
          alert("Passwords do not match!");
          return;
        }
      
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          navigation.navigate("Success", {
            title: "Password Reset Successfully",
            subtitle: "You can now continue with your secured login.",
            buttonText: "Go to Login",
            onContinue: () => navigation.replace("Login"), // or any screen you want
          });
        }, 2000);
      };
      

  return (
    <ScrollView style={styles.container}>
      {/* Logo */}
      <Image source={require("../assets/icons/logo.png")} style={styles.logo} />

      {/* Title */}
      <Text style={styles.title}>Create New Password</Text>

      {/* Password Input */}
      <Text style={styles.label}>New Password</Text>
        <View
        style={[
            styles.inputContainer,
            styles.passwordContainer,
            focusedInput === "newPassword" && styles.focusedInput,
        ]}
        >
        <TextInput
            style={[styles.input, { flex: 1 }]}
            secureTextEntry={!newPasswordVisible}
            placeholder="***********"
            value={newPassword}
            onChangeText={setNewPassword}
            onFocus={() => setFocusedInput("newPassword")}
            onBlur={() => setFocusedInput(null)}
        />
        <TouchableOpacity onPress={() => setNewPasswordVisible(!newPasswordVisible)}>
            <Ionicons name={newPasswordVisible ? "eye-off" : "eye"} size={20} color="gray" />
        </TouchableOpacity>
        </View>


        <Text style={styles.label}>Confirm Password</Text>
        <View
        style={[
            styles.inputContainer,
            styles.passwordContainer,
            focusedInput === "confirmPassword" && styles.focusedInput,
        ]}
        >
        <TextInput
            style={[styles.input, { flex: 1 }]}
            secureTextEntry={!confirmPasswordVisible}
            placeholder="***********"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            onFocus={() => setFocusedInput("confirmPassword")}
            onBlur={() => setFocusedInput(null)}
        />
        <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
            <Ionicons name={confirmPasswordVisible ? "eye-off" : "eye"} size={20} color="gray" />
        </TouchableOpacity>
        </View>

      


      {/* Submit Button */}
      <TouchableOpacity style={styles.button} onPress={handleSignupPress} disabled={isLoading}>
        {isLoading ? (
          <Image
            source={require("../assets/icons/loader.gif")}
            style={styles.loader}
            contentFit="contain"
          />
        ) : (
          <Text style={styles.buttonText}>Save Password</Text>
        )}
      </TouchableOpacity>

      {/* Bottom Link */}
      <View style={styles.linkContainer}>
      <Text style={styles.bottomText}>Want to login? </Text>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>Login</Text>
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

export default ChangePassword;
