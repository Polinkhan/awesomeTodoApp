import { StyleSheet, ToastAndroid, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { BoldText, RegularText } from "../Components/Text";
import DateTimePicker from "@react-native-community/datetimepicker";
import Required from "../Components/Required";

const TimePicker = ({ title, label, time, date, setTime }) => {
  const [show, setShow] = useState(false);
  const toTime = time ? new Date(time).toLocaleTimeString() : "Set Time";
  const OnChange = (e) => {
    setShow(false);
    const time = e.nativeEvent.timestamp;
    const ms = e.nativeEvent.timestamp % 60000;
    const newTime = time - ms;
    setTime((prev) => ({ ...prev, [label]: newTime }));
  };

  return (
    <View style={{ flex: 0.47 }}>
      <BoldText style={{ fontSize: 18 }}>
        {title}
        <Required />
      </BoldText>
      <TouchableOpacity
        style={[styles.CustomButton, { marginTop: 4 }]}
        onPress={() => {
          date
            ? setShow(true)
            : ToastAndroid.show("Select Date First", ToastAndroid.SHORT);
        }}
      >
        <View style={styles.PickerBox}>
          <RegularText style={{ color: "gray" }}>{toTime}</RegularText>
          <Entypo name="chevron-thin-down" size={16} color="gray" />
        </View>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          minimumDate={date}
          mode="time"
          value={new Date(date)}
          onChange={OnChange}
        />
      )}
    </View>
  );
};

export default TimePicker;

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
