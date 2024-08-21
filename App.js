import React, { useEffect, useState, useRef } from "react";
import { styles } from "./App.style";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ImageBackground } from "react-native";
import ImageBackGround from "./assets/background.png";
import Home from "./pages/Home/Home";
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from "expo-location";
import { getWeatherData } from "./api/getWeatherData";
import { useFonts } from "expo-font";

export default function App() { 
  const [coordinates, setCoordinates] = useState();
  const [weatherData, setWeatherData] = useState();
  const debounceTimeout = useRef(null);

  const [isFontLoaded] = useFonts({
    "Alata-Regular": require("./assets/fonts/Alata-Regular.ttf"),
  })

  const { latitude, longitude } = coordinates || {};
  const {temperature, interval} = weatherData?.current_weather || {};

  // console.log(temperature, 'temperature')
  // console.log(interval, 'interval')
  // console.log(coordinates, 'coordinates');
  // console.log(weatherData, 'weatherData');
  // console.log(isFontLoaded, 'isFontLoaded') 

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const { status } = await requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission to access location was denied");
          return;
        }
  
        const location = await getCurrentPositionAsync({});
        setCoordinates({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    };
  
    fetchLocation();
  }, []);
  
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        if (latitude && longitude) {
          const weatherData = await getWeatherData(latitude, longitude);
          setWeatherData(weatherData);
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };
  
    if (latitude && longitude) {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
      debounceTimeout.current = setTimeout(fetchWeatherData, 1000);
    }
  }, [latitude, longitude]);




  return (
    <ImageBackground
      source={ImageBackGround}
      style={styles.imageBackGround}
      imageStyle={styles.imageStyle}
    >
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          {isFontLoaded && <Home />}
        </SafeAreaView>
      </SafeAreaProvider>
    </ImageBackground>
  );
}
