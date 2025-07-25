import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Card, Checkbox, IconButton, Text, Chip } from "react-native-paper";
import * as Animatable from 'react-native-animatable';

export default function TaskItem({ task, onDelete, onToggle, onEdit }) {
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return '#ff5252';
      case 'low': return '#69f0ae';
      default: return '#ffd740';
    }
  };
  return (
    <Animatable.View animation="fadeInUp" duration={500}>
      <Card style={styles.card}>
        <View style={styles.row}>
          <Checkbox
            status={task.status === 'complete' ? 'checked' : 'unchecked'}
            onPress={() => onToggle(task.id)}
          />
          <TouchableOpacity style={{ flex: 1 }} onPress={onEdit}>
            <Text variant="titleMedium" style={task.status === 'complete' ? styles.completed : null}>{task.title}</Text>
            <Text variant="bodySmall">Due: {task.dueDate}</Text>
            <Chip style={[styles.chip, { backgroundColor: getPriorityColor(task.priority) }]} textStyle={{ color: '#222' }}>{task.priority}</Chip>
          </TouchableOpacity>
          <IconButton icon="delete" onPress={() => onDelete(task.id)} />
        </View>
      </Card>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  card: { margin: 8, elevation: 4, borderRadius: 12 },
  row: { flexDirection: 'row', alignItems: 'center', padding: 8 },
  completed: { textDecorationLine: 'line-through', color: 'gray' },
  chip: { marginTop: 4, alignSelf: 'flex-start' },
}); 