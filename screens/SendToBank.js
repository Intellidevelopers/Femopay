import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import React from 'react';
import { Ionicons, MaterialCommunityIcons, FontAwesome5, Entypo } from '@expo/vector-icons';
import Header from '../components/Header';
import { StatusBar } from 'expo-status-bar';

const SendToBank = ({ navigation }) => {
  return (
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <Header title='Send To Bank' onBackPress={() => navigation.goBack()}/>

        {/* Title */}
        <Text style={styles.title}>How would you like to send money?</Text>

        {/* Option List */}
        <View style={styles.optionList}>
          <TouchableOpacity onPress={() => navigation.navigate('BankTransfer')} style={styles.option}>
            <MaterialCommunityIcons name="bank-transfer" size={24} color="black" />
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitle}>Bank Transfer</Text>
              <Text style={styles.optionSubtitle}>Send directly to bank account or mobile wallet.</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option}>
            <FontAwesome5 name="tags" size={20} color="black" />
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitle}>FemoTag Transfer</Text>
              <Text style={styles.optionSubtitle}>Send money instantly to other FemoPay users using their FemoTag</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option}>
            <Entypo name="mail" size={24} color="black" />
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitle}>Email Transfer</Text>
              <Text style={styles.optionSubtitle}>Set up a transaction and send its reference and authentication code to the recipient to receive the money.</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option}>
            <MaterialCommunityIcons name="cellphone" size={24} color="black" />
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitle}>Phone Transfer</Text>
              <Text style={styles.optionSubtitle}>Send directly to bank account or mobile wallet.</Text>
            </View>
          </TouchableOpacity>
        </View>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      </ScrollView>
  );
};

export default SendToBank;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  optionList: {
    gap: 12,
  },
  option: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#F6F6F6',
    borderRadius: 8,
    alignItems: 'flex-start',
    gap: 16,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  optionSubtitle: {
    fontSize: 13,
    color: '#666',
  },
});
