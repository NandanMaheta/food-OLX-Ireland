// SearchBar.js
import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from "react-native";

const SearchBar = ({ onSearch, onFilterChange }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch(searchQuery);
    }, 300); // Debounce time

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
    onFilterChange(selectedFilter);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search products..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filter === "all" && styles.activeFilter]}
          onPress={() => handleFilterChange("all")}
        >
          <Text>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === "Veg" && styles.activeFilter]}
          onPress={() => handleFilterChange("Veg")}
        >
          <Text>Veg</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === "Non-Veg" && styles.activeFilter]}
          onPress={() => handleFilterChange("Non-Veg")}
        >
          <Text>Non-Veg</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#fff",
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  activeFilter: {
    backgroundColor: "#ddd",
  },
});

export default SearchBar;
