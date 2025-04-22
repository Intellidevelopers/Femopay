import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    Switch,
    FlatList,
  } from 'react-native';
  import React, { useState, useRef } from 'react';
  import { Ionicons, MaterialIcons, Entypo, AntDesign, Feather } from '@expo/vector-icons';
  import { StatusBar } from 'expo-status-bar';
  import { Modalize } from 'react-native-modalize';
  import Header from '../components/Header';
  import COLORS from '../constants/colors';
  
  const banks = [
    { name: 'LuxPay', icon: require('../assets/icons/firstbank.png') },
    { name: 'Access Bank', icon: require('../assets/icons/sterling.png') },
    { name: 'Accordion Bank', icon: require('../assets/icons/fcmb.png') },
    { name: 'Bankly Mfb', icon: require('../assets/icons/gtbank.png') },
    { name: 'Carbon', icon: require('../assets/icons/sterling.png') },
    { name: 'Ecobank', icon: require('../assets/icons/firstbank.png') },
    { name: 'GTBank', icon: require('../assets/icons/fcmb.png') },
  ];
  
  const BankTransfer = ({ navigation }) => {
    const [saveBeneficiary, setSaveBeneficiary] = useState(false);
    const modalRef = useRef(null);
  
    const openBankModal = () => {
      modalRef.current?.open();
    };

    const closeBankModal = () => {
        modalRef.current?.close();
      };
  
    return (
      <>
        <ScrollView contentContainerStyle={styles.container}>
          {/* Header */}
          <Header title="Bank Transfer" onBackPress={() => navigation.goBack()} />
  
          {/* Select Bank */}
          <Text style={styles.label}>Bank</Text>
          <TouchableOpacity style={styles.dropdown} onPress={openBankModal}>
            <Ionicons name="business" size={20} color="gray" />
            <Text style={styles.dropdownText}>Select Bank</Text>
            <Entypo name="chevron-down" size={20} color="gray" />
          </TouchableOpacity>
  
          {/* Account Number */}
          <Text style={styles.label}>Account Number</Text>
          <View style={styles.inputRow}>
            <TextInput
              placeholder="0123456789"
              keyboardType="numeric"
              style={styles.input}
            />
            <TouchableOpacity style={styles.pasteBtn}>
              <Text style={styles.pasteText}>Paste</Text>
              <MaterialIcons name="content-paste" size={18} color="red" />
            </TouchableOpacity>
          </View>
  
          {/* Choose Beneficiary */}
          <Text style={styles.label}>Choose a beneficiary</Text>
          <TouchableOpacity style={styles.dropdown}>
            <Text style={styles.dropdownText}>Beneficiaries</Text>
            <Entypo name="chevron-down" size={20} color="gray" />
          </TouchableOpacity>
  
          {/* Recents */}
          <Text style={styles.recentsLabel}>Recents</Text>
          <View style={styles.recentsBox}>
            <View style={styles.recentRow}>
              <View>
                <Text style={styles.recentName}>PROMISE LINDA JOSHUA</Text>
                <Text style={styles.recentDetails}>053014850 GTBank</Text>
              </View>
              <TouchableOpacity>
                <Ionicons name="person-circle" size={30} color="orange" />
              </TouchableOpacity>
            </View>
          </View>
  
          {/* Save as Beneficiary */}
          <View style={styles.switchRow}>
            <Switch
              value={saveBeneficiary}
              onValueChange={setSaveBeneficiary}
              trackColor={{ false: '#ccc', true: '#f00' }}
              thumbColor="#fff"
            />
            <Text style={styles.switchText}>Save as beneficiary</Text>
          </View>
  
          {/* Next Button */}
          <TouchableOpacity style={styles.nextButton}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
  
          <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        </ScrollView>
  
        {/* Modalize Bottom Sheet */}
        <Modalize ref={modalRef} modalHeight={500} handleStyle={{ backgroundColor: '#ccc' }}>
          <View style={{ padding: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, marginTop: 15 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold'}}>Select Bank</Text>
                <TouchableOpacity onPress={closeBankModal}>
                    <Feather name='x' size={20}/>
                </TouchableOpacity>
            </View>
            <View style={styles.searchBar}>
              <Ionicons name="search" size={18} color="#aaa" />
              <TextInput placeholder="Search for a bank" style={{ marginLeft: 10, flex: 1 }} />
            </View>
  
            <Text style={{ marginTop: 20, marginBottom: 10, color: '#333', fontWeight: 'bold' }}>Banks available</Text>
            <FlatList
              data={banks}
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.bankRow}>
                  <View style={styles.bankIcon}>
                    <Text style={{ fontWeight: 'bold', color: COLORS.primary }}>{item.name[0]}</Text>
                  </View>
                  <Text style={{ fontSize: 14 }}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Modalize>
      </>
    );
  };
  
  export default BankTransfer;
  
  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: '#fff',
      padding: 16,
    },
    label: {
      marginBottom: 10,
      marginTop: 12,
      fontSize: 14,
      color: '#555',
    },
    dropdown: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#F6F6F6',
      borderRadius: 10,
      paddingHorizontal: 12,
      paddingVertical: 15,
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    dropdownText: {
      color: '#555',
      fontSize: 14,
      flex: 1,
      marginLeft: 10,
    },
    inputRow: {
      flexDirection: 'row',
      backgroundColor: '#F6F6F6',
      borderRadius: 10,
      paddingHorizontal: 12,
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 20,
      height: 55
    },
    input: {
      flex: 1,
      paddingVertical: 15,
      fontSize: 14,
    },
    pasteBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      paddingHorizontal: 6,
    },
    pasteText: {
      color: 'red',
      fontWeight: '500',
    },
    recentsLabel: {
      marginTop: 20,
      fontSize: 14,
      fontWeight: '500',
      marginBottom: 6,
    },
    recentsBox: {
      backgroundColor: '#F6F6F6',
      borderRadius: 10,
      padding: 12,
    },
    recentRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    recentName: {
      fontWeight: '600',
    },
    recentDetails: {
      color: '#777',
      fontSize: 13,
      marginTop: 2,
    },
    switchRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 16,
      gap: 10,
    },
    switchText: {
      fontSize: 14,
    },
    nextButton: {
      marginTop: 'auto',
      backgroundColor: COLORS.primary,
      paddingVertical: 16,
      borderRadius: 10,
      alignItems: 'center',
      marginBottom: 20,
    },
    nextButtonText: {
      color: 'white',
      fontWeight: '600',
      fontSize: 16,
    },
    searchBar: {
      flexDirection: 'row',
      backgroundColor: '#f2f2f2',
      borderRadius: 8,
      alignItems: 'center',
      height: 45,
      paddingHorizontal: 15,
    },
    bankRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      gap: 12,
    },
    bankIcon: {
      width: 32,
      height: 32,
      backgroundColor: '#f2f2f2',
      borderRadius: 6,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  