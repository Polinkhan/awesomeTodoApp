import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";

const CustomInput = (props) => {
  const { style, ...event } = props;
  return (
    <TextInput
      underlineColorAndroid="transparent"
      style={[styles.input, { ...style }]}
      {...event}
    />
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    borderColor: "#dddddd",
    fontFamily: "Pop",
    marginTop: 10,
  },
});
