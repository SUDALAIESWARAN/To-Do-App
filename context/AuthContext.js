import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from storage on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        let storedUser = null;
        if (typeof window !== "undefined" && window.localStorage) {
          // Web
          storedUser = window.localStorage.getItem("user");
        } else {
          // Native
          storedUser = await AsyncStorage.getItem("user");
        }
        if (storedUser) setUser(JSON.parse(storedUser));
      } catch (e) {
        // handle error
      }
    };
    loadUser();
  }, []);

  // Save user to storage when it changes
  useEffect(() => {
    const saveUser = async () => {
      try {
        if (typeof window !== "undefined" && window.localStorage) {
          // Web
          if (user) {
            window.localStorage.setItem("user", JSON.stringify(user));
          } else {
            window.localStorage.removeItem("user");
          }
        } else {
          // Native
          if (user) {
            await AsyncStorage.setItem("user", JSON.stringify(user));
          } else {
            await AsyncStorage.removeItem("user");
          }
        }
      } catch (e) {
        // handle error
      }
    };
    saveUser();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 