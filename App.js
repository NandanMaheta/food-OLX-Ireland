import { View, Text } from "react-native";
import Login from "./src/screens/Login";
import { useState } from "react";
import Header from "./src/components/Header";
import Footer from "./src/components/Footer";
import Home from "./src/screens/Home";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductDetails from "./src/screens/ProductDetails";

const stack = createStackNavigator();

function HomeStack(){
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false // Hide default header
      }}
    >
      <stack.Screen name="Home" component={Home} />
      <stack.Screen name="ProductDetails" component={ProductDetails} />
    </stack.Navigator>
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
