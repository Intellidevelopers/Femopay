import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../constants/colors";
import Header from "../components/Header";
import Toast from 'react-native-toast-message';


const VerifyTransactionPin = ({ navigation, route }) => {
  const [pin, setPin] = useState("");
  const originalPin = route.params?.pin; // Passed from SetTransactionPin
  const [loading, setLoading] = useState(false);


  const handlePress = (digit) => {
    if (pin.length < 4) {
      setPin(pin + digit);
    }
  };

  useEffect(() => {
    if (pin.length === 4) {
      setLoading(true);
      setTimeout(() => {
        if (pin === originalPin) {
          setLoading(false);
          navigation.navigate("Success", {
            title: "PIN Verified",
            subtitle: "You can now complete secure transactions.",
            buttonText: "Go to Login",
            onContinue: () => navigation.replace("Login"),
          });
        } else {
          setLoading(false);
          Toast.show({
            type: 'error',
            text1: 'PIN Mismatch',
            text2: 'PINs do not match. Please try again.',
          });
          setPin("");
        }
      }, 1000);
    }
  }, [pin]);
  
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

  const renderDots = () => (
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
              else if (key !== "-") handlePress(key);
            }}
            disabled={key === "-"}
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
      <Header title="Confirm Pin" />
      <Text style={styles.title}>Confirm transaction pin</Text>
      <Text style={styles.subtitle}>
        Confirm your pin to authorize transactions on FemoPay.
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
    marginTop: 30,
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
    backgroundColor: "#fff",
  },
  
});

export default VerifyTransactionPin;
