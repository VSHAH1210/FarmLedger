import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import SummaryCard from "../components/SummaryCard";
import ActionButton from "../components/ActionButton";
import FieldCard from "../components/FieldCard";
import { useFarmData } from "../store/FarmDataContext";

export default function HomeScreen() {
  const { summary, fields } = useFarmData();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.appName}>FarmLedger</Text>
        <Text style={styles.subtitle}>Farm financial overview</Text>

        <View style={styles.summarySection}>
          <SummaryCard title="Revenue" value={summary.revenue} />
          <SummaryCard title="Expenses" value={summary.expenses} />
          <SummaryCard title="Profit" value={summary.profit} />
        </View>

        <View style={styles.actionsRow}>
          <ActionButton
            label="Add Expense"
            onPress={() => router.push("/add-expense" as any)}
          />
          <View style={styles.spacer} />
          <ActionButton
            label="Add Revenue"
            onPress={() => router.push("/add-revenue" as any)}
          />
        </View>

        <Text style={styles.sectionTitle}>Your Fields</Text>

        {fields.map((field) => (
          <FieldCard
            key={field.id}
            name={field.name}
            crop={field.crop}
            revenue={field.revenue}
            expenses={field.expenses}
            profit={field.profit}
            onPress={() => {}}
          />
        ))}
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
    paddingBottom: 32,
  },
  appName: {
    fontSize: 28,
    fontWeight: "800",
    color: "#111827",
    marginTop: 10,
  },
  subtitle: {
    fontSize: 15,
    color: "#6b7280",
    marginTop: 4,
    marginBottom: 20,
  },
  summarySection: {
    marginBottom: 20,
  },
  actionsRow: {
    flexDirection: "row",
    marginBottom: 24,
  },
  spacer: {
    width: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 14,
  },
});
