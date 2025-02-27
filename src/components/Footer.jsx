import {
    View,
    Text,
  } from "react-native";
import { SafeAreaView } from "react-native";
const Footer = () => {
  return (
    <SafeAreaView >
    <View
      style={{
        backgroundColor: "#2a9d8f",
        padding: 9,
        alignItems: "center",
      }}
    >
      <Text style={{ color: "white", fontSize: 12 }}>
        🍀 Nourishing Ireland since 2023
      </Text>
      <Text
        style={{ color: "rgba(255,255,255,0.8)", fontSize: 10, marginTop: 4 }}
      >
        © Nandan Maheta. All rights reserved
      </Text>
    </View></SafeAreaView>
  );
};

export default Footer;
