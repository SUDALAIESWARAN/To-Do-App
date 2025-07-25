import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import LoginScreen from './screens/LoginScreen';
import TaskListScreen from './screens/TaskListScreen';
import AddEditTaskScreen from './screens/AddEditTaskScreen';

const Stack = createNativeStackNavigator();

function MainNavigator() {
  const { user } = useAuth();
  return (
    <Stack.Navigator>
      {!user ? (
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      ) : (
        <>
          <Stack.Screen name="Tasks" component={TaskListScreen} />
          <Stack.Screen name="AddEditTask" component={AddEditTaskScreen} options={{ title: 'Add / Edit Task' }} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <PaperProvider>
      <AuthProvider>
        <TaskProvider>
          <NavigationContainer>
            <MainNavigator />
          </NavigationContainer>
        </TaskProvider>
      </AuthProvider>
    </PaperProvider>
  );
} 