import React, { useEffect, useState, useRef } from "react";
import { styles } from "./App.style";
import { Alert, Platform, View } from "react-native";
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
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";

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

    const subscribeToNotifications = async () => {
      let token;
      console.log("subscribeToNotifications called");

      if (Platform.OS === "android") {
        console.log("Setting notification channel for Android");
        await Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }

      if (Device.isDevice) {
        console.log("Device is a physical device");
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        console.log(
          "Existing notification permissions status:",
          existingStatus
        );

        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          console.log("Requested notification permissions status:", status);

          if (status !== "granted") {
            alert("Failed to get permissions");
            return;
          }
        }

        try {
          const projectId = Constants.expoConfig?.extra?.eas?.projectId;
          if (!projectId) {
            throw new Error("Project ID is not defined in Expo config");
          }

          const tokenResponse = await Notifications.getExpoPushTokenAsync({
            projectId,
          });
          token = tokenResponse.data;
          console.log("Token EXPO", token);
        } catch (error) {
          console.error("Error getting Expo push token:", error);
        }
      } else {
        alert("Must use physical device for Push Notifications");
      }

      return token;
    };

    fetchLocation();

    Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(
        "Notification response received:",
        response.notification.request.content.body
      );
    });

    Notifications.addNotificationReceivedListener((notification) => {
      console.log("Notification received:", notification.request.content.body);
    });

    subscribeToNotifications().then((token) => {
      if (token) {
        console.log("Push notification token:", token);
      } else {
        console.log("No token received");
      }
    });
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
        if (
          searchLocation &&
          searchLocation.results &&
          searchLocation.results.length > 0
        ) {
          setLocation(searchLocation);
        } else {
          Alert.alert("Invalid City name");
        }
      } catch (error) {
        console.error("Error fetching search location:", error);
      }
    };

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
