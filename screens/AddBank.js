import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../constants/colors";
import Loader from "../components/Loader";
import { useNavigation } from "@react-navigation/native";


const AddBank = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expDate, setExpDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const expDateRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();


  // Function to format the card number with spaces
  const formatCardNumber = (text) => {
    let cleaned = text.replace(/\D/g, ""); // Remove non-digit characters
    let formatted = cleaned.match(/.{1,4}/g)?.join(" ").substring(0, 19) || "";
    setCardNumber(formatted);

    if (formatted.length === 19) {
      setShowAdditionalFields(true);
      setTimeout(() => expDateRef.current?.focus(), 300); // Auto-focus on MM/YY
    } else {
      setShowAdditionalFields(false);
    }
  };

  const formatExpDate = (text) => {
    let cleaned = text.replace(/\D/g, ""); // Remove non-digit characters
    let formatted = "";

    if (cleaned.length <= 2) {
      formatted = cleaned; // First two digits (MM)
    } else {
      formatted = cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4); // MM/YY
    }

    setExpDate(formatted);
  };

  // Function to check if all fields are filled
  const isFormComplete = () => {
    return cardNumber.length === 19 && expDate.length === 5 && cvv.length === 3 && postalCode.length >= 5;
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Card Added Successfully!");
      navigation.navigate("AddName");
    }, 3000);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Loader visible={loading} />

      <Text style={styles.title}>Add a bank using your debit card</Text>

      {/* Card Number Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { flex: 2 }]}
          placeholder="Debit Card Number"
          placeholderTextColor="#C4C4C4"
          keyboardType="number-pad"
          value={cardNumber}
          onChangeText={formatCardNumber}
          maxLength={19}
        />
        <Ionicons name="lock-closed" size={18} color={COLORS.primary} style={{ marginLeft: 10 }} />
      </View>

      {showAdditionalFields && (
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.smallInput]}
            placeholder="MM/YY"
            placeholderTextColor="#C4C4C4"
            keyboardType="number-pad"
            value={expDate}
            onChangeText={formatExpDate}
            maxLength={5}
            ref={expDateRef}
          />

          <TextInput
            style={[styles.input, styles.smallInput]}
            placeholder="CVV"
            placeholderTextColor="#C4C4C4"
            keyboardType="number-pad"
            value={cvv}
            onChangeText={setCvv}
            maxLength={3}
          />
          <TextInput
            style={[styles.input, styles.smallInput]}
            placeholder="Postcode"
            placeholderTextColor="#C4C4C4"
            keyboardType="number-pad"
            value={postalCode}
            onChangeText={setPostalCode}
            maxLength={6}
          />
        </View>
      )}

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.skipButton} onPress={() => navigation.navigate('BottomTab')}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.nextButton, { opacity: isFormComplete() ? 1 : 0.3 }]}
          disabled={!isFormComplete()}
          onPress={handleSubmit}
        >
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddBank;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F9F9F9",
    paddingHorizontal: 20,
    paddingTop: 100,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: COLORS.black,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#EAEAEA",
    marginTop: 20,
    paddingBottom: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  input: {
    fontSize: 16,
    color: "#000",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  smallInput: {
    flex: 1,
    marginRight: 10,
    borderBottomWidth: 1,
    borderColor: "#EAEAEA",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
  },
  skipButton: {
    backgroundColor: COLORS.grey3,
    paddingVertical: 15,
    paddingHorizontal: 65,
    borderRadius: 25,
  },
  skipText: {
    color: "#3D0F0F",
    fontSize: 16,
    fontWeight: "500",
  },
  nextButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    paddingHorizontal: 55,
    borderRadius: 25,
  },
  nextText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
});
