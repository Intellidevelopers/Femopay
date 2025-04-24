import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import COLORS from '../constants/colors'; // Make sure COLORS.primary = your theme's purple
import { StatusBar } from 'expo-status-bar';
import useTransactionStore from '../store/useTransactionStore';

const TransactionReceipt = ({ navigation }) => {
    const { selectedTransaction } = useTransactionStore();

  if (!selectedTransaction) return null;

  const { type, amount, status, date, transactionId, sender, receiver,  } = selectedTransaction;

  return (
    <View style={styles.container}>
      {/* Success Icon */}
      <Image
        source={require('../assets/success.png')} // Replace with your actual success check icon
        style={styles.successIcon}
      />

      {/* Title */}
      <Text style={styles.title}>{type}</Text>
      <Text style={styles.subtitle}>Your payment was successful.</Text>

      {/* Receipt Info Card */}
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>Amount</Text>
          <Text style={styles.valueAmount}>{amount}</Text>
        </View>
        <View style={[styles.row, {borderBottomWidth: 1, paddingBottom: 16, borderBottomColor: '#E5E7EB'}]}>
          <Text style={styles.label}>Status</Text>
          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>{status}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Transaction ID</Text>
          <Text style={styles.value}>{transactionId}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Sender</Text>
          <Text style={styles.value}>{sender}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Receiver</Text>
          <Text style={styles.value}>{receiver}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Payment Method</Text>
          <Text style={styles.value}>{type}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Payment Time</Text>
          <Text style={styles.value}>{date}</Text>
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.shareButton}>
        <Text style={styles.shareButtonText}>Share Receipt</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('BottomTab')}>
        <Text style={styles.homeButtonText}>Back to Home</Text>
      </TouchableOpacity>
      </View>
      <StatusBar style='dark' backgroundColor='#fff'/>
    </View>
  );
};

export default TransactionReceipt;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 16,
  },
  successIcon: {
    width: 70,
    height: 70,
    marginBottom: 16,
    marginTop: 'auto'
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  card: {
    width: '100%',
    backgroundColor: '#f6f6f6',
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  label: {
    fontSize: 14,
    color: '#444',
  },
  value: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000',
  },
  valueAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  statusContainer: {
    backgroundColor: '#D1FADF',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 12,
  },
  statusText: {
    color: '#027A48',
    fontSize: 12,
    fontWeight: '600',
  },
  shareButton: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: 8,
    width: '100%',
    marginBottom: 12,
  },
  shareButtonText: {
    textAlign: 'center',
    color: COLORS.primary,
    fontWeight: '500',
    fontSize: 16,
  },
  homeButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: 8,
    width: '100%',
  },
  homeButtonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '500',
    fontSize: 16,
  },
  buttonContainer:{
    width: '100%',
    marginTop: 'auto',
    marginBottom: 25
  }
});
