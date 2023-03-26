import {
  FlatList,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  View,
} from "react-native";
import React, { useState } from "react";
import IconButton from "../Components/IconButton";
import { Entypo, SimpleLineIcons } from "@expo/vector-icons";
import { BoldText } from "../Components/Text";
import CustomInput from "../Components/CustomInput";
import CustomButton from "../Components/CustomButton";
import useFirebaseFirestore from "../Hooks/useFirebaseFirestore";
import DatePicker from "../Components/DatePicker";
import Required from "../Components/Required";
import TimePicker from "../Components/TimePicker";

const AddTaskScreen = ({ navigation }) => {
  const [taskName, setTaskName] = useState(null);
  const [category, setCategory] = useState(0);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState({ start: null, end: null });
  const [description, setDescription] = useState(null);
  const [loading, setLoading] = useState(false);

  const { addNewTask } = useFirebaseFirestore();

  const handleSubmit = () => {
    const data = {
      taskName,
      category: Data[category].name,
      date,
      time,
      description,
      created: new Date().getTime(),
    };
    if (taskName && date && time.start && time.end) {
      setLoading(true);
      addNewTask(data)
        .then(() => {
          ToastAndroid.show("New Task Added", ToastAndroid.SHORT);
          navigation.goBack();
        })
        .catch((e) => ToastAndroid.show(e, ToastAndroid.SHORT))
        .finally(() => setLoading(false));
    } else ToastAndroid.show("Field cannot be empty", ToastAndroid.SHORT);
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <TaskName setTaskName={setTaskName} />
        <TaskSelect category={category} setCategory={setCategory} />
        <DatePicker date={date} setDate={setDate} />
        <View style={styles.TimePickerContainer}>
          <TimePicker
            title={"Start Time"}
            label={"start"}
            date={date}
            time={time.start}
            setTime={setTime}
          />
          <TimePicker
            title={"End Time"}
            label={"end"}
            date={date}
            time={time.end}
            setTime={setTime}
          />
        </View>
        <Description setDescription={setDescription} />
      </ScrollView>
      <View>
        <CustomButton
          isLoading={loading}
          isLoadingText={"Creating new task"}
          onPress={handleSubmit}
          style={{ marginTop: 30, elevation: 0 }}
        >
          Create Task
        </CustomButton>
      </View>
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
      <BoldText style={{ fontSize: 18 }}>
        Task Name
        <Required />
      </BoldText>
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
                backgroundColor: category === item.id ? "#3787eb" : "#eeeeee",
                marginLeft: item.id && 16,
                elevation: 0,
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
    // paddingTop: StatusBar.currentHeight + 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  TimePickerContainer: {
    marginBottom: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

const Data = [
  { id: 0, name: "Learning" },
  { id: 1, name: "Development" },
  { id: 2, name: "Research" },
  { id: 4, name: "Deep Work" },
  { id: 5, name: "Shallow Work" },
  { id: 6, name: "Other" },
];
