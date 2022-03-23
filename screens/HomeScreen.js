import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { auth } from "../utils/firebase";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from "./MainScreen";
import EachItemDescription from "./EachItemDescription";

const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    auth.onAuthStateChanged((u) => {
      if (!u) {
        navigation.replace("Login");
      } else {
        setUser(u);
      }
    });
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        options={{ headerShown: false }}
        component={MainScreen}
      />
      <Stack.Screen
        name="Item"
        options={{ headerShown: false }}
        component={EachItemDescription}
      />
    </Stack.Navigator>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {},
});
