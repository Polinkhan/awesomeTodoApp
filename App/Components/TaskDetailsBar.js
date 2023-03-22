import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import IconButton from "./IconButton";
import { RegularText } from "./Text";
import { SimpleLineIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const TaskDetailsBar = (props) => {
  const { style, ...event } = props;
  return (
    <TouchableOpacity style={[styles.container, { ...style }]} {...event}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ paddingRight: 20 }}>
            <IconButton>
              <FontAwesome name="connectdevelop" size={20} color="black" />
            </IconButton>
          </View>
          <View>
            <RegularText style={{ fontSize: 16, marginBottom: 5 }}>
              Task Title
            </RegularText>
            <RegularText style={{ fontSize: 12, color: "gray" }}>
              Task Schedule
            </RegularText>
          </View>
        </View>
        <View style={{ justify: "flex-end" }}>
          <SimpleLineIcons name="arrow-right" size={16} color="gray" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TaskDetailsBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
    marginBottom: 20,
    elevation: 1,
    borderRadius: 12,
  },
});
