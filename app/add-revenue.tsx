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
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Record new revenue</Text>
        <Text style={styles.subtitle}>
          Add crop income for a field to track profitability.
        </Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Field Name</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Field A"
            value={fieldName}
            onChangeText={setFieldName}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Crop</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Canola"
            value={crop}
            onChangeText={setCrop}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Revenue Amount</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 12000"
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
            multiline
            numberOfLines={4}
            value={note}
            onChangeText={setNote}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSaveRevenue}>
          <Text style={styles.buttonText}>Save Revenue</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 24,
  },
  formGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 16,
    color: "#111827",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#2f6f3e",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
});
