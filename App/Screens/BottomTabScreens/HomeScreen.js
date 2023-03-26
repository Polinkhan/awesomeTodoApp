import { View, ScrollView, Button } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { StatusBar } from "react-native";
import { StyleSheet } from "react-native";
import IconButton from "../../Components/IconButton";
import { Ionicons } from "@expo/vector-icons";
import { BoldText, RegularText } from "../../Components/Text";
import { LinearGradient } from "expo-linear-gradient";
import CustomProgressBar from "../../Components/CustomProgressBar";
import TaskDetailsBar from "../../Components/TaskDetailsBar";
import useFirebaseFirestore from "../../Hooks/useFirebaseFirestore";
import { SheetManager, SheetProvider } from "react-native-actions-sheet";
import "../../Components/ActionSheet/sheets";

const HomeScreen = ({ navigation }) => {
  return (
    <SheetProvider>
      <LinearGradient
        colors={["#ffffff", "#f2f2f2"]}
        style={{ flex: 1 }}
        end={{ x: 0, y: 1 }}
      >
        <View style={styles.container}>
          <Header />
          <Summery />
          <Task navigation={navigation} />
        </View>
      </LinearGradient>
    </SheetProvider>
  );
};

const Header = () => {
  return (
    <View style={styles.header}>
      <IconButton>
        <Ionicons name="grid-outline" size={20} color={"gray"} />
      </IconButton>
      <BoldText style={{ fontSize: 20 }}>Home Page</BoldText>
      <IconButton>
        <Ionicons name="notifications-outline" size={20} color={"gray"} />
      </IconButton>
    </View>
  );
};

const Summery = () => {
  return (
    <LinearGradient
      colors={["#4cc0ee", "#1464c7"]}
      style={styles.summery}
      end={{ x: 1, y: 1 }}
    >
      <RegularText style={{ color: "white", fontSize: 18 }}>
        Today's progess summery
      </RegularText>
      <RegularText style={{ color: "white" }}>15 Task</RegularText>
      <View
        style={{ flexDirection: "row", marginTop: 20, alignItems: "center" }}
      >
        <View style={{ flex: 1, paddingRight: 20 }}>
          <IconButton></IconButton>
        </View>
        <View style={{ flex: 1, paddingLeft: 20 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 6,
              paddingHorizontal: 2,
            }}
          >
            <RegularText style={{ color: "white" }}>Progess</RegularText>
            <RegularText style={{ color: "white" }}>40%</RegularText>
          </View>
          <CustomProgressBar state={40} />
        </View>
      </View>
    </LinearGradient>
  );
};

const Task = ({ navigation }) => {
  const { Tasks } = useFirebaseFirestore();
  const OnLongPress = (task) => {
    SheetManager.show("option", { payload: task });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <BoldText style={{ fontSize: 24 }}>Today's Task</BoldText>
        <RegularText style={{ fontSize: 16, color: "gray" }}>
          See All
        </RegularText>
      </View>
      <View style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {Tasks.map((task, i) => (
            <TaskDetailsBar
              key={i}
              data={task}
              onPress={() => navigation.navigate("taskDetails", { data: task })}
              onLongPress={() => OnLongPress(task)}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    // paddingTop: StatusBar.currentHeight + 30,
    padding: 30,
    paddingBottom: 0,
    flex: 1,
    // backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  summery: {
    padding: 25,
    borderRadius: 16,
    marginBottom: 30,
  },
});
