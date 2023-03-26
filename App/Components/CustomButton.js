import {
  ActivityIndicator,
  StyleSheet,
  TouchableNativeFeedback,
  View,
} from "react-native";
import React from "react";
import { BoldText, RegularText } from "./Text";

const CustomButton = (props) => {
  const { children, style, textStyle, isLoading, isLoadingText, ...event } =
    props;
  return (
    <TouchableNativeFeedback
      {...event}
      disabled={isLoading}
      background={TouchableNativeFeedback.Ripple("#ffffff", false)}
    >
      <View style={[styles.background, { ...style }]}>
        {isLoading ? (
          <>
            <ActivityIndicator color={"white"} />
            <RegularText style={{ ...styles.Text, marginLeft: 10 }}>
              {isLoadingText}
            </RegularText>
          </>
        ) : (
          <>
            <RegularText style={{ ...styles.Text, ...textStyle }}>
              {children}
            </RegularText>
          </>
        )}
      </View>
    </TouchableNativeFeedback>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  background: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 45,
    backgroundColor: "#3787eb",
    paddingHorizontal: 20,
    borderRadius: 12,
    elevation: 5,
  },
  Text: {
    fontSize: 16,
    textAlign: "center",
    color: "white",
    letterSpacing: 1,
  },
});
