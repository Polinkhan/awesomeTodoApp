import { View, Text, StyleSheet } from "react-native";
import React from "react";

const CustomProgressBar = ({ state }) => {
  return (
    <View style={styles.background}>
      <View style={[styles.bar, { width: `${state}%` }]} />
    </View>
  );
};

export default CustomProgressBar;

const styles = StyleSheet.create({
  background: {
    height: 8,
    backgroundColor: "#79ace2",
    borderRadius: 999,
  },
  bar: {
    height: 8,
    backgroundColor: "#f2f2f2",
    borderRadius: 999,
  },
});
