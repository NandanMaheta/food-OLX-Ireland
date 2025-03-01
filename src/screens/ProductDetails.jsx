// ProductDetails.js
import React from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';


const ProductDetails = ({route}) => {
  const {product} = route.params;

  return (
    product && <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Product Image */}
        <Image source={require("../../assets/FoodItems/Ghughra.png")} style={styles.productImage} />

        {/* Product Details Container */}
        <View style={styles.detailsContainer}>
          <Text style={styles.productName}>{product.name}</Text>
          
          {/* Owner and Rating */}
          <View style={styles.metaContainer}>
            <Text style={styles.ownerText}>By {product.owner}</Text>
            <View style={styles.ratingBox}>
              <Text style={styles.ratingText}>⭐ {product.rating}</Text>
            </View>
          </View>

          {/* Price and Dietary Info */}
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>€{product.price.toFixed(2)}</Text>
            <Text style={[
              styles.dietaryText,
              { color: product.isVeg ? '#27ae60' : '#e74c3c' }
            ]}>
              {product.isVeg ? 'VEG' : 'NON-VEG'}
            </Text>
          </View>

          {/* Location and Cooking Date */}
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>📍 Location</Text>
            <Text style={styles.infoText}>{product.area}</Text>
            
            <Text style={styles.infoLabel}>🍳 Cooked On</Text>
            <Text style={styles.infoText}>{product.cookedOn}</Text>
          </View>

          {/* Description */}
          <View style={styles.descriptionBox}>
            <Text style={styles.sectionTitle}>About This Dish</Text>
            <Text style={styles.descriptionText}>{product.description}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.callButton]}
          onPress={() => console.log('Call owner pressed')}>
          <Text style={styles.buttonText}>📞 Call Owner</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.buyButton]}
          onPress={() => console.log('Buy pressed')}>
          <Text style={styles.buttonText}>🛒 Buy Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 20,
  },
  productName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 15,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  ownerText: {
    fontSize: 18,
    color: '#7f8c8d',
  },
  ratingBox: {
    backgroundColor: '#f1c40f22',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  ratingText: {
    color: '#f39c12',
    fontWeight: '600',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  priceText: {
    fontSize: 32,
    fontWeight: '800',
    color: '#2ecc71',
  },
  dietaryText: {
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  infoBox: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoLabel: {
    fontSize: 14,
    color: '#95a5a6',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 16,
    color: '#2c3e50',
    marginBottom: 15,
  },
  descriptionBox: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 16,
    color: '#7f8c8d',
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
  },
  actionButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  callButton: {
    backgroundColor: '#27ae60',
    marginRight: 10,
  },
  buyButton: {
    backgroundColor: '#3498db',
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default ProductDetails;