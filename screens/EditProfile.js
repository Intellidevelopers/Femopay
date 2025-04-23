// import React, { useState } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   TouchableOpacity,
//   ScrollView,
//   Modal,
//   Pressable,
//   Platform
// } from "react-native";
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { AntDesign } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";
// import { LinearGradient } from "expo-linear-gradient";
// import COLORS from "../constants/colors";
// import { TextInput } from "react-native-gesture-handler";
// import * as ImagePicker from "expo-image-picker";

// const EditProfile = () => {
//   const navigation = useNavigation();
//   const [isLoading, setIsLoading] = useState(false);
//   const [imageUri, setImageUri] = useState(null);
//   const [dateOfBirth, setDateOfBirth] = useState(new Date());
//   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
//   const [gender, setGender] = useState(null);
//   const [genderModalVisible, setGenderModalVisible] = useState(false);

//   const pickImage = async () => {
//     const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (!permissionResult.granted) {
//       alert("Permission to access gallery is required!");
//       return;
//     }
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 1,
//     });
//     if (!result.canceled) {
//       setImageUri(result.assets[0].uri);
//     }
//   };

//   const handleSignupPress = () => {
//     setIsLoading(true);
//     setTimeout(() => {
//       setIsLoading(false);
//       navigation.navigate("BottomTab");
//     }, 2000);
//   };

//   const handleConfirm = (date) => {
//     setDateOfBirth(date);
//     setDatePickerVisibility(false);
//   };

//   return (
//     <View style={styles.container}>
//       <LinearGradient colors={["#520200", "#A60506"]} style={styles.header}>
//         <View style={styles.header2}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <AntDesign name="arrowleft" size={24} color="#fff" />
//           </TouchableOpacity>
//           <Text style={styles.headerText}>Personal Information</Text>
//           <View style={{ width: 24 }} />
//         </View>
//         <View style={{ alignItems: "center" }}>
//           <Image
//             source={imageUri ? { uri: imageUri } : require("../assets/icons/user.png")}
//             style={styles.avatar}
//           />
//           <TouchableOpacity style={{ top: -35, left: 35 }} onPress={pickImage}>
//             <AntDesign name="camera" color={"#fff"} size={28} />
//           </TouchableOpacity>
//         </View>
//       </LinearGradient>

//       <ScrollView contentContainerStyle={styles.content}>
//         <View style={styles.flexBoxContainer}>
//           <View style={styles.flexBox}>
//             <Text style={styles.label}>First Name</Text>
//             <TextInput placeholder="John" placeholderTextColor="gray" style={styles.input} />
//           </View>
//           <View style={styles.flexBox}>
//             <Text style={styles.label}>Last Name</Text>
//             <TextInput placeholder="Doe" placeholderTextColor="gray" style={styles.input} />
//           </View>
//         </View>

//         <View style={styles.flexBoxContainer}>
//           <View style={styles.flexBox}>
//             <Text style={[styles.label, {top: -10}]}>Date of Birth</Text>
//             <TouchableOpacity onPress={() => setDatePickerVisibility(true)} style={styles.dateContainer}>
//               <Text>{dateOfBirth.toDateString()}</Text>
//               <AntDesign name="calendar" size={16} />
//             </TouchableOpacity>
//           </View>

//           <View>
//             <Text style={[styles.label, { top: -10 }]}>Gender</Text>
//             <TouchableOpacity style={styles.dateContainer} onPress={() => setGenderModalVisible(true)}>
//               <Text>{gender || "Select Gender"}</Text>
//               <AntDesign name="down" size={16} />
//             </TouchableOpacity>
//           </View>
//         </View>

//         {isDatePickerVisible && (
//         <DateTimePicker
//             value={dateOfBirth}
//             mode="date"
//             display={Platform.OS === 'ios' ? 'spinner' : 'default'}
//             maximumDate={new Date()}
//             onChange={(event, selectedDate) => {
//                 if (event.type === "set" && selectedDate) {
//                   setDateOfBirth(selectedDate);
//                 }
//                 // Close picker after selection on both platforms
//                 setDatePickerVisibility(false);
//               }}
              
//         />
//         )}
        
//         <Modal transparent visible={genderModalVisible} animationType="fade">
//           <Pressable style={styles.modalOverlay} onPress={() => setGenderModalVisible(false)}>
//             <View style={styles.genderModal}>
//               {["Male", "Female", "Other"].map((option) => (
//                 <TouchableOpacity
//                   key={option}
//                   style={styles.genderOption}
//                   onPress={() => {
//                     setGender(option);
//                     setGenderModalVisible(false);
//                   }}
//                 >
//                   <Text style={styles.genderText}>{option}</Text>
//                 </TouchableOpacity>
//               ))}
//             </View>
//           </Pressable>
//         </Modal>

//         <TouchableOpacity style={styles.button} onPress={handleSignupPress} disabled={isLoading}>
//           {isLoading ? (
//             <Image source={require("../assets/icons/loader.gif")} style={styles.loader} />
//           ) : (
//             <Text style={styles.buttonText}>Save Settings</Text>
//           )}
//         </TouchableOpacity>
//       </ScrollView>
      


//     </View>
//   );
// };

// export default EditProfile;


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   header: {
//     backgroundColor: COLORS.primary,
//     justifyContent: 'center',
//     padding: 16
//   },
//   title: {
//     color: "#fff",
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//     top: -18
//   },
//   avatar: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//   },
//   name: {
//     color: "#fff",
//     fontWeight: "bold",
//     fontSize: 22,
//     marginBottom: 5
//   },
//   email: {
//     color: "#ddd",
//     fontSize: 14,
//     fontWeight: "600",
//   },
//   section: {
//     paddingHorizontal: 20,
//     marginTop: 20,
//   },
//   sectionTitle: {
//     color: "#999",
//     fontSize: 14,
//     marginBottom: 10,
//   },
//   item: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: 18,
//     borderBottomWidth: 1,
//     borderColor: "#eee",
//   },
//   itemIcon: {
//     width: 30,
//     alignItems: "center",
//   },
//   itemText: {
//     flex: 1,
//     marginLeft: 10,
//     fontSize: 15,
//     fontWeight: "500",
//   },
//   buttonText: {
//     fontSize: 16,
//     color: '#fff',
//     fontWeight: 'bold'
//   },
//   header2: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 40,
//     marginTop: 35,
//     alignItems: 'center',
//     paddingHorizontal: 1,
//   },
//   headerText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#fff'
//   },
//   placeholder: {
//     padding: 20,
//   },
//   label:{
//     fontSize: 16,
//     fontWeight: '500',
//     marginBottom: 5
//   },
//   input:{
//     backgroundColor: '#F6F6F6',
//     borderRadius: 10,
//     paddingHorizontal: 12,
//     paddingVertical: 15,
//     marginBottom: 20,
//     fontSize: 16,
//     color: '#555',
//     fontWeight: 'bold'
//   },
//   content:{
//     padding: 16,
//     flex: 1
//   },
//   flexBoxContainer:{
//     flexWrap: 'wrap',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20
//   },
//   flexBox:{
//     width: 160
//   },
//   dateContainer:{
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     backgroundColor: '#f6f6f6',
//     padding: 15,
//     borderRadius: 10,
//     width: 160,
//     top: -10
//   },
//   button: {
//     backgroundColor: COLORS.primary,
//     height: 55,
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: 8,
//     marginTop: 'auto',
//     elevation: 5,
//     shadowColor: COLORS.black,
//     shadowOffset: 0,
//     shadowRadius: 10,
//     shadowOpacity: 0.2,
//     marginBottom: 20
    
//   },
//   buttonText: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#fff",
//   },
//   loader: {
//     width: 50,
//     height: 50,
//     resizeMode: "contain",
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "#00000066",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   genderModal: {
//     backgroundColor: "white",
//     borderRadius: 8,
//     padding: 20,
//     width: "70%",
//   },
//   genderOption: {
//     paddingVertical: 12,
//   },
//   genderText: {
//     fontSize: 16,
//     color: "#333",
//   },
// });
