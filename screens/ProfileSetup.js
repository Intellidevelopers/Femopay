import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import FONTS from '../constants/fonts';
import COLORS from '../constants/colors';
import Header from '../components/Header';

const ProfileSetup = ({ navigation }) => {
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [femoTag, setFemoTag] = useState('@'); // Ensure @ is always prefixed

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
  const handleFemoTagChange = (text: string) => {
    if (!text.startsWith('@')) {
      setFemoTag('@' + text.replace(/^@/, '')); // Ensure it always starts with @
    } else {
      setFemoTag(text);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header title="Profile Setup" onPress={() => navigation.goBack()} />

      <View style={styles.content}>
        <Text style={styles.title}>Complete Profile</Text>
        <Text style={styles.subtitle}>
          Please enter your personal details to complete your profile.
        </Text>

        <View style={styles.flexRow}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.input}
              placeholder="John"
              placeholderTextColor="#BEBEBE"
              keyboardType="default"
              maxLength={15}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Doe"
              placeholderTextColor="#BEBEBE"
              keyboardType="default"
              maxLength={15}
            />
          </View>
        </View>

        <View style={styles.inputContainer2}>
          <View style={{flex: 1}}>
            <Text style={styles.label}>FemoTag</Text>
            <TextInput
              style={styles.input2}
              value={femoTag}
              onChangeText={handleFemoTagChange}
              placeholder="@femopay24"
              placeholderTextColor="#BEBEBE"
              keyboardType="default"
            />
          </View>
          <AntDesign name="exclamationcircle" size={20} color={'#888'} />
        </View>
      </View>


        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ProfileSetup')}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
    </ScrollView>
  );
};


export default ProfileSetup;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
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
    fontSize: 15,
    color: '#666',
    marginBottom: 20,
    fontFamily: FONTS.regular
  },
  boldText: {
    color: '#000',
    fontFamily: FONTS.bold
  },
  input: {
    fontSize: 22,
    color: '#666',
    fontWeight: '600',
  },
  input2: {
    fontSize: 20,
    color: '#666',
    fontWeight: '600',
    width: '100%'
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
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 25,
    marginTop: 100
  },
  disabledButton: {
    backgroundColor: '#F08080',
  },
  buttonText: {
    fontSize: 16,
    color: '#FFF',
  },
  backButton:{
    position: 'absolute',
    left: 15,
    top: 50,
    zIndex: 999,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    alignItems: 'center',
    justifyContent: 'center'
  },
  content:{
    flex: 1,
  },
  bottomContainer:{
    marginBottom: 20,
    marginTop: 'auto'
  },
  inputContainer:{
    backgroundColor: '#eee',
    width: '48%',
    paddingHorizontal: 10,
    borderRadius: 15,
    padding: 8
  },
  inputContainer2:{
    backgroundColor: '#eee',
    padding: 8,
    width: '100%',
    paddingHorizontal: 10,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
  },
  label:{
    fontSize: 14,
    color: '#aaa',
    paddingHorizontal: 5,
  },
  flexRow:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    alignItems: 'center'
  }
});
