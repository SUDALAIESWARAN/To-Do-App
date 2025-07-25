import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, HelperText, RadioButton } from "react-native-paper";
import { useTasks } from "../context/TaskContext";

export default function TaskForm({ task, onClose }) {
  const { addTask, updateTask } = useTasks();
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [dueDate, setDueDate] = useState(task?.dueDate || "");
  const [priority, setPriority] = useState(task?.priority || "normal");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!title) {
      setError("Title is required");
      return;
    }
    if (task) {
      updateTask(task.id, { title, description, dueDate, priority });
    } else {
      addTask({ title, description, dueDate, status: 'open', priority });
    }
    onClose();
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <HelperText type="error" visible={!!error}>{error}</HelperText>
      <TextInput
        label="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
        multiline
      />
      <TextInput
        label="Due Date (YYYY-MM-DD)"
        value={dueDate}
        onChangeText={setDueDate}
        style={styles.input}
      />
      <RadioButton.Group onValueChange={setPriority} value={priority}>
        <View style={styles.radioRow}>
          <RadioButton.Item label="Low" value="low" />
          <RadioButton.Item label="Normal" value="normal" />
          <RadioButton.Item label="High" value="high" />
        </View>
      </RadioButton.Group>
      <Button mode="contained" onPress={handleSubmit} style={styles.button}>
        {task ? "Update Task" : "Add Task"}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  input: { marginBottom: 12 },
  button: { marginTop: 16 },
  radioRow: { flexDirection: 'row', justifyContent: 'space-between' },
}); 