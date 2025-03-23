import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import FONTS from '../constants/fonts';
import COLORS from '../constants/colors';

const EmailVerify = () => {
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

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

  return (
    <View style={styles.container}>
    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <AntDesign name='left' size={20}/>
    </TouchableOpacity>
    
      {/* Title and Subtitle */}
      <ScrollView style={styles.content}>
      <Text style={styles.title}>Confirm your email</Text>
      <Text style={styles.subtitle}>
        Please enter the code sent to this email <Text style={styles.boldText}>sample@gmail.com</Text>
      </Text>

      {/* OTP Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        placeholderTextColor="#BEBEBE"
        keyboardType="numeric"
        value={otp}
        onChangeText={setOtp}
        maxLength={6}
      />

      {/* Resend OTP Section */}
      </ScrollView>
      <View style={styles.bottomContainer}>
        <View style={styles.resendContainer}>
            <Text style={styles.resendText}>Didn’t receive a code?</Text>
            <TouchableOpacity disabled={isResendDisabled} onPress={() => { setTimer(60); setIsResendDisabled(true); }}>
            <Text style={[styles.resendButton, isResendDisabled && styles.disabledResend]}>
                {isResendDisabled ? `Resend in ${timer}s` : 'Resend'}
            </Text>
            </TouchableOpacity>
        </View>
        {/* Continue Button */}
        <TouchableOpacity style={[styles.button, otp.length === 0 && styles.disabledButton]} disabled={otp.length === 0}>
            <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EmailVerify;

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
    fontSize: 22,
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
    height: 60,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#f3f3f3',
    color: '#000',
    marginBottom: 20,
    width: '50%',
    fontWeight: '500'
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
    marginBottom: 25
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
    marginTop: 130,
    flex: 1,
  },
  bottomContainer:{
    marginBottom: 20,
    marginTop: 'auto'
  }
});
