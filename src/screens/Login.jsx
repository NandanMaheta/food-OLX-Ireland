import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  Animated,
} from "react-native";
import { Button } from "react-native-paper";
import styles from "../theme/style";

const Login = ({ onLoginSuccess }) => {
  const [showAnimation, setAnimation] = useState(false);
  const [load, setLoad] = useState(false);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(150)).current;

  useEffect(() => {
    // Start parallel animations
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
      // After animations complete, wait 1100ms and show login card
      setTimeout(() => {
        setAnimation(true);
      }, 1100);
    });
  }, [fadeAnim, slideAnim]);

  const handleLogin = () => {
    setLoad(true);
    // Simulate a delay of 1100ms, then navigate to Home
    setTimeout(() => {
      onLoginSuccess();
      setLoad(false);
    }, 1100);
  };

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
            <Text style={styles.heading}>Welcome Back!</Text>
            <Text style={styles.subHeading}>Login to continue</Text>
            <Button
              mode="contained"
              loading={load}
              onPress={handleLogin}
              style={{
                padding: 3,
                backgroundColor: "rgba(66, 77, 200, 0.95)",
              }}
            >
              Login
            </Button>
          </View>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Login;
