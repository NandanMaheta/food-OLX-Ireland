// ProductCard.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const ProductCard = ({ product }) => {
  return (
    <View style={styles.cardContainer}>
      {/* Product Image */}
      <Image source={product.image} style={styles.productImage} />

      {/* Product Details Container */}
      <View style={styles.detailsContainer}>
        {/* Product Name */}
        <Text style={styles.productName}>{product.name}</Text>

        {/* Owner and Location */}
        <Text style={styles.ownerText}>By {product.owner}</Text>
        <Text style={styles.locationText}>🗺️ {product.area}</Text>

        {/* Rating and Dietary Info */}
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>⭐ {product.rating}</Text>
          <Text style={[
            styles.dietaryText,
            { color: product.isVeg ? '#27ae60' : '#e74c3c' }
          ]}>
            {product.isVeg ? 'VEG' : 'NON-VEG'}
          </Text>
        </View>

        {/* Cooking Date */}
        <Text style={styles.cookedDate}>Cooked on: {product.cookedOn}</Text>

        {/* Price */}
        <Text style={styles.priceText}>€{product.price.toFixed(2)}</Text>
      </View>

      {/* Action Button */}
      <TouchableOpacity 
        style={styles.actionButton}
        onPress={() => console.log('View details pressed')}>
        <Text style={styles.buttonText}>View Details & Order</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    margin: 4,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    
  },
  productImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  detailsContainer: {
    padding: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  ownerText: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 2,
  },
  locationText: {
    fontSize: 12,
    color: '#95a5a6',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 14,
    color: '#f39c12',
  },
  dietaryText: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  cookedDate: {
    fontSize: 12,
    color: '#bdc3c7',
    fontStyle: 'italic',
    marginBottom: 8,
  },
  priceText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2ecc71',
  },
  actionButton: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default ProductCard;