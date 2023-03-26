import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Switch,
} from "react-native";
import React, { useState } from "react";
import { RegularText } from "./Text";
import { SimpleLineIcons } from "@expo/vector-icons";
import { color } from "../Colors/color";

const MenuItem = (props) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const { item, ...event } = props;

  if (item.name === "Location" || item.name === "Notification") {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.container} onPress={toggleSwitch}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image source={item.img} style={styles.img} />
            <RegularText style={{ fontSize: 18 }}>{item.name}</RegularText>
          </View>
        </TouchableOpacity>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#ffffff" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    );
  }

  return (
    <TouchableOpacity style={styles.container} {...event}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image source={item.img} style={styles.img} />
        <RegularText style={{ fontSize: 18 }}>{item.name}</RegularText>
      </View>
      <SimpleLineIcons name="arrow-right" size={16} color="gray" />
    </TouchableOpacity>
  );
};

export default MenuItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  img: {
    width: 35,
    height: 35,
    margin: 16,
    marginLeft: 0,
  },
});
