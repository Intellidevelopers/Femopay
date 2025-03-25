import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import colors from '../constants/colors';

interface HeaderProps {
    title: string;
    onBackPress: () => void;
  }
  const Header: React.FC<HeaderProps> = ({ title, onBackPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
          <AntDesign name='arrowleft' size={20} />
        </TouchableOpacity>
        <Text style={styles.headerText}>{title}</Text>
        <TouchableOpacity style={styles.placeholder}>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    top: 10,
  },
  backButton: {
    backgroundColor: '#eee',
    padding: 16,
    width: 55,
    alignItems: "center",
    borderRadius: 100,
    
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
    marginTop: 40,
    alignItems: 'center',
    paddingHorizontal: 1,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  placeholder: {
    padding: 20,
  },
});
