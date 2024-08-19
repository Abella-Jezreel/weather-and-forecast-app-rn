import { View, Text } from "react-native";
import {styles} from "./Home.style";
import React from "react";

const Home = () => {
  return (
    <>
      <View style={styles.meteor_basic}>
        <Text style={styles.txt}>Basic Weather info</Text>
      </View>
      <View style={styles.searchBar_container}>
        <Text style={styles.txt}>Search bar</Text>
      </View>
      <View style={styles.meteor_advance}>
        <Text style={styles.txt}>Advance weather info</Text>
      </View>
    </>
  );
};

export default Home;
