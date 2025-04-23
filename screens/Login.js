import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import COLORS from "../constants/colors";
import { Image } from "expo-image";
import FONTS from "../constants/fonts";
import * as LocalAuthentication from 'expo-local-authentication';
import useSignupStore from '../store/useSignupStore';
import Toast from 'react-native-toast-message';



const Login = ({ navigation }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [loginMethod, setLoginMethod] = useState('phone'); // 'phone' or 'email'
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useSignupStore();

const handleLogin = async () => {
  setIsLoading(true);

  const credentials = loginMethod === 'email'
  ? { email, password }
  : { phone: `0${phone}`, password }; // Remove the +234 and use 080... format if backend expects that


  const result = await login(credentials);
  setIsLoading(false);

  console.log('Login payload:', credentials);
console.log('Login result:', result);


  if (result.success) {
    navigation.replace("BottomTab");
  } else {
    Toast.show({
      type: 'error',
      text1: 'Login Failed',
      text2: result.message || 'Something went wrong. Please try again.',
    });
    
  }
};


  // Handle button press
  const handleSignupPress = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false); // Simulate API call completion
    navigation.navigate("BottomTab");

    }, 2000);
    // Navigate to the next screen with the entered phone number and password
  };

  const handleBiometricAuth = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    if (!compatible) {
      Toast.show({
        type: 'error',
        text1: 'Unsupported',
        text2: 'Biometric authentication not supported on this device.',
      });
      
      return;
    }
  
    const enrolled = await LocalAuthentication.isEnrolledAsync();
    if (!enrolled) {
      Toast.show({
        type: 'error',
        text1: 'Not Enrolled',
        text2: 'No biometrics enrolled. Please set up Face ID or Touch ID.',
      });
      
      return;
    }
  
    const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
    const isFaceID = types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION);
  
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: isFaceID ? "Use Face ID to login" : "Use Fingerprint to login",
      fallbackLabel: "Use Passcode",
    });
    if (result.success) {
      navigation.navigate("BottomTab");
    } else {
      Toast.show({
        type: 'error',
        text1: 'Authentication Failed',
        text2: 'Biometric authentication failed. Try again.',
      });
      
    }
  };
  
  

  return (
    <ScrollView style={styles.container}>
      {/* Logo */}
      <Image source={require("../assets/icons/logo.png")} style={styles.logo} />

      {/* Title */}
      <Text style={styles.title}>Log In Account</Text>

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
          placeholder="***********"
          onFocus={() => setFocusedInput("password")}
          onBlur={() => setFocusedInput(null)}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Ionicons name={passwordVisible ? "eye-off" : "eye"} size={20} color="gray" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => setLoginMethod(prev => prev === 'phone' ? 'email' : 'phone')}>
        <Text style={styles.emailLoginText}>
          {loginMethod === 'phone' ? "Log in with email" : "Log in with phone number"}
        </Text>
      </TouchableOpacity>


      {/* Submit Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={isLoading}>
        {isLoading ? (
          <Image
            source={require("../assets/icons/loader.gif")}
            style={styles.loader}
            contentFit="contain"
          />
        ) : (
          <Text style={styles.buttonText}>Log In</Text>
        )}
      </TouchableOpacity>
      {/* Bottom Link */}
      <View style={styles.biometricContainer}>
        <TouchableOpacity style={styles.biometricButton}>
          <Ionicons name="finger-print" size={24} color="white" />
          <Text style={styles.biometricText}>Use Biometric</Text>
        </TouchableOpacity>
        {/* Face  ID */}
        <TouchableOpacity style={styles.biometricButton}>
          <MaterialCommunityIcons name="face-recognition" size={24} color="white" />
          <Text style={styles.biometricText}>Use Face ID</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.linkContainer}>
      <Text style={styles.bottomText}>New to FemoPay? </Text>

        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.loginText}>Create New Account</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={{alignItems: 'center', alignSelf: 'center', justifyContent: 'center', marginTop: 20}} onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
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
    marginTop: 50,
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
  },
  biometricContainer:{
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
  },
  biometricButton:{
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 8,
    width: '48%',
    gap: 10
  },
  biometricText:{
    color: '#fff',
    fontWeight: 'bold'
  }
});

export default Login;
