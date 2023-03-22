import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  ScrollView,
  Switch,
} from "react-native";
import React, { useState } from "react";
import IconButton from "../../Components/IconButton";
import { Ionicons } from "@expo/vector-icons";
import { BoldText } from "../../Components/Text";
import CustomInput from "../../Components/CustomInput";
import ChatUserItem from "../../Components/ChatUserItem";
import { color } from "../../Colors/color";

const ChatScreen = () => {
  return (
    <View style={styles.container}>
      <Header />
      <CustomInput placeholder={"Search ..."} style={{ marginBottom: 30 }} />
      <ChatUsers />
    </View>
  );
};

const Header = () => {
  return (
    <View style={styles.header}>
      <IconButton>
        <Ionicons name="grid-outline" size={20} color={"gray"} />
      </IconButton>
      <BoldText style={{ fontSize: 20 }}>Inbox</BoldText>
      <IconButton>
        <Ionicons name="notifications-outline" size={20} color={"gray"} />
      </IconButton>
    </View>
  );
};

const ChatUsers = () => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ChatUserItem name={"Polin Khan"} />
        <ChatUserItem name={"Mahbub Alam"} />
        <ChatUserItem name={"Rakib Hassan"} />
        <ChatUserItem name={"Nirob Hassan"} />
        <ChatUserItem name={"Farhan Mahmud"} />
        <ChatUserItem name={"Rakiba Akter"} />
        <ChatUserItem name={"Polin Khan"} />
        <ChatUserItem name={"Mahbub Alam"} />
        <ChatUserItem name={"Rakib Hassan"} />
        <ChatUserItem name={"Nirob Hassan"} />
        <ChatUserItem name={"Farhan Mahmud"} />
        <ChatUserItem name={"Rakiba Akter"} />
      </ScrollView>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight + 30,
    padding: 30,
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});
