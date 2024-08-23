import { StyleSheet, Text } from "react-native";
import { View } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "#00000050",
    alignItems: "center",
    flex: 1,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 15,
  },
  styledContainer: {
    alignItems: "center",
    gap: 10,
  },
  styledLabel: {
    color: "white",
    fontSize: 15,
  },
  styledValue: {
    color: "white",
    fontSize: 20,
  },
});

export const StyledContainer = ({ children }) => {
  return <View style={styles.styledContainer}>{children}</View>;
};

export const StyledLabel = ({ children }) => {
  return <Text style={styles.styledLabel}>{children}</Text>;
};

export const StyledValue = ({ children }) => {
  return <Text style={styles.styledValue}>{children}</Text>;
};
