import React, { useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, StyleSheet } from "react-native";
import COLORS from "./constants/colors";
import FONTS from "./constants/fonts";
import WelcomeScreen from "./screens/WelcomeScreen";
import HomeScreen from "./screens/HomeScreen";
import Signup from "./screens/Signup";
import ConfirmationCode from "./screens/ConfirmationCode";
import AddBank from "./screens/AddBank";
import { StatusBar } from "expo-status-bar";
import AddName from "./screens/AddName";
import BottomTab from "./components/BottomTab";
import Login from "./screens/Login";
import EmailVerify from "./screens/EmailVerify";
import ProfileSetup from "./screens/ProfileSetup";
import SendToBank from "./screens/SendToBank";
import BankTransfer from "./screens/BankTransfer";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SetTransactionPin from "./screens/SetTransactionPin";
import VerifyTransactionPin from "./screens/VerifyTransactionPin";
import SuccessScreen from "./screens/SuccessScreen";
import ForgotPassword from "./screens/ForgotPassword";
import ChangePassword from "./screens/ChangePassword";
import Notifications from "./screens/Notifications";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import ComingSoon from "./screens/ComingSoon";
import Toast from 'react-native-toast-message';

// import EditProfile from "./screens/EditProfile";

SplashScreen.preventAutoHideAsync(); // Prevent splash screen from auto-hiding

// Define stack navigator
const Stack = createStackNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState(null);
  const [fontsLoaded] = useFonts({
    [FONTS.regular]: require("./assets/fonts/Poppins-Regular.ttf"),
    [FONTS.bold]: require("./assets/fonts/Poppins-Bold.ttf"),
    [FONTS.italic]: require("./assets/fonts/Poppins-Italic.ttf"),
    [FONTS.medium]: require("./assets/fonts/Poppins-Medium.ttf"),
    [FONTS.semiBold]: require("./assets/fonts/Poppins-SemiBold.ttf"),
  });
  

  const onLayout = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container} onLayout={onLayout}>
      <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="BottomTab" component={BottomTab} />
          <Stack.Screen name="AddBank" component={AddBank} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="ConfirmationCode" component={ConfirmationCode} />
          <Stack.Screen name="AddName" component={AddName} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="EmailVerify" component={EmailVerify} />
          <Stack.Screen name="ProfileSetup" component={ProfileSetup} />
          <Stack.Screen name="SendToBank" component={SendToBank} />
          <Stack.Screen name="BankTransfer" component={BankTransfer} />
          <Stack.Screen name="SetTransactionPin" component={SetTransactionPin} />
          <Stack.Screen name="VerifyTransactionPin" component={VerifyTransactionPin} />
          <Stack.Screen name="Success" component={SuccessScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>
          <Stack.Screen name="ChangePassword" component={ChangePassword}/>
          <Stack.Screen name="Notifications" component={Notifications} />
          <Stack.Screen name="ComingSoon" component={ComingSoon} />
          {/* <Stack.Screen name="EditProfile" component={EditProfile} /> */}
        </Stack.Navigator>
        <Toast />

      </NavigationContainer>
      </GestureHandlerRootView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
