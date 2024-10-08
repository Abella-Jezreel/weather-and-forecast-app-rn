import React, { useState, useEffect } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import Txt from "../Txt/txt";
import { styles } from "./WeatherBasic.style";
import { WEATHER_INTERPRETATIONS } from "../../utils/weather-utils";
import { useNavigation } from "@react-navigation/native";

const WeatherBasic = ({ weather, city, quarter }) => {
  const [formattedTime, setFormattedTime] = useState("");
  const nav = useNavigation();

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const am_pm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesStr = minutes < 10 ? "0" + minutes : minutes;
    return `${hours}:${minutesStr} ${am_pm}`;
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = new Date().toISOString();
      setFormattedTime(formatTime(currentTime));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const getWeatherInterpretation = (weatherCode) => {
    return WEATHER_INTERPRETATIONS.find((interpretation) =>
      interpretation.codes.includes(weatherCode)
    );
  };

  if (!weather || !weather.current_weather || !weather.current_weather_units) {
    return null;
  }
  const { temperature, time, weathercode } = weather?.current_weather || {};
  const { temperature: unit } = weather?.current_weather_units || {};
  const formattedTemperature = temperature
    ? Math.round(temperature) + unit
    : "";
  const { label: weatherLabel, image: weatherImage } =
    getWeatherInterpretation(weathercode);

  return (
    <>
      <View style={styles.clock}>
        <Txt style={styles.clock_txt}>{formattedTime}</Txt>
      </View>
      <View style={styles.city}>
        <Txt style={styles.city_txt}>
          {city}
        </Txt>
      </View>
      <View style={styles.interpretation}>
        <Txt style={styles.interpretation_txt}>{weatherLabel}</Txt>
      </View>
      <View style={styles.temperature_box}>
        <TouchableOpacity
          onPress={() => nav.navigate("Forecast", { city, quarter, ...weather })}
        >
          <Txt style={styles.temperature}>{formattedTemperature}</Txt>
        </TouchableOpacity>
        {weatherImage && <Image source={weatherImage} style={styles.image} />}
      </View>
    </>
  );
};

export default WeatherBasic;
