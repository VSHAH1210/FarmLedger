import React, { createContext, useContext, useMemo, useState } from "react";

export type ExpenseItem = {
  id: string;
  fieldName: string;
  category: string;
  amount: number;
  note?: string;
};

export type RevenueItem = {
  id: string;
  fieldName: string;
  crop: string;
  amount: number;
  note?: string;
};

type FarmDataContextType = {
  expenses: ExpenseItem[];
  revenue: RevenueItem[];
  addExpense: (expense: Omit<ExpenseItem, "id">) => void;
  addRevenue: (item: Omit<RevenueItem, "id">) => void;
  summary: {
    revenue: number;
    expenses: number;
    profit: number;
  };
  fields: {
    id: string;
    name: string;
    crop: string;
    revenue: number;
    expenses: number;
    profit: number;
  }[];
};

const FarmDataContext = createContext<FarmDataContextType | undefined>(
  undefined,
);

const initialExpenses: ExpenseItem[] = [
  {
    id: "e1",
    fieldName: "Field A",
    category: "Fertilizer",
    amount: 12000,
    note: "Spring fertilizer",
  },
  {
    id: "e2",
    fieldName: "Field B",
    category: "Fuel",
    amount: 17400,
    note: "Fuel usage",
  },
];

const initialRevenue: RevenueItem[] = [
  {
    id: "r1",
    fieldName: "Field A",
    crop: "Canola",
    amount: 20000,
    note: "Initial crop sale",
  },
  {
    id: "r2",
    fieldName: "Field B",
    crop: "Wheat",
    amount: 28200,
    note: "Initial crop sale",
  },
];

export function FarmDataProvider({ children }: { children: React.ReactNode }) {
  const [expenses, setExpenses] = useState<ExpenseItem[]>(initialExpenses);
  const [revenue, setRevenue] = useState<RevenueItem[]>(initialRevenue);

  const addExpense = (expense: Omit<ExpenseItem, "id">) => {
    setExpenses((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        ...expense,
      },
    ]);
  };

  const addRevenue = (item: Omit<RevenueItem, "id">) => {
    setRevenue((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        ...item,
      },
    ]);
  };

  const summary = useMemo(() => {
    const totalRevenue = revenue.reduce((sum, item) => sum + item.amount, 0);
    const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);

    return {
      revenue: totalRevenue,
      expenses: totalExpenses,
      profit: totalRevenue - totalExpenses,
    };
  }, [expenses, revenue]);

  const fields = useMemo(() => {
    const fieldMap = new Map<
      string,
      {
        id: string;
        name: string;
        crop: string;
        revenue: number;
        expenses: number;
        profit: number;
      }
    >();

    revenue.forEach((item) => {
      if (!fieldMap.has(item.fieldName)) {
        fieldMap.set(item.fieldName, {
          id: item.fieldName,
          name: item.fieldName,
          crop: item.crop || "Unknown",
          revenue: 0,
          expenses: 0,
          profit: 0,
        });
      }

      const current = fieldMap.get(item.fieldName)!;
      current.revenue += item.amount;
      if (!current.crop || current.crop === "Unknown") {
        current.crop = item.crop;
      }
      current.profit = current.revenue - current.expenses;
    });

    expenses.forEach((item) => {
      if (!fieldMap.has(item.fieldName)) {
        fieldMap.set(item.fieldName, {
          id: item.fieldName,
          name: item.fieldName,
          crop: "Unknown",
          revenue: 0,
          expenses: 0,
          profit: 0,
        });
      }

      const current = fieldMap.get(item.fieldName)!;
      current.expenses += item.amount;
      current.profit = current.revenue - current.expenses;
    });

    return Array.from(fieldMap.values());
  }, [expenses, revenue]);

  const value = useMemo(
    () => ({
      expenses,
      revenue,
      addExpense,
      addRevenue,
      summary,
      fields,
    }),
    [expenses, revenue, summary, fields],
  );

  return (
    <FarmDataContext.Provider value={value}>
      {children}
    </FarmDataContext.Provider>
  );
}

export function useFarmData() {
  const context = useContext(FarmDataContext);

  if (!context) {
    throw new Error("useFarmData must be used inside FarmDataProvider");
  }

  return context;
}
