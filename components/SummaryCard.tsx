import { View, Text, StyleSheet } from "react-native";

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
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  title: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 6,
  },
  value: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
  },
});