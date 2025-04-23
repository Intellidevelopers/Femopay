import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator ,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../constants/colors"; // Make sure this exists
import Header from "../components/Header";
import useSignupStore from '../store/useSignupStore'; // if not already imported
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';


const SetTransactionPin = ({ navigation }) => {
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);


  const handlePress = (digit) => {
    if (pin.length < 4) {
      setPin(pin + digit);
    }
  };

  useEffect(() => {
    if (pin.length === 4) {
      setTransactionPin(pin);
    }
  }, [pin]);
  const setTransactionPin = async (finalPin) => {
    setLoading(true);
    try {
      const userId = await AsyncStorage.getItem("userId");
  
      if (!userId) {
        Toast.show({
          type: 'error',
          text1: 'User not found',
          text2: 'Please log in again.',
        });
        return;
      }
  
      const response = await fetch("https://femopay-startup.onrender.com/api/v1/auth/set-pin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, pin: finalPin }),
      });
  
      const res = await response.json();
  
      if (response.ok) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: res.message || "Transaction PIN set successfully",
        });
        navigation.navigate("VerifyTransactionPin", { pin });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Failed to set PIN',
          text2: res.message || "Please try again.",
        });
        setPin(""); // reset for retry
      }
    } catch (error) {
      console.error("Error setting PIN:", error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: "An error occurred while setting your PIN.",
      });
      setPin("");
    } finally {
      setLoading(false);
    }
  };
  
  
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  const handleBackspace = () => {
    setPin(pin.slice(0, -1));
  };

  // useFocusEffect(
  //   useCallback(() => {
  //     AsyncStorage.setItem('lastVisitedScreen', 'SetTransactionPin'); // change accordingly
  //   }, [])
  // );
  const renderDots = () => {
    return (
      <View style={styles.dotsContainer}>
        {[0, 1, 2, 3].map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor: pin.length > index ? COLORS.primary : "#eee",
              },
            ]}
          />
        ))}
      </View>
    );
  };

  const renderKeypad = () => {
    const keys = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      ["-", 0, "←"],
    ];

    return keys.map((row, rowIndex) => (
      <View key={rowIndex} style={styles.row}>
        {row.map((key, colIndex) => (
          <TouchableOpacity
            key={colIndex}
            style={styles.key}
            onPress={() => {
              if (key === "←") handleBackspace();
              else if (key !== "") handlePress(key);
            }}
            disabled={key === ""}
          >
            <Text style={styles.keyText}>
              {key === "←" ? <Ionicons name="backspace" size={24} /> : key}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    ));
  };

  return (
    <ScrollView style={styles.container}>
      <Header title="Set Transaction Pin"/>

      <Text style={styles.title}>Set a transaction pin</Text>
      <Text style={styles.subtitle}>
        Create a 4 digit pin to authorize transactions on FemoPay.
      </Text>

      {renderDots()}
      <View style={styles.keypadContainer}>{renderKeypad()}</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  backButton: {
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "gray",
    marginBottom: 32,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 40,
    gap: 16,
    marginTop: 30
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: "#eee",
  },
  keypadContainer: {
    flex: 1,
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  key: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    alignItems: "center",
  },
  keyText: {
    fontSize: 24,
    fontWeight: "600",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white", // or use a semi-transparent overlay if you prefer
  },
  
});

export default SetTransactionPin;
