import { View, Text, TouchableOpacity, Animated } from "react-native";
import { styles } from "./ForeCast.style";
import { useNavigation, useRoute } from "@react-navigation/native";
import BackgroundImg from "../../assets/backgroundForecast.png";
import { ImageBackground } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useRef, useEffect } from "react";
import Header from "../../components/Header/Header";
import ForecastListItem from "../../components/ForecastListItem/ForecastListItem";

const ForeCast = ({ weatherData }) => {
  const [isLoading, setIsLoading] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const nav = useNavigation();
  const { params } = useRoute();
  const { city, quarter, weather } = params;

  useEffect(() => {
    if (!isLoading) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [isLoading, fadeAnim]);
  return (
    <ImageBackground
      source={BackgroundImg}
      style={styles.imageBackGround}
      imageStyle={styles.imageStyle}
      onLoadStart={() => setIsLoading(true)}
      onLoadEnd={() => setIsLoading(false)}
    >
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Loading...</Text>
            </View>
          ) : (
            <Animated.View
              style={{ ...styles.contentContainer, opacity: fadeAnim }}
            >
              <View style={{gap: 40}}>
                <TouchableOpacity onPress={() => nav.navigate("Home")}>
                  <Header city={city} quarter={quarter} />
                </TouchableOpacity>
                <ForecastListItem weather={weatherData} />
              </View>
            </Animated.View>
          )}
        </SafeAreaView>
      </SafeAreaProvider>
    </ImageBackground>
  );
};

export default ForeCast;
