import React, { useRef, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../constants/colors";
import CustomBottomTab from "../components/BottomTab";
import { AntDesign } from "react-native-vector-icons/";
import FONTS from "../constants/fonts";
import { StatusBar } from "expo-status-bar";
import { Modalize } from "react-native-modalize"; // Importing the Modalize component
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TransactionHistory from "./TransactionHistory";
import useTransactionStore from '../store/useTransactionStore';

const transactions = [
  {
    id: '1',
    type: 'Spend & Save Deposit',
    amount: '₦300.00',
    status: 'Successful',
    date: 'Apr 24th, 08:09:35',
    icon: require('../assets/success.png'),
    transactionId: 'QWERTYUIOPASD',
    sender: 'Faith Adeyemi',
    receiver: 'Joy Amadi',
  },
  {
    id: '2',
    type: 'Bonus from Data Purchase',
    amount: '+₦15.00',
    status: 'Successful',
    date: 'Apr 24th, 08:09:35',
    icon: require('../assets/success.png'),
    transactionId: 'QWERTYUIOPASD',
    sender: 'Faith Adeyemi',
    receiver: 'Joy Amadi',
  },
  {
    id: '3',
    type: 'Mobile Data',
    amount: '-₦1,500.00',
    status: 'Successful',
    date: 'Apr 24th, 08:09:27',
    icon: require('../assets/success.png'),
    transactionId: 'QWERTYUIOPASD',
    sender: 'Faith Adeyemi',
    receiver: 'Joy Amadi',
  },

];

const HomeScreen = ({ navigation }) => {
  const modalizeRef = useRef(null); // Reference to control the bottom sheet
  const { setTransactions, selectTransaction } = useTransactionStore();

  // Function to open the bottom sheet
  const openCurrencyExchangeModal = () => {
    modalizeRef.current?.open();
  };

  const modalizeRef2 = useRef(null); // Reference to control the bottom sheet

  // Function to open the bottom sheet
  const openCurrencyExchangeModal2 = () => {
    modalizeRef2.current?.open();
  };

    //   useFocusEffect(
    //   useCallback(() => {
    //     AsyncStorage.setItem('lastVisitedScreen', 'BottomTab'); // change accordingly
    //   }, [])
    // );


  React.useEffect(() => {
    setTransactions(transactions); // you can also fetch from API and set here
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Top Balance Card */}
      <LinearGradient
        colors={["#4E0605", "#A60506"]} // Dark red on left, Light red on right
        start={{ x: 0, y: 0 }} // Start from the left
        end={{ x: 1, y: 0 }}   // End at the right
        style={styles.topCard}
      >

        {/* User Info */}
        <View style={styles.userRow}>
          <Image source={require('../assets/icons/user.png')} style={styles.avatar} />
          <TouchableOpacity onPress={openCurrencyExchangeModal} style={styles.currencyContainer}>
              <Image source={require('../assets/flag.png')} style={styles.flag} />
              <Text style={styles.currencyText}>NG Naira</Text>
              <View style={styles.currencydropdown}>
                <AntDesign name="caretdown" size={10}/>
              </View>
          </TouchableOpacity>
          <View style={styles.notificationContainer}>
            <Image source={require('../assets/icons/bookmark.png')} style={styles.icon} />
            <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
            <Image source={require('../assets/icons/bell.png')} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Balance Section */}
        <View style={{ marginTop: 20 }}>
          <Text style={styles.balanceTitle}>Available Balance</Text>
          <Text style={styles.balanceAmount}>₦200,500.26</Text>
        </View>

        {/* Action Buttons */}
        
      </LinearGradient>
      <View style={styles.actionRow}>
          <TouchableOpacity onPress={openCurrencyExchangeModal2} style={styles.actionButton}>
          <Image source={require('../assets/icons/topup.png')} style={styles.tabicon} />
            <Text style={styles.actionText}>Top Up</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
          <Image source={require('../assets/icons/Swap.png')} style={styles.tabicon} />
            <Text style={styles.actionText}>Swap</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
          <Image source={require('../assets/icons/request.png')} style={[styles.tabicon, {width: 20, height: 20}]} />
            <Text style={styles.actionText}>Request</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
          <Image source={require('../assets/icons/rewards.png')} style={[styles.tabicon, {width: 20, height: 20}]} />
            <Text style={styles.actionText}>Rewards</Text>
          </TouchableOpacity>
        </View>

      {/* Scrollable Sections */}
      <View style={styles.scrollContent}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Money Transfer</Text>
            <Text style={styles.more}>See more</Text>
          </View>

          <View style={styles.cardRow}>
            <TouchableOpacity onPress={() => navigation.navigate('SendToBank')} style={[styles.card, {backgroundColor: '#F0EFFD'}]}>
              <Image source={require('../assets/icons/bank.png')} style={styles.cardIcon} />
              <Text style={styles.cardText}>Send To Bank</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.card, {backgroundColor: '#F0EFFD'}]}>
              <Image source={require('../assets/icons/cashtag.png')} style={styles.cardIcon} />
              <Text style={styles.cardText}>FemoTag</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recharge & Bill Payments</Text>
            <Text style={styles.more}>See more</Text>
          </View>
          <View style={styles.cardRow}>
            <TouchableOpacity style={[styles.card, {backgroundColor: '#F0EFFD'}]}>
              <Image source={require('../assets/icons/airtime.png')} style={styles.cardIcon} />
              <Text style={styles.cardText}>Airtime</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.card, {backgroundColor: '#F0EFFD'}]}>
              <Image source={require('../assets/icons/data.png')} style={styles.cardIcon} />
              <Text style={styles.cardText}>Data Bundle</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.card, {backgroundColor: '#F0EFFD'}]}>
              <Image source={require('../assets/icons/electricity.png')} style={styles.cardIcon} />
              <Text style={styles.cardText}>Electricity</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.card, {backgroundColor: '#F0EFFD'}]}>
              <Image source={require('../assets/icons/cable.png')} style={styles.cardIcon} />
              <Text style={styles.cardText}>Cable TV</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>More Services</Text>
            <Text style={styles.more}>See more</Text>
          </View>
          <View style={styles.cardRow}>
            <TouchableOpacity style={styles.servicecard}>
              <Image source={require('../assets/icons/giftcard.png')} style={styles.cardIcon} />
              <Text style={styles.servicecardText}>Buy GiftCard</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.servicecard}>
              <Image source={require('../assets/icons/epic.png')} style={styles.cardIcon} />
              <Text style={styles.servicecardText}>Epic</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.card, {backgroundColor: '#F0EFFD',}]}>
              <Image source={require('../assets/icons/redeem.png')} style={[styles.cardIcon, {height: 50, width: 55, left: 4}]} />
              <Text style={styles.cardText}>Redeem Card</Text>
            </TouchableOpacity>
          </View>
        </View> */}
      {/* Transaction History */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Transaction</Text>
          <TouchableOpacity onPress={() => navigation.navigate('TransactionHistory')}>
          <Text style={styles.more}>See more</Text>
          </TouchableOpacity>
        </View>
      </View>
        {/* Transaction History List */}
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => {
            selectTransaction(item);
            navigation.navigate('TransactionReceipt');
          }} style={styles.transactionItem}>
            <Image source={item.icon} style={styles.ticon} />
            <View style={styles.details}>
              <Text style={styles.title}>{item.type}</Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>
            <View style={styles.amountContainer}>
              <Text style={[
                styles.amount,
                { color: item.amount.startsWith('-') ? 'red' : 'green' }
              ]}>
                {item.amount}
              </Text>
              <Text style={styles.status}>{item.status}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      </View>

      {/* Modal Bottom Sheet */}
      <Modalize
        ref={modalizeRef}
        snapPoint={320} // Set the height of the bottom sheet
        modalHeight={350} // Set the maximum height
        withHandle={false} // Optionally disable the handle for more compact design
      >
        <View style={styles.bottomSheetContent}>
          <Text style={styles.bottomSheetTitle}>Currency Exchange</Text>

          {/* Example exchange options */}
          <TouchableOpacity style={styles.exchangeOptionButton}>
            <Image source={require('../assets/flag.png')} style={styles.flag} />
            <Text style={styles.optionText}>Naira</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.exchangeOptionButton}>
            <Image source={require('../assets/flag.png')} style={styles.flag} />
            <Text style={styles.optionText}>USD</Text>
          </TouchableOpacity>

          {/* Add more exchange options as needed */}
        </View>
      </Modalize>

      <Modalize
        ref={modalizeRef2}
        snapPoint={350} // Set the height of the bottom sheet
        modalHeight={350} // Set the maximum height
        withHandle={false} // Optionally disable the handle for more compact design
      >
        <View style={styles.bottomSheetContent}>
          <Text style={styles.bottomSheetTitle}>Top up Methods</Text>

          {/* Example exchange options */}
          <TouchableOpacity style={styles.exchangeOption}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <AntDesign name="bank" size={20} color={'#000'}/>
            <View style={styles.currencyItem}>
              <Text style={styles.optionText}>Fund with bank transfer</Text>
              <Text style={styles.subText}>Tap to view details</Text>
            </View>
            </View>
            <AntDesign name="right" size={16}/>
          </TouchableOpacity>

          <TouchableOpacity style={styles.exchangeOption}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <AntDesign name="wallet" size={20} color={'#000'}/>
            <View style={styles.currencyItem}>
              <Text style={styles.optionText}>Fund with other wallets</Text>
              <Text style={styles.subText}>Use your other currency wallets</Text>
            </View>
            </View>
            <AntDesign name="right" size={16}/>
          </TouchableOpacity>

          {/* Add more exchange options as needed */}
        </View>
      </Modalize>
      
      <StatusBar style="light"/>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topCard: {
    position: "relative", // ✅ Make sure this is present
    padding: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    height: 260,
    paddingTop: 45,
  },
  
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between'
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  username: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  currencyContainer: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    left: 12
  },
  currencyText: {
    color: "#fff",
    fontSize: 12,
  },
  balanceTitle: {
    color: "#f5f5f5",
    fontSize: 14,
    marginTop: 30,
    textAlign: "center",
    marginBottom: 5,
  },
  balanceAmount: {
    color: "#fff",
    fontSize: 28,
    textAlign: "center",
    fontWeight: "bold",

  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: '#FFFFFF',
    paddingBottom: 10,
    borderRadius: 18,
    paddingVertical: 10,
    marginTop: -40,
    width: '85%',
    alignSelf: 'center',
    
    // ✅ Add shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  
    // ✅ Elevation for Android
    elevation: 10,  
  },  
  actionText: {
    fontSize: 12,
    fontWeight: "500",
    marginTop: 5,
    color: "black", // Explicitly setting text color
  },

  actionButton: {
    padding: 10,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: 'center'
  },
  scrollContent: {
    padding: 15,
    flex: 1,
    paddingBottom: 100,
  },
  section: {
    marginTop: 10
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: FONTS.semiBold,
    flex: 1
  },
  cardRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: 'space-between'
  },
  card: {
    width: "48%",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    alignItems: "center",
    flexDirection: 'row',
    marginBottom: 20,
    paddingVertical: 3
  },
  flag:{
    width: 20,
    height: 20,
    resizeMode: 'contain'
  },
  currencydropdown:{
    backgroundColor: "#fff",
    padding: 3,
    borderRadius: 10,
  },
  icon:{
    width: 35,
    height: 35,
    resizeMode: 'contain'
  },
  tabicon:{
    width: 22,
    height: 22,
    resizeMode: 'contain',
    marginLeft: 5,
  },
  notificationContainer:{
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  sectionHeader:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10
  },
  more:{
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: "500",
  },
  cardIcon:{
    width: 50,
    height: 45,
    resizeMode: 'contain',
    left: 4
  },
  cardText:{
    fontSize: 12,
    marginLeft: 10,
    fontWeight: "500",
  },
  servicecard:{
    alignItems: 'center'
  },
  servicecardText:{
    fontSize: 12,
    fontWeight: "500",
    marginTop: 5,
    textAlign: 'center'
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
    marginBottom: 30,
    textAlign: "center",
  },
  exchangeOption:{
    padding: 15,
    backgroundColor: "#f6f6f6",
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: 10,
    justifyContent: "space-between",
  },
  optionText:{
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  subText:{
    fontSize: 12,
    color: "#999",
    marginTop: 5,
  },
  exchangeOptionButton:{
    padding: 15,
    backgroundColor: "#f6f6f6",
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: 10,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 14,
    fontWeight: '600',
  },
  status: {
    fontSize: 12,
    color: 'green',
  },
  ticon:{
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 20,
  }
});
