import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { FarmDataProvider } from "../store/FarmDataContext";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <FarmDataProvider>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: "#ffffff",
            },
            headerTintColor: "#111827",
            headerTitleStyle: {
              fontWeight: "700",
            },
            contentStyle: {
              backgroundColor: "#F7F4EC",
            },
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              title: "FarmLedger",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="add-expense"
            options={{
              title: "Add Expense",
            }}
          />
          <Stack.Screen
            name="add-revenue"
            options={{
              title: "Add Revenue",
            }}
          />
        </Stack>
      </FarmDataProvider>
    </SafeAreaProvider>
  );
}
