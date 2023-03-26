import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import useGoogleSignIn from "./useGoogleSignIn";
//Todo_Tasks
const useFirebaseFirestore = () => {
  const { CurrentUser } = useGoogleSignIn();
  const id = CurrentUser?.uid;
  const [Tasks, setTasks] = useState([]);

  useEffect(() => {
    try {
      let data = [];
      const subscriber = firestore()
        .collection(`${id}`)
        .onSnapshot((docs) => {
          docs.forEach((doc) => {
            const res = doc.data();
            res.docId = doc.id;
            data.push(res);
          });
          if (data.length === docs.size) {
            setTasks(() => [...data]);
            data = [];
          }
        });

      return () => subscriber();
    } catch (e) {
      console.log("Error at useFirebaseFirestore", e);
    }
  }, [CurrentUser]);

  //
  const addNewTask = async (data) => {
    await firestore().collection(id).add(data);
    return;
  };

  const DeleteTask = async (docId) => {
    await firestore().collection(id).doc(docId).delete();
    return;
  };

  const UpdateTask = async (docId, data) => {
    await firestore().collection(id).doc(docId).update(data);
  };

  return {
    Tasks,
    addNewTask,
    DeleteTask,
    UpdateTask,
  };
};

export default useFirebaseFirestore;
