import { View, Text, useWindowDimensions } from "react-native";
import React from "react";
import { styles } from "./txt.style";

const Txt = ({ children, style, ...restProps }) => {
  const fontSize = style?.fontSize || styles.txt.fontSize;
  const IPHONE_14_PLUS_RATIO = 0.0010799136069114472;
  const { height } = useWindowDimensions();

  return (
    <View>
      <Text
        style={[
          styles.txt,
          style,
          { fontSize: Math.round(fontSize * IPHONE_14_PLUS_RATIO * height) },
        ]}
        {...restProps}
      >
        {children}
      </Text>
    </View>
  );
};

export default Txt;
