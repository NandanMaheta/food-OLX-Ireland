import React, { useState } from "react";
import { View } from "react-native";
import Login from "./src/screens/Login";
import Header from "./src/components/Header";
import Footer from "./src/components/Footer";
import Home from "./src/screens/Home";
import ProductDetails from "./src/screens/ProductDetails";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Hide default header
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [isLoggedin, setLoggedin] = useState(false);

  return (
    <NavigationContainer>
      <View style={{ flex: 1, backgroundColor: "#ecf0f1" }}>
        {isLoggedin ? (
          <>
            <Header />
            <View style={{ flex: 1, marginVertical: 16 }}>
              <HomeStack />
            </View>
            <Footer />
          </>
        ) : (
          <Login onLoginSuccess={() => setLoggedin(true)} />
        )}
      </View>
    </NavigationContainer>
  );
}
