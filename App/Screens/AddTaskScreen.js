import {
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import IconButton from "../Components/IconButton";
import { Entypo, FontAwesome, SimpleLineIcons } from "@expo/vector-icons";
import { BoldText, RegularText } from "../Components/Text";
import CustomInput from "../Components/CustomInput";
import CustomButton from "../Components/CustomButton";
import DateTimePicker from "@react-native-community/datetimepicker";

const AddTaskScreen = ({ navigation }) => {
  const [taskName, setTaskName] = useState();
  const [category, setCategory] = useState(0);
  const [date, setDate] = useState();
  const [time, setTime] = useState({ start: undefined, end: undefined });
  const [description, setDescription] = useState();

  const handleSubmit = () => {
    console.log({
      taskName,
      category: Data[category].name,
      date,
      time,
      description,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header navigation={navigation} />
        <TaskName setTaskName={setTaskName} />
        <TaskSelect category={category} setCategory={setCategory} />
        <DatePicker date={date} setDate={setDate} />
        <View style={styles.TimePickerContainer}>
          <TimePicker
            title={"Start Time"}
            label={"start"}
            time={time.start || "Set Time"}
            setTime={setTime}
          />
          <TimePicker
            title={"End Time"}
            label={"end"}
            time={time.end || "Set Time"}
            setTime={setTime}
          />
        </View>
        <Description setDescription={setDescription} />
        <CustomButton onPress={handleSubmit}>Create Task</CustomButton>
      </ScrollView>
    </View>
  );
};

const Header = ({ navigation }) => {
  return (
    <View style={styles.header}>
      <IconButton onPress={() => navigation.goBack()}>
        <SimpleLineIcons name="arrow-left" size={16} color="gray" />
      </IconButton>
      <BoldText style={{ fontSize: 20, alignSelf: "center" }}>
        Create New Task
      </BoldText>
      <IconButton onPress={() => navigation.goBack()}>
        <SimpleLineIcons name="refresh" size={16} color="gray" />
      </IconButton>
    </View>
  );
};

const TaskName = ({ setTaskName }) => {
  return (
    <View style={{ marginBottom: 30 }}>
      <BoldText style={{ fontSize: 18 }}>Task Name</BoldText>
      <CustomInput
        placeholder={"Name"}
        onChangeText={(txt) => setTaskName(txt)}
      />
    </View>
  );
};

const TaskSelect = ({ category, setCategory }) => {
  return (
    <View style={{ marginBottom: 30 }}>
      <BoldText style={{ fontSize: 18 }}>Category</BoldText>
      <View
        style={{
          marginTop: 20,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Entypo
          name="chevron-thin-left"
          size={20}
          color="gray"
          style={{ paddingRight: 10 }}
        />
        <FlatList
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "center",
          }}
          showsHorizontalScrollIndicator={false}
          data={Data}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CustomButton
              style={{
                paddingVertical: 12,
                backgroundColor: category === item.id ? "#3787eb" : "#eeeeee",
                marginLeft: item.id && 16,
              }}
              textStyle={{ color: category === item.id ? "white" : "black" }}
              onPress={() => setCategory(item.id)}
            >
              {item.name}
            </CustomButton>
          )}
        />
        <Entypo
          name="chevron-thin-right"
          size={20}
          color="gray"
          style={{ paddingLeft: 10 }}
        />
      </View>
    </View>
  );
};

const DatePicker = ({ date, setDate }) => {
  const [show, setShow] = useState(false);

  const OnChange = (e) => {
    setShow(false);
    const time = e.nativeEvent.timestamp;
    const newDate = new Date(time).toISOString().substring(0, 10);
    setDate(newDate);
  };

  return (
    <View style={{ marginBottom: 30 }}>
      <BoldText style={{ fontSize: 18 }}>Date & Time</BoldText>
      <TouchableOpacity
        style={styles.CustomButton}
        onPress={() => setShow(true)}
      >
        <View style={styles.PickerBox}>
          <RegularText style={{ color: "gray" }}>
            {date || "Select Date"}
          </RegularText>
          <FontAwesome name="calendar" size={20} color="gray" />
        </View>
      </TouchableOpacity>
      {show && (
        <DateTimePicker mode="date" value={new Date()} onChange={OnChange} />
      )}
    </View>
  );
};

const TimePicker = ({ title, label, time, setTime }) => {
  const [show, setShow] = useState(false);

  const OnChange = (e) => {
    setShow(false);
    const time = e.nativeEvent.timestamp;
    const ms = e.nativeEvent.timestamp % 60000;
    const newTime = new Date(time - ms).toLocaleTimeString();
    setTime((prev) => ({ ...prev, [label]: newTime }));
  };

  return (
    <View style={{ flex: 0.47 }}>
      <BoldText style={{ fontSize: 18 }}>{title}</BoldText>
      <TouchableOpacity
        style={[styles.CustomButton, { marginTop: 4 }]}
        onPress={() => setShow(true)}
      >
        <View style={styles.PickerBox}>
          <RegularText style={{ color: "gray" }}>{time}</RegularText>
          <Entypo name="chevron-thin-down" size={16} color="gray" />
        </View>
      </TouchableOpacity>
      {show && (
        <DateTimePicker mode="time" value={new Date()} onChange={OnChange} />
      )}
    </View>
  );
};

const Description = ({ setDescription }) => {
  return (
    <View style={{ marginBottom: 30 }}>
      <BoldText style={{ fontSize: 18 }}>Description</BoldText>
      <CustomInput
        placeholder={"Something about your task"}
        onChangeText={(txt) => setDescription(txt)}
      />
    </View>
  );
};

export default AddTaskScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: "white",
    paddingTop: StatusBar.currentHeight + 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  CustomButton: {
    borderWidth: 1,
    padding: 16,
    borderRadius: 12,
    borderColor: "#dddddd",
    marginTop: 12,
  },
  TaskSelectWrap: {
    flexDirection: "row",
    flex: 1,
    // flexWrap: "wrap",
    justifyContent: "space-around",
    // backgroundColor: "red",
  },
  PickerBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  TimePickerContainer: {
    marginBottom: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

const Data = [
  { id: 0, name: "Design" },
  { id: 1, name: "Development" },
  { id: 2, name: "Research" },
  { id: 4, name: "Design" },
  { id: 5, name: "Development" },
  { id: 6, name: "Research" },
];
