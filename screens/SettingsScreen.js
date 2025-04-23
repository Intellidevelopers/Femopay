import React, { useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import {
  Ionicons,
  Feather,
  MaterialCommunityIcons,
  AntDesign,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../constants/colors";
import useSignupStore from '../store/useSignupStore';


const sections = [
  {
    title: "Account Settings",
    data: [
      {
        icon: <Feather name="user" size={18} />,
        label: "Personal Information",
        route: "ComingSoon",
      },
      {
        icon: <Feather name="lock" size={18} />,
        label: "Password & Security",
        route: "ComingSoon",
      },
      {
        icon: <Feather name="bell" size={18} />,
        label: "Notifications Preferences",
        route: "ComingSoon",
      },
    ],
  },
  {
    title: "Community Settings",
    data: [
      {
        icon: <Feather name="users" size={18} />,
        label: "Friends & Social",
        route: "ComingSoon",
      },
      {
        icon: <Feather name="list" size={18} />,
        label: "Following List",
        route: "ComingSoon",
      },
    ],
  },
  {
    title: "Other",
    data: [
      {
        icon: <Feather name="help-circle" size={18} />,
        label: "FAQ",
        route: "ComingSoon",
      },
      {
        icon: <Ionicons name="chatbubbles-outline" size={18} />,
        label: "Help Center",
        route: "ComingSoon",
      },
      {
        icon: <SimpleLineIcons name="logout" color={'red'} size={18} />,
        label: <Text style={{color: 'red'}}>Log Out</Text>,
        route: "logout",
      },
    ],
  },
];

const SettingsScreen = () => {
  const navigation = useNavigation();
  const { user, logout } = useSignupStore();

  const renderItem = ({ item }) => {
    const handlePress = () => {
      if (item.route === "logout") {
        Alert.alert(
          "Log Out",
          "Are you sure you want to log out?",
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Log Out",
              onPress: () => {
                logout();
                navigation.replace("Login");
              },
              style: "destructive",
            },
          ]
        );
      } else {
        navigation.navigate(item.route);
      }
    };
    
  
    return (
      <TouchableOpacity style={styles.item} onPress={handlePress}>
        <View style={styles.itemIcon}>{item.icon}</View>
        <Text style={styles.itemText}>{item.label}</Text>
        {item.route !== "logout" && (
          <Feather name="chevron-right" size={18} color="#999" />
        )}
      </TouchableOpacity>
    );
  };
  

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={["#4E0605", "#A60506"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
          <Image
            source={require("../assets/icons/user.png")}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.name}>Hi, {user?.userName || 'User'}</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
                backgroundColor: COLORS.background,
                padding: 3,
                borderRadius: 15,
                paddingHorizontal: 10,
                width: 110,
                justifyContent: "space-between",
              }}
            >
              <MaterialCommunityIcons
                name="police-badge"
                color={"orange"}
                size={14}
              />
              <Text style={styles.email}>Not Verified</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
      
    >
      <Feather name="settings" size={24} color="#fff" />
    </TouchableOpacity>
      </LinearGradient>

      {/* Sections */}
      <FlatList
        data={sections}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{item.title}</Text>
            {item.data.map((d, i) => (
              <View key={i}>{renderItem({ item: d })}</View>
            ))}
          </View>
        )}
        ListFooterComponent={<View style={{ height: 100 }} />}
      />
      

    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingTop: 80,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    top: -18
  },
  avatar: {
    width: 65,
    height: 65,
    borderRadius: 50,
  },
  name: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 22,
    marginBottom: 5
  },
  email: {
    color: "orange",
    fontSize: 12,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  sectionTitle: {
    color: "#999",
    fontSize: 14,
    marginBottom: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  itemIcon: {
    width: 30,
    alignItems: "center",
  },
  itemText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    fontWeight: "500",
  },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 14,
    borderTopWidth: 1,
    borderColor: "#eee",
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",
  },
  logoutButton: {
    backgroundColor: '#d7d7d7',
    margin: 20,
    borderRadius: 8,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  logoutText: {
    color: '#555',
    fontWeight: '600',
    fontSize: 16,
  },
  
});
