import React from "react";
import { SafeAreaView, View, Text } from "react-native";


//simple header component, easy to understand.
const Header = () => {
  return (
    <SafeAreaView style={{ backgroundColor: "rgb(53, 181, 166)" }}>
      <View
        style={{
          padding: 9,
          alignItems: "center",

        }}
      >
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
          FLAT 20% OFF ON FIRST THREE ORDERS!
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Header;
