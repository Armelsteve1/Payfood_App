import React from "react";
import { StyleSheet, useColorScheme } from "react-native";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "react-native-vector-icons";
import Home from "./src/screens/homepage";
import Panier from "./src/screens/panier";
import Profils from "./src/screens/profils";
import Scanne from "./src/screens/scanne";
import Wallet from "./src/screens/wallet";
const Tab = createBottomTabNavigator();

export default function App() {
  const colorScheme = useColorScheme();

  return (
    <NavigationContainer
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = "search";
            } else if (route.name === "Panier") {
              iconName = "shopping-cart";
            } else if (route.name === "Profils") {
              iconName = "user";
            } else if (route.name === "Scanne") {
              iconName = "qrcode";
            } else if (route.name === "Wallet") {
              iconName = "shopping-bag";
            }
            return <FontAwesome name={iconName} color={color} size={26} />;
          },
          tabBarActiveTintColor: "#FF3C6E",
          tabBarInactiveTintColor: "#565656",
          tabBarLabelStyle: {
            fontSize: 12,
          },
          tabBarStyle: {
            backgroundColor:
              colorScheme === "dark"
                ? darkTheme.colors.background
                : lightTheme.colors.background,
            borderTopWidth: 1,
            borderTopColor: darkTheme.colors.border,
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{ tabBarVisible: false }}
        />
        <Tab.Screen name="Panier" component={Panier} />
        <Tab.Screen name="Scanne" component={Scanne} />
        <Tab.Screen name="Wallet" component={Wallet} />
        <Tab.Screen name="Profils" component={Profils} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const darkTheme = {
  dark: true,
  colors: {
    primary: "#3498db",
    background: "#050A30",
    card: "#212121",
    text: "#fff",
    border: "#DADADA",
  },
};

const lightTheme = {
  dark: false,
  colors: {
    primary: "#3498db",
    background: "#F7F7F7",
    card: "#ffffff",
    text: "#000",
    border: "#DADADA",
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
});
