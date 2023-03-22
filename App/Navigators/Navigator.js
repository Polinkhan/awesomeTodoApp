import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HeroScreen from "../Screens/HeroScreen";
import BottomNavigator from "./BottomNavigator";
import AddTaskScreen from "../Screens/AddTaskScreen";

const Navigator = () => {
  return (
    <NavigationContainer>
      {/* <StatusBar style="light" /> */}

      <RootNavigator />
    </NavigationContainer>
  );
};

const RootNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    >
      <Stack.Screen name="hero" component={HeroScreen} />
      <Stack.Screen name="bottom" component={BottomNavigator} />
      <Stack.Screen
        name="add"
        component={AddTaskScreen}
        options={{ animation: "slide_from_bottom" }}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
