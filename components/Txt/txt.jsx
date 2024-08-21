import { View, Text } from "react-native";
import React from "react";
import { styles } from "./txt.style";

const Txt = ({ children, style, ...restProps }) => {
  return (
    <View>
      <Text style={[styles.txt, style]} {...restProps}>
        {children}
      </Text>
    </View>
  );
};

export default Txt;
