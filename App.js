import React, { useEffect, useState, useRef } from "react";
import { styles } from "./App.style";
import { Alert, View } from "react-native";
import Home from "./pages/Home/Home";
import ForeCast from "./pages/Forecast/ForeCast.jsx";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";
import { getWeatherData } from "./api/getWeatherData";
import { getCityData } from "./api/getCityData";
import { getSearchLocation } from "./api/getSearchLocation.js";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Loading from "./components/Loading.jsx";

const Stack = createNativeStackNavigator();
const navTheme = {
  colors: {
    background: "transparent",
  },
};

export default function App() {
  const [coordinates, setCoordinates] = useState();
  const [weatherData, setWeatherData] = useState();
  const [location, setLocation] = useState();
  const [hood, setHood] = useState();
  const debounceTimeout = useRef(null);

  const [isFontLoaded] = useFonts({
    "Alata-Regular": require("./assets/fonts/Alata-Regular.ttf"),
  });

  const { latitude, longitude } = coordinates || {};
  const { city, quarter } = hood?.address || {};

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

  useEffect(() => {
    const fetchHoodData = async () => {
      try {
        if (latitude && longitude) {
          const hoodData = await getCityData(latitude, longitude);
          setHood(hoodData);
        }
      } catch (error) {
        console.error("Error fetching hood data:", error);
      }
    };

    if (latitude && longitude) {
      fetchHoodData();
    }
  }, [latitude, longitude]);

  console.log(city, "city");
  
  const onSubmit = (location) => {
    const fetchSearchLocation = async () => {
      try {
        const searchLocation = await getSearchLocation(location);
        if (searchLocation && searchLocation.results && searchLocation.results.length > 0) {
          setLocation(searchLocation);
        } else {
          Alert.alert("Invalid City name");
        }
      } catch (error) {
        console.error("Error fetching search location:", error);
      }
    }
  
    fetchSearchLocation();
  };

  useEffect(() => {
    if (location && location.results && location.results.length > 0) {
      setCoordinates({
        latitude: location.results[0].latitude,
        longitude: location.results[0].longitude,
      });
    }
  }, [location]);

  console.log(location, "location");
  
  return (
    <NavigationContainer theme={navTheme}>
      {!isFontLoaded || !weatherData ? (
        <View style={styles.loadingContainer}>
          <Loading />
        </View>
      ) : (
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Home">
            {() => (
              <Home
                weatherData={weatherData}
                city={city}
                quarter={quarter}
                isFontLoaded={isFontLoaded}
                onSubmit={onSubmit}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Forecast">
            {() => <ForeCast weatherData={weatherData} />}
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
