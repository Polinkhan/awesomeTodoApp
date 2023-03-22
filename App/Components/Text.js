import { StyleSheet, Text } from "react-native";

const RegularText = (props) => {
  const { children, style, ...event } = props;
  return (
    <Text style={[styles.regular, { ...style }]} {...event}>
      {children}
    </Text>
  );
};

const BoldText = (props) => {
  const { children, style, ...event } = props;
  return (
    <Text style={[styles.bold, { ...style }]} {...event}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  regular: {
    fontFamily: "Pop",
  },
  bold: {
    fontFamily: "BoldPop",
  },
});

export { RegularText, BoldText };
