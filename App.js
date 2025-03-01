import React, { useState, useEffect } from "react";
import { View,StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import Login from "./src/screens/Login";
import Header from "./src/components/Header";
import Footer from "./src/components/Footer";
import Home from "./src/screens/Home";
import ProductDetails from "./src/screens/ProductDetails";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AddProductModal from "./src/components/AddModal"

const Stack = createStackNavigator();

// async function uploadMockData() {
//   try {
//     for (const item of MockData) {
//       const { id, ...data } = item;
//       await addDoc(collection(db, "products"), data);
//       console.log(`Uploaded product ${item.name}`);
//     }
//     console.log("All mock data uploaded successfully.");
//   } catch (error) {
//     console.error("Error uploading mock data: ", error);
//   }
// }

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
  const [showAddModal, setShowAddModal] = useState(false);

  

  return (
    <NavigationContainer>
      <View style={{ flex: 1, backgroundColor: "#ecf0f1" }}>
        {isLoggedin ? (
          <>
          <AddProductModal 
              visible={showAddModal}
              onClose={() => setShowAddModal(false)}
            />
            <Header />
            <View style={styles.addButtonContainer}>
              <Button 
                mode="contained"
                onPress={() => setShowAddModal(true)}
                style={styles.addButton}
                labelStyle={styles.buttonLabel}
                icon="plus"
              >
                Add your food items for sale
              </Button>
            </View>
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


const styles = StyleSheet.create({
  addButtonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
    elevation: 2,
  },
  addButton: {
    backgroundColor: '#2ecc71',
    borderRadius: 8,
    paddingVertical: 6,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});