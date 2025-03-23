import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import COLORS from "../constants/colors";

const AddName = ({ navigation }) => {
  const [fullName, setFullName] = useState("");

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView style={styles.content}>
        <Text style={styles.heading}>Please enter your full legal name</Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#C4C4C4"
          value={fullName}
          onChangeText={setFullName}
        />
      </ScrollView>
      <TouchableOpacity
        style={[styles.nextButton, { backgroundColor: fullName ? COLORS.primary : COLORS.grey3 }]}
        disabled={!fullName}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default AddName;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  content: {
    marginTop: 70,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.black, // Dark red
    marginBottom: 20,
  },
  input: {
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 10,
    color: "#000",
  },
  nextButton: {
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 40,
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});
