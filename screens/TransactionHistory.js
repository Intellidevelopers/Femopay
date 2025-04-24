import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import COLORS from '../constants/colors';
import Header from '../components/Header';
import { StatusBar } from 'expo-status-bar';
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
  {
    id: '4',
    type: 'Transfer from JOSIAH ADEAG...',
    amount: '+₦5,000.00',
    status: 'Successful',
    date: 'Apr 24th, 08:09:07',
    icon: require('../assets/success.png'),
    transactionId: 'QWERTYUIOPASD',
    sender: 'Faith Adeyemi',
    receiver: 'Joy Amadi',
  },
  {
    id: '5',
    type: 'OWealth Interest Earned',
    amount: '+₦0.09',
    status: 'Successful',
    date: 'Apr 24th, 02:15:27',
    icon: require('../assets/success.png'),
    transactionId: 'QWERTYUIOPASD',
    sender: 'Faith Adeyemi',
    receiver: 'Joy Amadi',
  },
  {
    id: '6',
    type: 'Spend & Save Deposit',
    amount: '₦20.00',
    status: 'Successful',
    date: 'Apr 23rd, 17:03:53',
    icon: require('../assets/success.png'),
    transactionId: 'QWERTYUIOPASD',
    sender: 'Faith Adeyemi',
    receiver: 'Joy Amadi',
  },
  {
    id: '7',
    type: 'Bonus from Airtime Purchase',
    amount: '+₦2.00',
    status: 'Successful',
    date: 'Apr 23rd, 17:03:49',
    icon: require('../assets/success.png'),
    transactionId: 'QWERTYUIOPASD',
    sender: 'Faith Adeyemi',
    receiver: 'Joy Amadi',
  },
];

const TransactionHistory = ({ navigation }) => {
  const { setTransactions, selectTransaction } = useTransactionStore();


    React.useEffect(() => {
      setTransactions(transactions); // you can also fetch from API and set here
    }, []);
  return (
    <View style={styles.container}>
      <Header title='Transaction History' onBackPress={() => navigation.goBack()}/>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>In: ₦184,243.22</Text>
        <Text style={styles.summaryText}>Out: ₦181,566.00</Text>
      </View>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => {
            selectTransaction(item);
            navigation.navigate('TransactionReceipt');
          }} style={styles.transactionItem}>
            <Image source={item.icon} style={styles.icon} />
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
      <StatusBar style='dark' backgroundColor='#fff'/>
    </View>
  );
};

export default TransactionHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 30,
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
});
