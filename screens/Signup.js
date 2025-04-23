import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import COLORS from "../constants/colors";
import { Image } from "expo-image";
import useSignupStore from "../store/useSignupStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from 'react-native-toast-message';


const Signup = ({ navigation }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [showEmailExistsModal, setShowEmailExistsModal] = useState(false);


  const {
    phoneNumber,
    username,
    email,
    password,
    setPhoneNumber,
    setUsername,
    setEmail,
    setPassword,
    setUserData,
  } = useSignupStore();
  
  
  const handleSignupPress = async () => {
    setIsLoading(true);
  
    try {
      const response = await fetch("https://femopay-startup.onrender.com/api/v1/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: username,
          email,
          password,
          phone: phoneNumber,
          role: "user",
        }),
      });
  
      const res = await response.json();
  
      if (response.ok) {
        const user = res.data;
        const userId = user._id;
      
        if (user && userId) {
          setUserData(user);
          await AsyncStorage.setItem("userId", userId);
          Toast.show({
            type: 'success',
            text1: 'Account created!',
            text2: 'Redirecting to verification...',
          });
          navigation.navigate("EmailVerify");
        } else {
          Toast.show({
            type: 'info',
            text1: 'Signup successful',
            text2: 'No user ID returned, please try again.',
          });
        }
      } else {
        const errorMessage = res.message || "Signup failed.";
        if (errorMessage.includes("user with this email already exist but not verified")) {
          setShowEmailExistsModal(true);
        } else {
          Toast.show({
            type: 'error',
            text1: 'Signup Failed',
            text2: errorMessage,
          });
        }
      }
      
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };
  
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
          value={phoneNumber}
          onChangeText={setPhoneNumber}
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
          value={username}
          onChangeText={setUsername}
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
          value={email}
          onChangeText={setEmail}
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
          value={password}
          onChangeText={setPassword}
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
      <Modal
        transparent={true}
        animationType="fade"
        visible={showEmailExistsModal}
        onRequestClose={() => setShowEmailExistsModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Email Not Verified</Text>
            <Text style={styles.modalText}>
              A user with this email already exists but hasn't verified their email. Please proceed to verify.
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setShowEmailExistsModal(false);
                navigation.navigate("EmailVerify");
              }}
            >
              <Text style={styles.modalButtonText}>Proceed to Verify</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
    fontSize: 16,
  },
  linkContainer:{
    marginTop: 'auto',
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 1,
    justifyContent: "center",
    gap: 5
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  modalButton: {
    backgroundColor: COLORS.primary, // use your app’s primary color
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }
  
});

export default Signup;
