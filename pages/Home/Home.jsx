import { View, Text } from "react-native";
import { styles } from "./Home.style";
import React from "react";
import Txt from "../../components/Txt/txt";
import WeatherBasic from "../../components/WeatherBasic/WeatherBasic";

const Home = ({ weatherData, city }) => {
  return (
    <>
      <View style={styles.meteor_basic}>
        <WeatherBasic weather={weatherData} city={city}/>
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
