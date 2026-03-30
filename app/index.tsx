import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import SummaryCard from "../components/SummaryCard";
import ActionButton from "../components/ActionButton";
import FieldCard from "../components/FieldCard";
import { useFarmData } from "../store/FarmDataContext";
import { Colors } from "../constants/colors";

export default function HomeScreen() {
  const { summary, fields } = useFarmData();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroCard}>
          <Text style={styles.appName}>FarmLedger</Text>
          <Text style={styles.subtitle}>
            Track your farm finances with clarity and confidence.
          </Text>
        </View>

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

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your Fields</Text>
          <Text style={styles.sectionSubtitle}>
            Monitor performance field by field
          </Text>
        </View>

        {fields.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateTitle}>No field data yet</Text>
            <Text style={styles.emptyStateText}>
              Add expenses and revenue to start tracking profitability.
            </Text>
          </View>
        ) : (
          fields.map((field) => (
            <FieldCard
              key={field.id}
              name={field.name}
              crop={field.crop}
              revenue={field.revenue}
              expenses={field.expenses}
              profit={field.profit}
              onPress={() => {}}
            />
          ))
        )}
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
    paddingBottom: 36,
  },
  heroCard: {
    backgroundColor: Colors.primary,
    borderRadius: 22,
    padding: 22,
    marginBottom: 20,
  },
  appName: {
    fontSize: 30,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "#E5F3E8",
    lineHeight: 22,
  },
  summarySection: {
    marginBottom: 20,
  },
  actionsRow: {
    flexDirection: "row",
    marginBottom: 26,
  },
  spacer: {
    width: 12,
  },
  sectionHeader: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: Colors.text,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: Colors.textMuted,
    marginTop: 4,
  },
  emptyState: {
    backgroundColor: Colors.surface,
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 6,
  },
  emptyStateText: {
    fontSize: 14,
    color: Colors.textMuted,
    lineHeight: 20,
  },
});
