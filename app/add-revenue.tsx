import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useFarmData } from "../store/FarmDataContext";
import { Colors } from "../constants/colors";

export default function AddRevenueScreen() {
  const { addRevenue } = useFarmData();

  const [fieldName, setFieldName] = useState("");
  const [crop, setCrop] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const handleSaveRevenue = () => {
    const parsedAmount = Number(amount);

    if (!fieldName.trim() || !crop.trim() || !amount.trim()) {
      Alert.alert(
        "Missing fields",
        "Please fill in field name, crop, and amount.",
      );
      return;
    }

    if (Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      Alert.alert(
        "Invalid amount",
        "Please enter a valid amount greater than 0.",
      );
      return;
    }

    addRevenue({
      fieldName: fieldName.trim(),
      crop: crop.trim(),
      amount: parsedAmount,
      note: note.trim(),
    });

    Alert.alert("Revenue Saved", "Your revenue was added successfully.", [
      {
        text: "OK",
        onPress: () => router.back(),
      },
    ]);

    setFieldName("");
    setCrop("");
    setAmount("");
    setNote("");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerCard}>
          <Text style={styles.title}>Add Revenue</Text>
          <Text style={styles.subtitle}>
            Record crop income and track how each field is performing.
          </Text>
        </View>

        <View style={styles.formCard}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Field Name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Field A"
              placeholderTextColor={Colors.textMuted}
              value={fieldName}
              onChangeText={setFieldName}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Crop</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Canola"
              placeholderTextColor={Colors.textMuted}
              value={crop}
              onChangeText={setCrop}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Revenue Amount</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. 12000"
              placeholderTextColor={Colors.textMuted}
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Note (Optional)</Text>
            <TextInput
              style={[styles.input, styles.multilineInput]}
              placeholder="Add any extra details"
              placeholderTextColor={Colors.textMuted}
              multiline
              numberOfLines={4}
              value={note}
              onChangeText={setNote}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSaveRevenue}>
            <Text style={styles.buttonText}>Save Revenue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  headerCard: {
    backgroundColor: Colors.primary,
    borderRadius: 22,
    padding: 22,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#E5F3E8",
    lineHeight: 20,
  },
  formCard: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  formGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 16,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
});
