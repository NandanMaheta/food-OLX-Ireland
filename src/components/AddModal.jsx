// components/AddProductModal.js
import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,ScrollView 
} from "react-native";
import { Button } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { db } from "../../fireDatabaseConfig";
import { addDoc, collection } from "firebase/firestore";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

const AddProductModal = ({ visible, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    owner: "",
    area: "",
    price: "",
    description: "",
    isVeg: true,
    cookedOn: new Date(),
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.owner.trim()) newErrors.owner = "Owner is required";
    if (!formData.area.trim()) newErrors.area = "Area is required";
    if (!formData.price || isNaN(formData.price))
      newErrors.price = "Valid price required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setSubmitting(true);

    try {
      const productData = {
        // Explicitly list only needed fields
        name: formData.name,
        owner: formData.owner,
        area: formData.area,
        price: Number(formData.price),
        description: formData.description,
        isVeg: formData.isVeg,
        rating: 4.0,
        cookedOn: formData.cookedOn.toLocaleString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      };

      await addDoc(collection(db, "products"), productData);
      onClose();
    } catch (error) {
      console.error("Error adding product: ", error);
    } finally {
      setSubmitting(false);
    }
  };

  const formatText = (text, fieldName) => {
    const formatted = text.replace(/\b\w/g, (char) => char.toUpperCase());
    setFormData((prev) => ({ ...prev, [fieldName]: formatted }));
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.modalContainer}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        >
          <TouchableWithoutFeedback>
            <SafeAreaView style={styles.modalContent}>
              <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
              >
                <Text style={styles.modalTitle}>Add Food Item</Text>

                <TextInput
                  style={styles.input}
                  placeholder="Item Name"
                  value={formData.name}
                  onChangeText={(text) => formatText(text, "name")}
                  error={!!errors.name}
                />
                {errors.name && <Text style={styles.error}>{errors.name}</Text>}

                <TextInput
                  style={styles.input}
                  placeholder="Your Name"
                  value={formData.owner}
                  onChangeText={(text) => formatText(text, "owner")}
                  error={!!errors.owner}
                />
                {errors.owner && (
                  <Text style={styles.error}>{errors.owner}</Text>
                )}

                <TextInput
                  style={styles.input}
                  placeholder="Area"
                  value={formData.area}
                  onChangeText={(text) => formatText(text, "area")}
                  error={!!errors.area}
                />
                {errors.area && <Text style={styles.error}>{errors.area}</Text>}

                <TextInput
                  style={styles.input}
                  placeholder="Price"
                  keyboardType="numeric"
                  value={formData.price}
                  onChangeText={(text) =>
                    setFormData((prev) => ({ ...prev, price: text }))
                  }
                  error={!!errors.price}
                />
                {errors.price && (
                  <Text style={styles.error}>{errors.price}</Text>
                )}

                <TouchableOpacity
                  style={styles.dateButton}
                  onPress={() => setShowDatePicker(true)}
                >
                  <Text>
                    Select Cook Date/Time: {formData.cookedOn.toLocaleString()}
                  </Text>
                </TouchableOpacity>

                {showDatePicker && (
                  <DateTimePicker
                    style={styles.datePicker}
                    value={formData.cookedOn}
                    mode="datetime"
                    display="spinner"
                    onChange={(event, date) => {
                      setShowDatePicker(false);
                      if (date)
                        setFormData((prev) => ({ ...prev, cookedOn: date }));
                    }}
                  />
                )}

                <TextInput
                  style={[styles.input, styles.multiline]}
                  placeholder="Description"
                  multiline
                  numberOfLines={3}
                  value={formData.description}
                  onChangeText={(text) =>
                    setFormData((prev) => ({ ...prev, description: text }))
                  }
                  error={!!errors.description}
                />
                {errors.description && (
                  <Text style={styles.error}>{errors.description}</Text>
                )}

                <View style={styles.buttonRow}>
                  <Button
                    mode="contained"
                    onPress={onClose}
                    style={styles.button}
                  >
                    Cancel
                  </Button>
                  <Button
                    mode="contained"
                    onPress={handleSubmit}
                    style={styles.button}
                    disabled={submitting}
                    loading={submitting}
                  >
                    Submit
                  </Button>
                </View>
              </ScrollView>
            </SafeAreaView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    margin: 20,
    padding: 20,
    borderRadius: 10,
    paddingBottom: 20,
    maxHeight: "90%",
  },
  scrollContent: {
    padding: 20,       // This adds internal padding to the scroll container
    paddingBottom: 40  // Extra space at bottom for iOS safe area
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  multiline: {
    height: 80,
    textAlignVertical: "top",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
  dateButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  error: {
    color: "red",
    marginBottom: 5,
  },
  datePicker: {
    backgroundColor: "white",
    marginBottom: 15,
  },
});

export default AddProductModal;
