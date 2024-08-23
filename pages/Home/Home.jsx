import { View } from "react-native";
import { styles } from "./Home.style";
import React from "react";
import Txt from "../../components/Txt/txt";
import WeatherBasic from "../../components/WeatherBasic/WeatherBasic";
import WeatherAdvance from "../../components/WeatherAdvance/WeatherAdvance";

const Home = ({ weatherData, city, quarter }) => {
  return (
    <>
      <View style={styles.meteor_basic}>
        <WeatherBasic weather={weatherData} city={city} quarter={quarter}/>
      </View>
      <View style={styles.searchBar_container}>
        <Txt>Search bar</Txt>
      </View>
      <View style={styles.meteor_advance}>
        <WeatherAdvance weatherDataAdvance={weatherData}/>
      </View>
    </>
  );
};

export default Home;
