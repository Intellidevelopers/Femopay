import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import COLORS from "../constants/colors";
import Loader from "../components/Loader";
import { useNavigation } from "@react-navigation/native";

const ConfirmationCode = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(""); 

  // Function to format input dynamically as XXX - XXX
  const formatCode = (input) => {
    const numbersOnly = input.replace(/\D/g, ""); // Remove non-numeric characters
    const formatted = numbersOnly.replace(/^(\d{3})(\d{0,3})/, "$1 - $2").trim();
    return formatted;
  };

  const handleChangeText = (text) => {
    setCode(formatCode(text));
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Verification Successful!");
      navigation.navigate("AddBank");
    }, 3000);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <Loader visible={loading} />
      
      <View style={styles.header}>
        <Text style={styles.questionMark}>?</Text>
      </View>

      <ScrollView style={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Please enter the code sent to 07012345677</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Confirmation Code"
            placeholderTextColor="#C4C4C4"
            keyboardType="number-pad"
            value={code}
            onChangeText={handleChangeText}
            maxLength={9} // Ensures format remains XXX - XXX
          />
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.nextButton} onPress={handleSubmit}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ConfirmationCode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  header: {
    position: "absolute",
    top: 50,
    right: 20,
  },
  questionMark: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.black,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey3,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: "#000",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "auto",
    marginBottom: 50,
  },
  nextButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: 25,
    width: "100%",
  },
  nextButtonText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
  content: {
    paddingTop: 100,
    marginBottom: 100,
  },
  noteText: {
    fontSize: 14,
    color: "#666",
    marginTop: 30,
  },
});
