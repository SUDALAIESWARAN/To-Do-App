import React from "react";
import { View, StyleSheet, ActivityIndicator, Image } from "react-native";
import { Button, Text, Surface } from "react-native-paper";
import * as Google from "expo-auth-session/providers/google";
import { useAuth } from "../context/AuthContext";

export default function LoginScreen() {
  const { setUser } = useAuth();
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "818707365010-6q9ujg4m0p9ditihmp3337co0q2t23n5.apps.googleusercontent.com",
    androidClientId: "818707365010-nqt113adakdh2idpgtiff2g9ukfb1b8u.apps.googleusercontent.com",
    webClientId: "818707365010-6q9ujg4m0p9ditihmp3337co0q2t23n5.apps.googleusercontent.com",
  });

  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (response) {
      console.log("Google auth response:", response);
    }
    if (response?.type === "success") {
      const accessToken =
        response.authentication?.accessToken || response.params?.access_token;
      if (accessToken) {
        setUser({ name: "Google User", token: accessToken });
        setLoading(false);
      } else {
        setError("No access token received. Check your Google Cloud Console client IDs and redirect URIs.");
        setLoading(false);
      }
    } else if (response?.type === "error" || response?.type === "dismiss") {
      setError("Login failed or cancelled.");
      setLoading(false);
    }
  }, [response, setUser]);

  return (
    <View style={styles.background}>
      <Surface style={styles.card} elevation={6}>
        <Image
          source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Google_Keep_icon_%282020%29.svg" }}
          style={styles.logo}
        />
        <Text variant="headlineLarge" style={styles.title}>
          Welcome to Todo App
        </Text>
        <Text style={styles.subtitle}>Organize your tasks efficiently</Text>
        {error && <Text style={styles.error}>{error}</Text>}
        {loading ? (
          <ActivityIndicator size="large" color="#4285F4" style={{ marginTop: 24 }} />
        ) : (
          <Button
            mode="contained"
            icon="google"
            onPress={() => {
              setError(null);
              setLoading(true);
              promptAsync();
            }}
            style={styles.googleButton}
            labelStyle={{ fontSize: 18 }}
            buttonColor="#4285F4"
          >
            Sign in with Google
          </Button>
        )}
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#f5f6fa",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: 340,
    paddingVertical: 36,
    paddingHorizontal: 28,
    borderRadius: 24,
    backgroundColor: "#fff",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  logo: {
    width: 64,
    height: 64,
    marginBottom: 18,
    borderRadius: 16,
  },
  title: {
    fontWeight: "bold",
    color: "#222f3e",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    color: "#576574",
    fontSize: 16,
    marginBottom: 24,
    textAlign: "center",
  },
  error: {
    color: "#e84118",
    marginBottom: 12,
    textAlign: "center",
  },
  googleButton: {
    marginTop: 12,
    width: "100%",
    borderRadius: 8,
    paddingVertical: 6,
  },
});