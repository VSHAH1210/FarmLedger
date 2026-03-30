import { Pressable, Text, StyleSheet } from "react-native";

type ActionButtonProps = {
  label: string;
  onPress?: () => void;
};

export default function ActionButton({ label, onPress }: ActionButtonProps) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    backgroundColor: "#2f6f3e",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  text: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});
