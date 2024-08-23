import { View } from "react-native";
import {
  styles,
  StyledContainer,
  StyledLabel,
  StyledValue,
} from "./Weather.style";
import React from "react";

const WeatherAdvance = ({ weatherDataAdvance }) => {
  const extractTime = (dateTimeString) => {
    return dateTimeString.split("T")[1];
  };
  const { sunrise, sunset } = weatherDataAdvance?.daily;
  const { windspeed } = weatherDataAdvance?.current_weather;
  const sunriseTime = extractTime(sunrise[0]);
  const sunsetTime = extractTime(sunset[0]);

  return (
    <>
      <View style={styles.container}>
        <StyledContainer>
          <StyledValue>{sunriseTime}</StyledValue>
          <StyledLabel>Sunrise</StyledLabel>
        </StyledContainer>
        <StyledContainer>
          <StyledValue>{sunsetTime}</StyledValue>
          <StyledLabel>Sunset</StyledLabel>
        </StyledContainer>
        <StyledContainer>
          <StyledValue>{windspeed} km/h</StyledValue>
          <StyledLabel>Wind Speed</StyledLabel>
        </StyledContainer>
      </View>
    </>
  );
};

export default WeatherAdvance;
