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
import { Colors } from "../constants/colors";

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
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerCard}>
          <Text style={styles.title}>Add Expense</Text>
          <Text style={styles.subtitle}>
            Record a farm cost and keep your financial records up to date.
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

          <TouchableOpacity style={styles.button} onPress={handleSaveExpense}>
            <Text style={styles.buttonText}>Save Expense</Text>
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
  pickerWrapper: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: "hidden",
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
