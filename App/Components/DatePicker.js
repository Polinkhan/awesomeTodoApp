import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { BoldText, RegularText } from "../Components/Text";
import DateTimePicker from "@react-native-community/datetimepicker";
import Required from "./Required";

const DatePicker = ({ date, setDate, setTime }) => {
  const [show, setShow] = useState(false);
  const toDate = date
    ? new Date(date).toISOString().substring(0, 10)
    : "Select Date";
  const OnChange = (e) => {
    setShow(false);
    setDate(e.nativeEvent.timestamp);
    setTime({ start: null, end: null });
  };

  return (
    <View style={{ marginBottom: 30 }}>
      <BoldText style={{ fontSize: 18 }}>
        Date & Time
        <Required />
      </BoldText>
      <TouchableOpacity
        style={styles.CustomButton}
        onPress={() => setShow(true)}
      >
        <View style={styles.PickerBox}>
          <RegularText style={{ color: "gray" }}>{toDate}</RegularText>
          <FontAwesome name="calendar" size={20} color="gray" />
        </View>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          minimumDate={new Date()}
          mode="date"
          value={new Date(date)}
          onChange={OnChange}
        />
      )}
    </View>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  CustomButton: {
    borderWidth: 1,
    padding: 16,
    borderRadius: 12,
    borderColor: "#dddddd",
    marginTop: 12,
  },

  PickerBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
