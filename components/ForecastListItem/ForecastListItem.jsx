import React from "react";
import { View, Image } from "react-native";
import cloud from "../../assets/clouds.png";
import { styles } from "./ForecastListItem.style";
import Txt from "../Txt/txt";
import { WEATHER_INTERPRETATIONS } from "../../utils/weather-utils";

const ForecastListItem = ({ weather }) => {
  const daily = weather?.daily || {};
  console.log(daily, "daily");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${month}/${day}`;
  };

  const getDayAbbreviation = (dateString) => {
    const date = new Date(dateString);
    const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    return daysOfWeek[date.getDay()];
  };

  const getWeatherInterpretation = (weatherCode) => {
    return WEATHER_INTERPRETATIONS.find((interpretation) =>
      interpretation.codes.includes(weatherCode)
    );
  };

  const combinedData = daily.time.map((time, index) => ({
    time,
    weathercode: daily.weathercode[index],
    sunrise: daily.sunrise[index],
    temperature_2m_max: daily.temperature_2m_max[index],
  }));

  return (
    <>
      {combinedData.map((day, index) => (
        <View style={styles.container} key={index}>
          <Image source={getWeatherInterpretation(day.weathercode).image} style={{ width: 50, height: 50 }} />
          <Txt style={styles.day}>{getDayAbbreviation(day.time)}</Txt>
          <Txt style={styles.date}>{formatDate(day.sunrise)}</Txt>
          <Txt style={styles.temperature}>{Math.round(day.temperature_2m_max)}°</Txt>
        </View>
      ))}
    </>
  );
};

export default ForecastListItem;
