import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Feather } from 'react-native-vector-icons';

const Tab = createBottomTabNavigator();

import HomeScreen from "../screens/HomeScreen";
import WalletScreen from "../screens/WalletScreen";
import CardsScreen from "../screens/CardsScreen";
import SettingsScreen from "../screens/SettingsScreen";
import TransferScreen from "../screens/TransferScreen";

const CustomTabBarButton = ({ children, onPress, isFocused  }) => (
  <TouchableOpacity style={styles.floatingButton} onPress={onPress}>
    <View style={styles.floatingButtonInner}>{children}</View>
    <Text style={[styles.floatingButtonText, { color: isFocused ? 'red' : 'gray' }]}>SEND</Text>
  </TouchableOpacity>
);

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: true,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
        tabBarActiveTintColor: '#D90002',
        tabBarInactiveTintColor: 'gray',
        headerShown: false
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <Feather name="home" color={color} size={size} />
        }}
      />
      <Tab.Screen 
        name="Wallet" 
        component={WalletScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="wallet-outline" color={color} size={size} />
        }}
      />
      <Tab.Screen 
        name="Send"
        component={TransferScreen}
        options={{
          tabBarButton: (props) => <CustomTabBarButton {...props} isFocused={props.accessibilityState.selected}>
            <Icon name="swap-vertical" size={24} color="white" />
          </CustomTabBarButton>,
        }}
      />
      <Tab.Screen 
        name="Cards" 
        component={CardsScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="card-outline" color={color} size={size} />
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="settings-outline" color={color} size={size} />
        }}
      />
    </Tab.Navigator>
  );
};

export default function BottomTab() {
  return (
      <TabNavigator />
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    position: 'absolute',
    bottom: 10,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    height: 70,
    width: '95%',
    marginLeft: 10,
    paddingTop: 5
    
  },
  tabLabel: {
    fontSize: 12,
  },
  floatingButton: {
    top: -30,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    })
  },
  floatingButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: '#D70909',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5
  },
  floatingButtonText:{
    fontSize: 14,
  }
});
