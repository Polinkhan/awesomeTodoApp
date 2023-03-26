import { View, Text, Image } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import { StatusBar } from "react-native";
import IconButton from "../../Components/IconButton";
import { BoldText, RegularText } from "../../Components/Text";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import MenuItem from "../../Components/MenuItem";
import { color } from "../../Colors/color";
import useGoogleSignIn from "../../Hooks/useGoogleSignIn";
import { useNavigation } from "@react-navigation/native";

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
  const { CurrentUser } = useGoogleSignIn();

  return (
    CurrentUser && (
      <View style={{ flex: 1, alignItems: "center" }}>
        <View style={styles.imgBox}>
          <Image
            source={{ uri: CurrentUser.photoURL }}
            resizeMode={"contain"}
            style={styles.img}
          />
          <View style={styles.floatingIcon}>
            <MaterialIcons name="edit" size={24} color={color.primary} />
          </View>
        </View>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <BoldText style={{ fontSize: 20 }}>
            {CurrentUser.displayName}
          </BoldText>
        </View>
      </View>
    )
  );
};
const MenuBox = () => {
  const { GoogleSignOut } = useGoogleSignIn();
  const navigation = useNavigation();

  const Data = [
    {
      img: require("../../assets/images/edit.png"),
      name: "See Profile",
      onPress: () => navigation.navigate("profile"),
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
      onPress: () => navigation.navigate("settings"),
    },
    {
      img: require("../../assets/images/logout.png"),
      name: "Logout",
      onPress: GoogleSignOut,
    },
  ];

  return (
    <View style={{ flex: 2, padding: 10 }}>
      {Data.map((item, i) => (
        <MenuItem key={i} item={item} onPress={item.onPress} />
      ))}
    </View>
  );
};

export default AccountPage;

const styles = StyleSheet.create({
  container: {
    // paddingTop: StatusBar.currentHeight + 30,
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
    width: 120,
    height: 120,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 999,
    borderWidth: 1,
    borderColor: color.primary,
  },
  img: {
    // flex: 1,
    width: 100,
    height: 100,
    borderRadius: 999,
  },
  floatingIcon: {
    position: "absolute",
    bottom: 5,
    right: 0,
    backgroundColor: "#ecf4fd",
    padding: 8,
    borderRadius: 999,
  },
});
