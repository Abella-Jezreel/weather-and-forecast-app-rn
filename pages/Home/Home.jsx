import { View, Text } from "react-native";
import {styles} from "./Home.style";
import React from "react";
import Txt  from "../../components/Txt/txt";

const Home = () => {
  return (
    <>
      <View style={styles.meteor_basic}>
        <Txt style={{fontSize: 40, color: 'brown'}}>Basic Weather info</Txt>
      </View>
      <View style={styles.searchBar_container}>
        <Txt>Search bar</Txt>
      </View>
      <View style={styles.meteor_advance}>
        <Txt>Advance weather info</Txt>
      </View>
    </>
  );
};

export default Home;
