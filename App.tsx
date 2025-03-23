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

SplashScreen.preventAutoHideAsync(); // Prevent splash screen from auto-hiding

// Define stack navigator
const Stack = createStackNavigator();

export default function App() {
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
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="AddBank" component={AddBank} />
          <Stack.Screen name="BottomTab" component={BottomTab} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="ConfirmationCode" component={ConfirmationCode} />
          <Stack.Screen name="AddName" component={AddName} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="EmailVerify" component={EmailVerify} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
