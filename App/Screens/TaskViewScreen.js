import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import IconButton from "../Components/IconButton";
import { Ionicons } from "@expo/vector-icons";
import { BoldText, RegularText } from "../Components/Text";
import { LinearGradient } from "expo-linear-gradient";

const TaskViewScreen = ({ route }) => {
  const { data } = route.params;
  return (
    <LinearGradient
      colors={["#ffffff", "#f2f2f2"]}
      style={{ flex: 1 }}
      end={{ x: 0, y: 1 }}
    >
      <View style={styles.container}>
        <Header />
        <Body data={data} />
        <TimeInterval time={data?.time} date={data?.date} />
      </View>
    </LinearGradient>
  );
};

const Header = () => {
  return (
    <View style={styles.header}>
      <IconButton>
        <Ionicons name="grid-outline" size={20} color={"gray"} />
      </IconButton>
      <BoldText style={{ fontSize: 20 }}>Task Details</BoldText>
      <IconButton>
        <Ionicons name="notifications-outline" size={20} color={"gray"} />
      </IconButton>
    </View>
  );
};

const Body = ({ data }) => {
  const { taskName, date, category, description, time, created } = data;
  const toDate = `${new Date(date).toDateString()}, at ${new Date(
    time?.start
  ).toLocaleTimeString()}`;

  const toTime = `${new Date(time?.start).toLocaleTimeString()} - ${new Date(
    time?.end
  ).toLocaleTimeString()}`;

  const workHour = `${(time.end - time.start) / 3600000} hour`;

  return (
    <View style={styles.body}>
      <BoldText style={{ fontSize: 32 }}>{category}</BoldText>
      <View
        style={{
          marginTop: 20,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <IconButton style={{ padding: 8, borderRadius: 999 }}>
          <Ionicons name="notifications-outline" size={20} color={"gray"} />
        </IconButton>
        <RegularText style={{ marginLeft: 20, fontSize: 20, color: "gray" }}>
          {toDate}
        </RegularText>
      </View>
      <View style={{ marginTop: 20 }}>
        <BoldText style={{ fontSize: 28 }}>Task Overview</BoldText>
        <TaskItem label={"Name"} value={taskName} />
        <TaskItem label={"Date"} value={new Date(date).toLocaleDateString()} />
        <TaskItem label={"Work Hour"} value={workHour} />
        <TaskItem label={"Time"} value={toTime} />
        <TaskItem
          label={"Task Created"}
          value={new Date(created).toLocaleTimeString()}
        />
        <TaskItem label={"Description"} value={description} />
      </View>
    </View>
  );
};

const TaskItem = ({ label, value }) => {
  return (
    <View style={{ marginTop: 16, flexDirection: "row" }}>
      <RegularText style={{ flex: 5, fontSize: 18 }}>{label}</RegularText>
      <RegularText style={{ flex: 1, fontSize: 18 }}>:</RegularText>
      <RegularText style={{ flex: 10, fontSize: 18, color: "gray" }}>
        {value || "Not Defined"}
      </RegularText>
    </View>
  );
};

const TimeInterval = ({ time }) => {
  const [timeOut, setTimeOut] = useState(
    "........................................"
  );

  const toRealTime = (ms, runTime) => {
    const Day = parseInt(ms / 86400000);
    ms -= Day * 86400000;
    const Hour = parseInt(ms / 3600000);
    ms -= Hour * 3600000;
    const Min = parseInt(ms / 60000);
    ms -= Min * 60000;
    const Sec = parseInt(ms / 1000);
    ms -= Sec * 1000;

    if (runTime) return `${Hour}h ${Min}m ${Sec}s`;
    return `${Day}d ${Hour}h ${Min}m ${Sec}s left`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const isStarted = time?.start < new Date().getTime();
      let timeString;
      if (isStarted) {
        if (time?.end > new Date().getTime()) {
          const runTime = toRealTime(new Date().getTime() - time?.start, true);
          timeString = `Task Running (${runTime})`;
        } else timeString = "Task Ended";
      } else {
        timeString = toRealTime(time?.start - new Date().getTime());
      }
      setTimeOut(timeString);
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  return (
    <View
      style={{
        height: 150,
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
        padding: 10,
        marginBottom: 40,
      }}
    >
      <View
        style={{
          flex: 2,
          width: "100%",
          alignItems: "center",
          borderRadius: 12,
          justifyContent: "center",
          elevation: 1,
          backgroundColor: "white",
        }}
      >
        <BoldText style={{ fontSize: 24 }}>Status</BoldText>
      </View>
      <View style={{ flex: 1 }} />
      <View
        style={{
          flex: 2,
          width: "100%",
          alignItems: "center",
          borderRadius: 12,
          justifyContent: "center",
          elevation: 1,
          backgroundColor: "white",
        }}
      >
        <RegularText style={{ fontSize: 24, color: "gray" }}>
          {timeOut}
        </RegularText>
      </View>
    </View>
  );
};

export default TaskViewScreen;

const styles = StyleSheet.create({
  container: {
    // paddingTop: StatusBar.currentHeight + 30,
    padding: 30,
    paddingBottom: 0,
    flex: 1,
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  body: {
    flex: 1,
    // backgroundColor: "red",
    marginBottom: 30,
    // justifyContent: "space-between",
  },
});
