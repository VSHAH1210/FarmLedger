import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../constants/colors";

type SummaryCardProps = {
  title: string;
  value: number;
};

export default function SummaryCard({ title, value }: SummaryCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>${value.toLocaleString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 18,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.shadow,
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  title: {
    fontSize: 14,
    color: Colors.textMuted,
    marginBottom: 8,
    fontWeight: "600",
  },
  value: {
    fontSize: 26,
    fontWeight: "800",
    color: Colors.text,
  },
});
