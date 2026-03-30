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
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { useFarmData } from "../store/FarmDataContext";

const EXPENSE_CATEGORIES = [
  "Seed",
  "Fertilizer",
  "Fuel",
  "Labor",
  "Equipment",
  "Repairs",
  "Chemicals",
  "Other",
];

export default function AddExpenseScreen() {
  const { addExpense } = useFarmData();

  const [fieldName, setFieldName] = useState("");
  const [category, setCategory] = useState("Seed");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const handleSaveExpense = () => {
    const parsedAmount = Number(amount);

    if (!fieldName.trim() || !category || !amount.trim()) {
      Alert.alert(
        "Missing fields",
        "Please fill in field name, category, and amount.",
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

    addExpense({
      fieldName: fieldName.trim(),
      category,
      amount: parsedAmount,
      note: note.trim(),
    });

    Alert.alert("Expense Saved", "Your expense was added successfully.", [
      {
        text: "OK",
        onPress: () => router.back(),
      },
    ]);

    setFieldName("");
    setCategory("Seed");
    setAmount("");
    setNote("");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Record a new expense</Text>
        <Text style={styles.subtitle}>
          Add farm costs like seed, fertilizer, fuel, or labor.
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
          <Text style={styles.label}>Expense Category</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={category}
              onValueChange={(itemValue) => setCategory(itemValue)}
            >
              {EXPENSE_CATEGORIES.map((item) => (
                <Picker.Item key={item} label={item} value={item} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Amount</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 2500"
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

        <TouchableOpacity style={styles.button} onPress={handleSaveExpense}>
          <Text style={styles.buttonText}>Save Expense</Text>
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
  pickerWrapper: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    overflow: "hidden",
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
