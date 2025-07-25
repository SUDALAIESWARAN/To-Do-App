import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem("tasks").then(data => {
      if (data) setTasks(JSON.parse(data));
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks(prev => [...prev, { ...task, id: Date.now().toString() }]);
  };
  const updateTask = (id, updated) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updated } : t));
  };
  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };
  const toggleComplete = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: t.status === 'complete' ? 'open' : 'complete' } : t));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, toggleComplete }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext); 