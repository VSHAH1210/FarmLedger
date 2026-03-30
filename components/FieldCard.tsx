import { View, Text, StyleSheet, Pressable } from "react-native";
import { Colors } from "../constants/colors";

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
  const isProfitPositive = profit >= 0;

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.crop}>{crop}</Text>
        </View>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>Field</Text>
        </View>
      </View>

      <View style={styles.divider} />

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
        <Text
          style={[
            styles.profit,
            { color: isProfitPositive ? Colors.profit : Colors.loss },
          ]}
        >
          ${profit.toLocaleString()}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.shadow,
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "800",
    color: Colors.text,
    marginBottom: 4,
  },
  crop: {
    fontSize: 14,
    color: Colors.textMuted,
    fontWeight: "500",
  },
  badge: {
    backgroundColor: Colors.surfaceSoft,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  badgeText: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: "700",
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 14,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: Colors.textMuted,
    fontWeight: "500",
  },
  value: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.text,
  },
  profit: {
    fontSize: 14,
    fontWeight: "800",
  },
});
