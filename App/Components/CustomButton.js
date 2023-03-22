import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import { BoldText, RegularText } from "./Text";

const CustomButton = (props) => {
  const { children, style, textStyle, ...event } = props;
  return (
    <TouchableOpacity style={[styles.background, { ...style }]} {...event}>
      <RegularText style={{ ...styles.Text, ...textStyle }}>
        {children}
      </RegularText>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#3787eb",
    padding: 16,
    borderRadius: 12,
  },
  Text: {
    fontSize: 16,
    textAlign: "center",
    color: "white",
    letterSpacing: 1,
  },
});
