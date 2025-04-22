import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import {
  Ionicons,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../constants/colors";

const sections = [
  {
    title: "Account Settings",
    data: [
      {
        icon: <Feather name="user" size={18} />,
        label: "Personal Information",
        route: "EditProfile",
      },
      {
        icon: <Feather name="lock" size={18} />,
        label: "Password & Security",
        route: "PasswordSecurity",
      },
      {
        icon: <Feather name="bell" size={18} />,
        label: "Notifications Preferences",
        route: "NotificationPreferences",
      },
    ],
  },
  {
    title: "Community Settings",
    data: [
      {
        icon: <Feather name="users" size={18} />,
        label: "Friends & Social",
        route: "FriendsSocial",
      },
      {
        icon: <Feather name="list" size={18} />,
        label: "Following List",
        route: "FollowingList",
      },
    ],
  },
  {
    title: "Other",
    data: [
      {
        icon: <Feather name="help-circle" size={18} />,
        label: "FAQ",
        route: "FAQ",
      },
      {
        icon: <Ionicons name="chatbubbles-outline" size={18} />,
        label: "Help Center",
        route: "HelpCenter",
      },
    ],
  },
];

const SettingsScreen = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate(item.route)}
    >
      <View style={styles.itemIcon}>{item.icon}</View>
      <Text style={styles.itemText}>{item.label}</Text>
      <Feather name="chevron-right" size={18} color="#999" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={["#520200", "#A60506"]}
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
            <Text style={styles.name}>Hi, Josiah</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
                backgroundColor: "#555",
                padding: 4,
                borderRadius: 15,
                paddingHorizontal: 5,
              }}
            >
              <MaterialCommunityIcons
                name="police-badge"
                color={"#fff"}
                size={14}
              />
              <Text style={styles.email}>Upgrade to Tier 3</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity>
          <Feather name="settings" size={26} color="#fff" />
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
    color: "#ddd",
    fontSize: 14,
    fontWeight: "600",
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
});
