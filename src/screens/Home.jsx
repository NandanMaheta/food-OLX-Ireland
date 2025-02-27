// Home.js
import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { MockData } from '../components/Mockdata';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);

  // Initialize with mock data
  useEffect(() => {
    setProducts(MockData);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({ item }) =>  <View style={styles.cardWrapper}>
            <ProductCard product={item} />
          </View>}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    marginBottom:10,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  listContent: {
    paddingBottom: 20,
  },cardWrapper: {
    flex: 1, // Each card takes equal space
    maxWidth: '48%', // Ensure cards don't exceed 48% of the screen width
    marginBottom: 8, // Spacing between rows
  },
});

export default Home;