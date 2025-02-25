import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  Animated,
} from "react-native";
import styles from "../theme/style";
import { Button } from "react-native-paper";

const Login = () => {
  const [showAnimation, setAnimation] = useState(false); // Controls when to show login content
  const [load, setLoad] = useState(false);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current; // Fade in
  const slideAnim = useRef(new Animated.Value(150)).current; // Slide up

  useEffect(() => {
    // Run animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000, // 2 sec animation
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 2000, // 2 sec animation
        useNativeDriver: true,
      }),
    ]).start(() => {
      // After animation completes, show login content
      setTimeout(() => {
        setAnimation(true);
      }, 1100);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../../assets/HEROIMAGE.png")}
        style={styles.backgroundImage}
        resizeMethod="cover"
      >
        <View style={styles.overlay} />

        {/* If animation is still running, show animated text */}
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
          // After animation, show login UI
          <View style={styles.card}>
            <Text style={styles.heading}>Welcome Back !</Text>
            <Text style={styles.subHeading}>Login to continue</Text>
            <Button
              mode="contained"
              loading={load}
              onPress={() => setLoad(true)}
              width="65%"
              style={{padding:"3px",backgroundColor:"rgba(66, 77, 200, 0.95)"}}
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
