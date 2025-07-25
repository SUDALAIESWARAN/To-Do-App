import React, { useState } from "react";
import { View, FlatList, RefreshControl, StyleSheet, Image } from "react-native";
import { FAB, Text, Appbar, Searchbar, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useTasks } from "../context/TaskContext";
import TaskItem from "../components/TaskItem";

export default function TaskListScreen() {
  const { tasks, deleteTask, toggleComplete } = useTasks();
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 500);
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" || task.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Content title="My Tasks" />
      </Appbar.Header>
      <Searchbar
        placeholder="Search tasks"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
      />
      <View style={styles.filterRow}>
        <Button mode={filter === 'all' ? 'contained' : 'outlined'} onPress={() => setFilter('all')}>All</Button>
        <Button mode={filter === 'open' ? 'contained' : 'outlined'} onPress={() => setFilter('open')}>Open</Button>
        <Button mode={filter === 'complete' ? 'contained' : 'outlined'} onPress={() => setFilter('complete')}>Completed</Button>
      </View>
      {filteredTasks.length === 0 ? (
        <View style={styles.emptyContainer}>
          {/* <Image source={require('../assets/empty.png')} style={{ width: 200, height: 200 }} /> */}
          <Text>No tasks yet. Add one!</Text>
        </View>
      ) : (
        <FlatList
          data={filteredTasks}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TaskItem task={item} onDelete={deleteTask} onToggle={toggleComplete} onEdit={() => navigation.navigate('AddEditTask', { task: item })} />
          )}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      )}
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('AddEditTask')}
        animated
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fab: { position: 'absolute', right: 16, bottom: 16 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  searchbar: { margin: 8 },
  filterRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 8 },
}); 