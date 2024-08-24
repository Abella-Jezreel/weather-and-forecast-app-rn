import React from "react";
import { View, Text, Image } from "react-native";
import cloud from "../../assets/clouds.png";
import { styles } from "./ForecastListItem.style";
import Txt from "../Txt/txt";

const ForecastListItem = ({ weather }) => {
  return (
    <>
    <View style={styles.container}>
      <Image source={cloud} style={{ width: 50, height: 50 }} />
      <Txt style={styles.day}>day</Txt>
      <Txt style={styles.date}>date</Txt>
      <Txt style={styles.temperature}>33°</Txt>
    </View>
    </>
  );
};

export default ForecastListItem;
