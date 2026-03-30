import { ScrollView, StyleSheet, Text, View, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SummaryCard from "../components/SummaryCard";
import ActionButton from "../components/ActionButton";
import FieldCard from "../components/FieldCard";
import { summaryData, fieldsData } from "../data/mockData";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.appName}>FarmLedger</Text>
        <Text style={styles.subtitle}>Farm financial overview</Text>

        <View style={styles.summarySection}>
          <SummaryCard title="Revenue" value={summaryData.revenue} />
          <SummaryCard title="Expenses" value={summaryData.expenses} />
          <SummaryCard title="Profit" value={summaryData.profit} />
        </View>

        <View style={styles.actionsRow}>
          <ActionButton
            label="Add Expense"
            onPress={() =>
              Alert.alert("Coming soon", "Add Expense screen will be next.")
            }
          />
          <View style={styles.spacer} />
          <ActionButton
            label="Add Revenue"
            onPress={() =>
              Alert.alert("Coming soon", "Add Revenue screen will be next.")
            }
          />
        </View>

        <Text style={styles.sectionTitle}>Your Fields</Text>

        {fieldsData.map((field) => (
          <FieldCard
            key={field.id}
            name={field.name}
            crop={field.crop}
            revenue={field.revenue}
            expenses={field.expenses}
            profit={field.profit}
            onPress={() =>
              Alert.alert(
                field.name,
                "Field details screen will be added next.",
              )
            }
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
