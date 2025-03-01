// Home.js
import React, { useState,useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import { collection, query, onSnapshot } from "firebase/firestore";
import {db} from "../../fireDatabaseConfig"

const Home = () => {
  const [products,setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    const q = query(collection(db, "products"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const productsData = [];
      querySnapshot.forEach((doc) => {
        productsData.push({ id: doc.id, ...doc.data() });
      });
      setProducts(productsData);
    });

    return () => unsubscribe();
  }, []);

  // Function to filter products based on searchQuery and filterType
  const filteredProducts = products.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterType === "all" ||
      (filterType === "Veg" && item.isVeg) ||
      (filterType === "Non-Veg" && !item.isVeg);

    return matchesSearch && matchesFilter;
  });
  

  return (
    <View style={styles.container}>

<SearchBar onSearch={setSearchQuery} onFilterChange={setFilterType} />
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <ProductCard product={item} />
          </View>
        )}
        
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 5,
  },
  columnWrapper: {
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
  
  cardWrapper: {
    flex: 1, // Each card takes equal space
    maxWidth: "48%", // Ensure cards don't exceed 48% of the screen width
    marginBottom: 12, // Spacing between rows
  },
});

export default Home;
