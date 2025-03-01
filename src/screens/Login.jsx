import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  Animated,
  Platform,
} from "react-native";
import styles from "../theme/style";
import { Button } from "react-native-paper";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
// New imports for expo-auth-session
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri } from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Complete any pending auth sessions
WebBrowser.maybeCompleteAuthSession();

// Firebase configuration (replace with your actual values)
const firebaseConfig = {
  apiKey: "AIzaSyAERovAfPnqTdXEoGsSxCmQYtS-PNUKjZM",
  authDomain: "olxfoodireland.firebaseapp.com",
  projectId: "olxfoodireland",
  storageBucket: "olxfoodireland.firebasestorage.app",
  messagingSenderId: "1071483128578",
  appId: "1:1071483128578:ios:3e266072484125f58fd01b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// Generate the redirect URI
const redirectUri = makeRedirectUri({
  scheme: "com.Nandan.OLX",
  useProxy: Platform.select({ web: false, default: true }),
});

const Login = ({ onLoginSuccess }) => {
  const [showAnimation, setAnimation] = useState(false);
  const [load, setLoad] = useState(false);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(150)).current;

  // Set up the Google authentication request
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: Platform.select({
      ios: "1071483128578-vscd4f4kukfhaqecu7u3h4fpp2g6koe6.apps.googleusercontent.com",
      // add Android or Expo client IDs if needed
    }),
    redirectUri,
  });

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setTimeout(() => {
        setAnimation(true);
      }, 1100);
    });
  }, []);

  // Handle the authentication response
  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then(() => onLoginSuccess())
        .catch((error) =>
          console.error("Firebase sign in error: ", error)
        );
    }
  }, [response]);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../../assets/HEROIMAGE.png")}
        style={styles.backgroundImage}
        resizeMethod="cover"
      >
        <View style={styles.overlay} />
        {!showAnimation ? (
          <View style={styles.content}>
            <Animated.Text
              style={[
                styles.heading,
                { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
              ]}
            >
              Welcome to ZeroWaste Eats Ireland
            </Animated.Text>
            <Animated.Text
              style={[
                styles.subHeading,
                { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
              ]}
            >
              Our only motto: Save Food Waste
            </Animated.Text>
          </View>
        ) : (
          <View style={styles.card}>
            <Text style={styles.heading}>Welcome Back !</Text>
            <Text style={styles.subHeading}>Login to continue</Text>
            <Button
              mode="contained"
              loading={load}
              onPress={() => {
                setLoad(true);
                promptAsync().finally(() => setLoad(false));
              }}
              width="65%"
              style={{
                padding: "3px",
                backgroundColor: "rgba(66, 77, 200, 0.95)",
              }}
            >
              Login/Sign Up with Google
            </Button>
          </View>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Login;
