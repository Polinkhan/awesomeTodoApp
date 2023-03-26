import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HeroScreen from "../Screens/HeroScreen";
import BottomNavigator from "./BottomNavigator";
import AddTaskScreen from "../Screens/AddTaskScreen";
import useGoogleSignIn from "../Hooks/useGoogleSignIn";
import { useColorScheme } from "react-native";
import TaskViewScreen from "../Screens/TaskViewScreen";

const Navigator = () => {
  return (
    <NavigationContainer>
      {/* <StatusBar style="light" /> */}

      <RootNavigator />
    </NavigationContainer>
  );
};

const RootNavigator = () => {
  const { CurrentUser } = useGoogleSignIn();
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    >
      {CurrentUser ? (
        <>
          <Stack.Screen name="bottom" component={BottomNavigator} />
          <Stack.Screen
            name="add"
            component={AddTaskScreen}
            options={{ animation: "fade_from_bottom" }}
          />
          <Stack.Screen
            name="taskDetails"
            component={TaskViewScreen}
            options={{ animation: "slide_from_right" }}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="hero" component={HeroScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default Navigator;
