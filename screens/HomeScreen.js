import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../constants/colors";
import CustomBottomTab from "../components/BottomTab";
import { AntDesign } from "react-native-vector-icons/";
import FONTS from "../constants/fonts";
import { StatusBar } from "expo-status-bar";

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Top Balance Card */}
      <LinearGradient
        colors={["#6F0100", "#A60506"]} // Dark red on left, Light red on right
        start={{ x: 0, y: 0 }} // Start from the left
        end={{ x: 1, y: 0 }}   // End at the right
        style={styles.topCard}
      >

        {/* User Info */}
        <View style={styles.userRow}>
          <Image source={require('../assets/images/me.png')} style={styles.avatar} />
          <View style={styles.currencyContainer}>
              <Image source={require('../assets/flag.png')} style={styles.flag} />
              <Text style={styles.currencyText}>NG Naira</Text>
              <View style={styles.currencydropdown}>
                <AntDesign name="caretdown" size={10}/>
              </View>
          </View>
          <View style={styles.notificationContainer}>
            <Image source={require('../assets/icons/bookmark.png')} style={styles.icon} />
            <Image source={require('../assets/icons/bell.png')} style={styles.icon} />
          </View>
        </View>

        {/* Balance Section */}
        <Text style={styles.balanceTitle}>Available Balance</Text>
        <Text style={styles.balanceAmount}>₦200,500.26</Text>

        {/* Action Buttons */}
        
      </LinearGradient>
      <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionButton}>
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
            <TouchableOpacity style={[styles.card, {backgroundColor: '#F0EFFD'}]}>
              <Image source={require('../assets/icons/bank.png')} style={styles.cardIcon} />
              <Text style={styles.cardText}>Send To Bank</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.card, {backgroundColor: '#F0EFFD'}]}>
              <Image source={require('../assets/icons/cashtag.png')} style={styles.cardIcon} />
              <Text style={styles.cardText}>CashTag</Text>
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

        <View style={styles.section}>
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
        </View>
      </View>

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
    height: 240,
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
    fontSize: 24,
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
    width: 30,
    height: 30,
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
  }
});
