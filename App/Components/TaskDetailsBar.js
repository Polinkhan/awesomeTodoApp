import { View, StyleSheet, TouchableNativeFeedback } from "react-native";
import React from "react";
import IconButton from "./IconButton";
import { RegularText } from "./Text";
import { SimpleLineIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { color } from "../Colors/color";

const TaskDetailsBar = (props) => {
  const { data, style, ...event } = props;
  const { taskName, time } = data;
  const Start = new Date(time?.start).toLocaleTimeString();
  const End = new Date(time?.end).toLocaleTimeString();
  return (
    <View
      style={[
        {
          borderRadius: 12,
          overflow: "hidden",
          marginBottom: 20,
          elevation: 1,
        },
        { ...style },
      ]}
    >
      <TouchableNativeFeedback
        {...event}
        background={TouchableNativeFeedback.Ripple("#dddddd", false)}
      >
        <View style={styles.container}>
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
                  {taskName}
                </RegularText>
                <RegularText style={{ fontSize: 12, color: "gray" }}>
                  {`${Start} - ${End}`}
                </RegularText>
              </View>
            </View>
            <View style={{ justify: "flex-end" }}>
              <SimpleLineIcons name="arrow-right" size={16} color="gray" />
            </View>
          </View>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

export default TaskDetailsBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
    elevation: 1,
  },
});
