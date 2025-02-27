import { View, Text } from "react-native";
import Login from "./src/screens/Login";
import { useState } from "react";
import Header from "./src/components/Header";
import Footer from "./src/components/Footer";
import Home from "./src/screens/Home";

export default function App() {
  const [isLoggedin, setLoggedin] = useState(false);
  return (
    <View style={{ flex: 1,backgroundColor: '#ecf0f1', }}>
      {isLoggedin ? (
        <>
          <Header />
          <View style={{ flex: 1, marginVertical: 16 }}>
            <Home />
          </View>
          <Footer />
        </>
      ) : (
        <Login onLoginSuccess={() => setLoggedin(true)}/>
      )}
    </View>
  );
}
