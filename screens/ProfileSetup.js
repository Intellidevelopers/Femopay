import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import FONTS from '../constants/fonts';
import COLORS from '../constants/colors';
import Header from '../components/Header';
import { Modalize } from 'react-native-modalize';
import useSignupStore from '../store/useSignupStore'; // if not already imported
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';



const ProfileSetup = ({ navigation }) => {
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [femoTag, setFemoTag] = useState('@'); // Ensure @ is always prefixed
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const { email } = useSignupStore(); // assuming email was stored after signup
  const { user } = useSignupStore(); // user should have 'id'

  // useFocusEffect(
  //   useCallback(() => {
  //     AsyncStorage.setItem('lastVisitedScreen', 'ProfileSetup'); // change accordingly
  //   }, [])
  // );

  useEffect(() => {
    const fetchUserId = async () => {
      if (!user?.id) {
        const storedId = await AsyncStorage.getItem("userId");
        if (storedId) {
          console.log("Recovered userId from AsyncStorage:", storedId);
          // Use this storedId for your profile setup
        } else {
          alert("Missing user ID. Please login again.");
          navigation.navigate("Login"); // or other fallback
        }
      }
    };
    fetchUserId();
  }, []);
  

    const modalizeRef = useRef(null); // Reference to control the bottom sheet
  
    // Function to open the bottom sheet
    const openCurrencyExchangeModal = () => {
      modalizeRef.current?.open();
    };

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else {
      setIsResendDisabled(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);

  // Handle FemoTag input
  const handleFemoTagChange = (text) => {
    if (!text.startsWith('@')) {
      setFemoTag('@' + text.replace(/^@/, '')); // Ensure it always starts with @
    } else {
      setFemoTag(text);
    }
  };

  const handleProfileSubmit = async () => {
    try {
      let userId = user?.id;
  
      if (!userId) {
        userId = await AsyncStorage.getItem("userId");
      }
  
      if (!userId) {
        Toast.show({
          type: 'error',
          text1: 'Missing ID',
          text2: 'Missing user ID. Please login again.',
        });
        navigation.navigate("Login");
        return;
      }
  
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(`https://femopay-startup.onrender.com/api/v1/auth/onboard/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({
          firstName,
          lastName,
          tagName: femoTag.replace('@', ''),
        }),
      });
  
      const res = await response.json();
  
      if (response.ok) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: res.message || "Profile setup complete",
        });
        navigation.navigate("SetTransactionPin");
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: res.message || "Profile setup failed",
        });
      }
    } catch (error) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: "Something went wrong. Try again.",
      });
    }
  };
  
  
  
  

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View
      style={styles.container}
    >
      <Header title="Profile Setup" onPress={() => navigation.goBack()} />

      <View style={styles.content}>
        {/* Your form content remains here */}
        <Text style={styles.title}>Complete Profile</Text>
        <Text style={styles.subtitle}>
          Please enter your personal details to complete your profile.
        </Text>

        <View style={styles.flexRow}>
          <TextInput
            style={styles.input}
            placeholder="John"
            placeholderTextColor="#BEBEBE"
            keyboardType="default"
            maxLength={15}
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={styles.input}
            placeholder="Doe"
            placeholderTextColor="#BEBEBE"
            keyboardType="default"
            maxLength={15}
            value={lastName}
            onChangeText={setLastName}
          />
        </View>

        <Text style={styles.label}>FemoTag</Text>
        <View style={styles.inputContainer2}>
          <View style={{ flex: 1 }}>
            <TextInput
              style={styles.input2}
              value={femoTag}
              onChangeText={handleFemoTagChange}
              placeholder="@femopay24"
              placeholderTextColor="#BEBEBE"
              keyboardType="default"
            />
          </View>
          <TouchableOpacity onPress={openCurrencyExchangeModal}>
            <AntDesign name="exclamationcircle" size={20} color={'#888'} />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleProfileSubmit}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
      <Modalize
            ref={modalizeRef}
            snapPoint={220} // Set the height of the bottom sheet
            modalHeight={220} // Set the maximum height
            withHandle={false} // Optionally disable the handle for more compact design
          >
            <View style={styles.bottomSheetContent}>
              <Text style={styles.bottomSheetTitle}>What is FemoTag?</Text>
              <Text style={styles.subText}>
                FemoTag is a unique identifier that allows you to send and receive money instantly within the FemoPay network. It is your personalized tag that makes transactions easier and faster.
              </Text>
            </View>
          </Modalize>
    </View>
          
    </TouchableWithoutFeedback>

  );
};


export default ProfileSetup;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  progressDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#D3D3D3',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#000',
  },
  title: {
    fontSize: 18,
    textAlign: 'left',
    marginBottom: 5,
    fontWeight: '600'
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    fontFamily: FONTS.regular
  },
  boldText: {
    color: '#000',
    fontFamily: FONTS.bold
  },
  input: {
    fontSize: 20,
    color: '#000',
    fontWeight: '600',
    backgroundColor: '#eee',
    borderRadius: 10,
    padding: 18,
    width: '48%',
  },
  input2: {
    fontSize: 20,
    color: '#000',
    fontWeight: '600',
    width: '100%',
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  resendText: {
    fontSize: 14,
    color: '#777',
    marginRight: 5,
  },
  resendButton: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  disabledResend: {
    color: '#999',
    backgroundColor: '#eee',
    padding: 5,
    borderRadius: 5,
    paddingHorizontal: 10
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 25,
    marginTop: 'auto'
  },
  disabledButton: {
    backgroundColor: '#F08080',
  },
  buttonText: {
    fontSize: 16,
    color: '#FFF',
  },
  content:{
    marginBottom: 30
  },
  bottomContainer:{
    marginBottom: 20,
    marginTop: 'auto'
  },
  inputContainer:{
    backgroundColor: '#eee',
    width: '48%',
    borderRadius: 10,
    height: 60,
  },
  inputContainer2:{
    backgroundColor: '#eee',
    width: '100%',
    paddingHorizontal: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    height: 65,
  },
  label:{
    fontSize: 14,
    color: '#aaa',
    marginBottom: 5,
  },
  flexRow:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    alignItems: 'center'
  },
  bottomSheetContent:{
    padding: 20,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  bottomSheetTitle:{
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subText:{
    fontSize: 14,
    color: "#999",
    marginTop: 5,
    lineHeight: 20
  },
});
