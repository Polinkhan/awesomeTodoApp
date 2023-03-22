import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome, Ionicons, Octicons } from "@expo/vector-icons";
import { color } from "../Colors/color";
import { Colors } from "react-native/Libraries/NewAppScreen";
import HomeScreen from "../Screens/BottomTabScreens/HomeScreen";
import CalendarScreen from "../Screens/BottomTabScreens/CalendarScreen";
import ChatScreen from "../Screens/BottomTabScreens/ChatScreen";
import AccountPage from "../Screens/BottomTabScreens/AccountPage";
import AddTaskScreen from "../Screens/AddTaskScreen";

const BottomNavigator = ({ navigation }) => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { height: 70 },
        headerTitleAlign: "center",
        tabBarActiveTintColor: color.primary,
        tabBarHideOnKeyboard: true,
        // tabBarActiveBackgroundColor: "red",
      }}
    >
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={24}
              color={color}
            />
          ),
          tabBarButton: (props) => <TouchableOpacity {...props} />,
        }}
      />
      <Tab.Screen
        name="calendar"
        component={CalendarScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <FontAwesome name="calendar" size={20} color={color} />
          ),
          tabBarButton: (props) => <TouchableOpacity {...props} />,
        }}
      />
      <Tab.Screen
        name="add"
        component={AddTaskScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={"ios-add"} size={32} color="white" />
          ),
          tabBarIconStyle: {
            bottom: 25,
            width: 70,
            backgroundColor: color.primary,
            borderRadius: 999,
            borderWidth: 6,
            borderColor: "white",
          },
          tabBarButton: (props) => <TouchableOpacity {...props} />,
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("add");
          },
        }}
      />
      <Tab.Screen
        name="chat"
        component={ChatScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "chatbox" : "chatbox-outline"}
              size={24}
              color={color}
            />
          ),
          tabBarButton: (props) => <TouchableOpacity {...props} />,
        }}
      />
      <Tab.Screen
        name="account"
        component={AccountPage}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Octicons
              name={focused ? "person-fill" : "person"}
              size={24}
              color={color}
            />
          ),
          tabBarButton: (props) => <TouchableOpacity {...props} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
