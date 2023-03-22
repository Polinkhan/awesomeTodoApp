import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { BoldText, RegularText } from "./Text";
import { SimpleLineIcons } from "@expo/vector-icons";

const dp = require("../assets/images/dp.png");
const ChatUserItem = ({ name }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image source={dp} style={styles.img} />
        <View>
          <BoldText style={{ fontSize: 18 }}>{name}</BoldText>
          <RegularText style={{ color: "gray" }}>your last message</RegularText>
        </View>
      </View>
      <RegularText style={{ color: "gray" }}>10 min ago</RegularText>
    </TouchableOpacity>
  );
};

export default ChatUserItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  img: {
    width: 50,
    height: 50,
    margin: 16,
    marginLeft: 0,
  },
});
