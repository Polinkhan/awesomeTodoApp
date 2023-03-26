import React, { useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import ActionSheet, {
  SheetManager,
  useScrollHandlers,
} from "react-native-actions-sheet";
import useFirebaseFirestore from "../../Hooks/useFirebaseFirestore";
import { BoldText, RegularText } from "../Text";
import CustomInput from "../CustomInput";
import CustomButton from "../CustomButton";
import DatePicker from "../DatePicker";
import Required from "../Required";
import TimePicker from "../TimePicker";

function OptionSheet({ sheetId, payload }) {
  const actionSheetRef = useRef();
  const scrollHandlers = useScrollHandlers < ScrollView > ("1", actionSheetRef);

  return (
    <ActionSheet
      id={sheetId}
      ref={actionSheetRef}
      gestureEnabled={true}
      indicatorStyle={{ width: 100 }}
      containerStyle={{ borderTopLeftRadius: 25, borderTopRightRadius: 25 }}
      enableRouterBackNavigation={true}
      routes={routes}
      initialRoute="root"
      payload={{ ...payload, scrollHandlers }}
      //   snapPoints={[30, 60, 100]}
    />
  );
}

const RootRoute = ({ router, payload }) => {
  const { taskName } = payload;

  return (
    <View style={{ padding: 20, paddingBottom: 0, height: 280 }}>
      <BoldText style={{ fontSize: 20, textAlign: "center" }}>
        {taskName}
      </BoldText>
      <Divider />
      <View style={styles.BtnContainer}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => router.navigate("confirm")}
        >
          <RegularText style={{ ...styles.text, color: "#DB4437" }}>
            Delete
          </RegularText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => router.navigate("edit")}
        >
          <RegularText style={{ ...styles.text, color: "#1464c7" }}>
            Edit
          </RegularText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => SheetManager.hide("option")}
        >
          <RegularText style={{ ...styles.text, color: "gray" }}>
            Cancel
          </RegularText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ConfirmRoute = ({ router, payload }) => {
  const { DeleteTask } = useFirebaseFirestore();
  const { docId } = payload;

  return (
    <View style={{ padding: 20, paddingBottom: 0, height: 280 }}>
      <BoldText style={{ color: "#353535", fontSize: 20, textAlign: "center" }}>
        Are you sure ?
      </BoldText>
      <Divider />
      <View style={{ flex: 1, justifyContent: "center" }}>
        <TouchableOpacity
          style={[styles.btn, { flex: 0.3 }]}
          onPress={async () => {
            await DeleteTask(docId);
            SheetManager.hide("option");
            ToastAndroid.show("Task Deleted", ToastAndroid.SHORT);
          }}
        >
          <RegularText style={{ ...styles.text, color: "#DB4437" }}>
            Confirm Delete
          </RegularText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, { flex: 0.3 }]}
          onPress={() => router.goBack()}
        >
          <RegularText style={{ ...styles.text, color: "gray" }}>
            Cancel
          </RegularText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const EditRoute = ({ router, payload }) => {
  const { scrollHandlers, docId } = payload;
  const { taskName, date, category, time, description, created } = payload;
  const [newTaskName, setNewTaskName] = useState(taskName);
  const [newDate, setNewDate] = useState(date);
  const [newTime, setNewTime] = useState(time);
  const [newDescription, setVewDescription] = useState(description);
  const [loading, setLoading] = useState(false);

  const { UpdateTask } = useFirebaseFirestore();

  const handleSubmit = () => {
    const data = {
      taskName: newTaskName,
      category,
      date: newDate,
      time: newTime,
      description: newDescription,
      created,
    };
    if (newTaskName && newDate && newTime.start && newTime.end) {
      setLoading(true);
      UpdateTask(docId, data)
        .then(() => {
          ToastAndroid.show("Task Updated", ToastAndroid.SHORT);
          SheetManager.hide("option");
        })
        .catch((e) => ToastAndroid.show(e, ToastAndroid.SHORT))
        .finally(() => setLoading(false));
    } else ToastAndroid.show("Field cannot be empty", ToastAndroid.SHORT);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} {...scrollHandlers}>
        <TaskName newTaskName={newTaskName} setNewTaskName={setNewTaskName} />
        <DatePicker date={newDate} setDate={setNewDate} setTime={setNewTime} />
        <View style={styles.TimePickerContainer}>
          <TimePicker
            title={"Start Time"}
            label={"start"}
            date={newDate}
            time={newTime.start}
            setTime={setNewTime}
          />
          <TimePicker
            title={"End Time"}
            label={"end"}
            date={newDate}
            time={newTime.end}
            setTime={setNewTime}
          />
        </View>
        <Description
          newDescription={newDescription}
          setVewDescription={setVewDescription}
        />
        <View>
          <CustomButton
            isLoading={loading}
            isLoadingText={"Updating task"}
            onPress={handleSubmit}
            style={{ marginTop: 30, elevation: 0 }}
          >
            Update Task
          </CustomButton>
        </View>
      </ScrollView>
    </View>
  );
};

const TaskName = ({ newTaskName, setNewTaskName }) => {
  return (
    <View style={{ marginBottom: 30 }}>
      <BoldText style={{ fontSize: 18 }}>
        Task Name
        <Required />
      </BoldText>
      <CustomInput
        placeholder={"Name"}
        value={newTaskName}
        onChangeText={(txt) => setNewTaskName(txt)}
      />
    </View>
  );
};

const Description = ({ newDescription, setDescription }) => {
  return (
    <View style={{ marginBottom: 30 }}>
      <BoldText style={{ fontSize: 18 }}>Description</BoldText>
      <CustomInput
        value={newDescription}
        placeholder={"Something about your task"}
        onChangeText={(txt) => setDescription(txt)}
      />
    </View>
  );
};

const routes = [
  {
    name: "root",
    component: RootRoute,
  },
  {
    name: "edit",
    component: EditRoute,
  },
  {
    name: "confirm",
    component: ConfirmRoute,
  },
];

const Divider = () => {
  return <View style={styles.divider} />;
};

export default OptionSheet;

const styles = StyleSheet.create({
  divider: {
    borderBottomWidth: 1,
    paddingVertical: 4,
    borderColor: "#f2f2f2",
  },
  BtnContainer: {
    flex: 1,
    justifyContent: "space-around",
    paddingTop: 30,
  },
  btn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
  },
  container: {
    maxHeight: "100%",
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
  { id: 0, name: "Design" },
  { id: 1, name: "Development" },
  { id: 2, name: "Research" },
  { id: 4, name: "Design" },
  { id: 5, name: "Development" },
  { id: 6, name: "Research" },
];
