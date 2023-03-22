import { View, Text, Image } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import { StatusBar } from "react-native";
import IconButton from "../../Components/IconButton";
import { BoldText, RegularText } from "../../Components/Text";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import MenuItem from "../../Components/MenuItem";
import { color } from "../../Colors/color";

const dp = require("../../assets/images/dp.png");

const AccountPage = () => {
  return (
    <View style={styles.container}>
      <Header />
      <ImageBox />
      <MenuBox />
    </View>
  );
};

const Header = () => {
  return (
    <View style={styles.header}>
      <IconButton>
        <Ionicons name="grid-outline" size={20} color={"gray"} />
      </IconButton>
      <BoldText style={{ fontSize: 20 }}>Profile</BoldText>
      <IconButton>
        <Ionicons name="notifications-outline" size={20} color={"gray"} />
      </IconButton>
    </View>
  );
};

const ImageBox = () => {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <View style={styles.imgBox}>
        <Image source={dp} resizeMode={"contain"} style={styles.img} />
        <View style={styles.floatingIcon}>
          <MaterialIcons name="edit" size={24} color={color.primary} />
        </View>
      </View>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <BoldText style={{ fontSize: 20 }}>Abu Sayed Polin</BoldText>
      </View>
    </View>
  );
};
const MenuBox = () => {
  return (
    <View style={{ flex: 2, padding: 10 }}>
      {Data.map((item, i) => (
        <MenuItem key={i} item={item} />
      ))}
    </View>
  );
};

export default AccountPage;

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
    marginBottom: 30,
  },
  imgBox: {
    width: 150,
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color.primary,
    borderRadius: 999,
  },
  img: {
    flex: 1,
    width: 147,
    minHeight: 147,
    borderWidth: 10,
    borderColor: "white",
    margin: 15,
    borderRadius: 999,
  },
  floatingIcon: {
    position: "absolute",
    bottom: 10,
    right: 5,
    backgroundColor: "#ecf4fd",
    padding: 8,
    borderRadius: 999,
  },
});

const Data = [
  {
    img: require("../../assets/images/edit.png"),
    name: "Edit Profile",
  },
  {
    img: require("../../assets/images/lock.png"),
    name: "Change Password",
  },
  {
    img: require("../../assets/images/location.png"),
    name: "Location",
  },
  {
    img: require("../../assets/images/notification.png"),
    name: "Notification",
  },
  {
    img: require("../../assets/images/settings.png"),
    name: "Settings",
  },
  {
    img: require("../../assets/images/logout.png"),
    name: "Logout",
  },
];
