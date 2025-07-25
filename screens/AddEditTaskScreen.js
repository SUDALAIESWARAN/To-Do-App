import React from "react";
import { View, StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import TaskForm from "../components/TaskForm";

export default function AddEditTaskScreen({ route, navigation }) {
  const task = route.params?.task;
  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={task ? "Edit Task" : "Add Task"} />
      </Appbar.Header>
      <TaskForm task={task} onClose={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({}); 