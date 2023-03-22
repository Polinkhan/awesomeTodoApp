import { View, Text, StyleSheet, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import IconButton from "../../Components/IconButton";
import { Ionicons } from "@expo/vector-icons";
import { BoldText } from "../../Components/Text";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";

const CalendarScreen = () => {
  const [delayComplete, setDelayComplete] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setDelayComplete(true);
    }, 10);
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      {delayComplete && <CalendarComponent />}
    </View>
  );
};

const Header = () => {
  return (
    <View style={styles.header}>
      <IconButton>
        <Ionicons name="grid-outline" size={20} color={"gray"} />
      </IconButton>
      <BoldText style={{ fontSize: 20 }}>Check Schedule</BoldText>
      <IconButton>
        <Ionicons name="notifications-outline" size={20} color={"gray"} />
      </IconButton>
    </View>
  );
};

const CalendarComponent = () => {
  const [selectedDate, setSelectedDate] = useState();
  const today = new Date().toISOString().substring(0, 10);
  return (
    <View style={{ flex: 1 }}>
      <Calendar
        displayLoadingIndicator
        onDayPress={(e) => setSelectedDate(e.dateString)}
        markedDates={{
          [today]: { selected: true, selectedColor: "green" },
          [selectedDate]: { selected: true },
        }}
      />
      <BoldText style={{ textAlign: "center", margin: 20, fontSize: 18 }}>
        Schedule of ( {selectedDate} )
      </BoldText>
    </View>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight + 30,
    padding: 30,
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },
});
