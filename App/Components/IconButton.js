import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

const IconButton = (props) => {
  const { children, style, ...event } = props;
  return (
    <TouchableOpacity style={[styles.background, { ...style }]} {...event}>
      {children}
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#f2f2f2",
    padding: 14,
    borderRadius: 10,
  },
});
