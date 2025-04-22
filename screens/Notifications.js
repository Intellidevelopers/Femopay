import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SectionList,
  Image,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import COLORS from "../constants/colors";
import { StatusBar } from "expo-status-bar";

const initialNotifications = [
  {
    id: "1",
    avatar: "https://i.pravatar.cc/100?img=1",
    message:
      "Your recent transaction of $570.00 at Pizzapoint has been successfully completed.",
    time: "10m ago",
    section: "Today",
    unread: true,
  },
  {
    id: "2",
    avatar: "https://i.pravatar.cc/100?img=2",
    message: "John requested a payment of $50.00",
    time: "9:33 AM",
    section: "Today",
    action: "Pay",
    unread: true,
  },
  {
    id: "3",
    avatar: "https://i.pravatar.cc/100?img=3",
    message:
      "Your recent transaction of $230.00 at Chaishai has been successfully completed.",
    time: "8:10 AM",
    section: "Today",
    unread: false,
  },
  {
    id: "4",
    avatar: "https://i.pravatar.cc/100?img=4",
    message: "Your new credit card ending in 2688 has been successfully activated.",
    time: "7:43 PM",
    section: "Yesterday",
    unread: true,
  },
  {
    id: "5",
    avatar: "https://i.pravatar.cc/100?img=5",
    message: "Exclusive offer for you! Get 1% cashback on your HDFC credit card.",
    time: "Apr 26, 2024 at 9:05 AM",
    section: "This Week",
    unread: false,
  },
];

const Notifications = ({ navigation }) => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const handleDelete = (id) => {
    setNotifications(notifications.filter((item) => item.id !== id));
  };

  const handleMarkAllRead = () => {
    const updated = notifications.map((item) => ({ ...item, unread: false }));
    setNotifications(updated);
  };

  const renderRightActions = (item) => (
    <TouchableOpacity
      onPress={() => handleDelete(item.id)}
      style={styles.deleteButton}
    >
      <Ionicons name="trash-outline" size={24} color="#fff" />
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <Swipeable renderRightActions={() => renderRightActions(item)}>
      <View
        style={[
          styles.notificationContainer,
          item.unread && { backgroundColor: "#FFDEDE" },
        ]}
      >
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View style={{ flex: 1 }}>
          <Text style={styles.notificationText}>{item.message}</Text>
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
        {item.action && (
          <TouchableOpacity style={styles.payButton}>
            <Text style={styles.payText}>{item.action}</Text>
          </TouchableOpacity>
        )}
      </View>
    </Swipeable>
  );

  const groupedSections = () => {
    const grouped = {};
    notifications.forEach((item) => {
      if (!grouped[item.section]) grouped[item.section] = [];
      grouped[item.section].push(item);
    });
    return Object.keys(grouped).map((key) => ({
      title: key,
      data: grouped[key],
    }));
  };

  if (notifications.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Image
          source={require("../assets/notification.gif")}
          style={styles.emptyIcon}
          resizeMode="contain"
        />
        <Text style={styles.emptyTitle}>No Notification to show</Text>
        <Text style={styles.emptySubtitle}>
          You currently have no notifications. We will notify you when something new happens!
        </Text>
        <StatusBar style="dark" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#f9f9f9" }}>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="left" size={20} />
          </TouchableOpacity>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Notifications</Text>
        </View>
        <TouchableOpacity
            style={styles.markReadButton}
            onPress={handleMarkAllRead}
          >
            <Text style={styles.markReadText}>Mark all as read</Text>
          </TouchableOpacity>
      </View>

      <SectionList
        sections={groupedSections()}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
      />
      <StatusBar style="dark" />
    </View>
  );
};

const styles = StyleSheet.create({
  notificationContainer: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: "#eee",
    alignItems: "center",
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 50,
    marginRight: 12,
  },
  notificationText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "500",
  },
  timeText: {
    color: "#999",
    fontSize: 12,
    marginTop: 4,
  },
  payButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  payText: {
    color: "#fff",
    fontWeight: "600",
  },
  deleteButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: "100%",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FBFBFB",
  },
  emptyIcon: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3B28CC",
  },
  emptySubtitle: {
    textAlign: "center",
    color: "#888",
    marginVertical: 10,
  },
  markReadButton: {
    alignItems: "center",
  },
  markReadText: {
    color: "#3B28CC",
    fontWeight: "bold",
  },
  header: {
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 5,
    borderBottomColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 60,
  },
  sectionHeader: {
    backgroundColor: "#f1f1f1",
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontWeight: "700",
    color: "#666",
    fontSize: 13,
  },
});

export default Notifications;