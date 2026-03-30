import { View, Text, StyleSheet, Pressable } from "react-native";

type FieldCardProps = {
  name: string;
  crop: string;
  revenue: number;
  expenses: number;
  profit: number;
  onPress?: () => void;
};

export default function FieldCard({
  name,
  crop,
  revenue,
  expenses,
  profit,
  onPress,
}: FieldCardProps) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.crop}>Crop: {crop}</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Revenue</Text>
        <Text style={styles.value}>${revenue.toLocaleString()}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Expenses</Text>
        <Text style={styles.value}>${expenses.toLocaleString()}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Profit</Text>
        <Text style={styles.profit}>${profit.toLocaleString()}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  crop: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: "#4b5563",
  },
  value: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  profit: {
    fontSize: 14,
    fontWeight: "700",
    color: "#2f6f3e",
  },
});
