import { View, Text, TouchableOpacity } from "react-native";
import Txt from "../Txt/txt";
import React from "react";
import { styles } from "./Header.style";
import { useNavigation } from "@react-navigation/native";

const Header = ({ city, quarter }) => {
    const nav = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => nav.goBack()}>
          <Txt style={styles.back_btn}>{"<"}</Txt>
      </TouchableOpacity>
      <View style={styles.header_txt}>
        <Txt >{quarter}, {city}</Txt>
        <Txt style={styles.subTitle}>7 day forecast</Txt>
      </View>
    </View>
  );
};

export default Header;
