import { ImageBackground, Animated, View, Text } from "react-native";
import { styles } from "./Home.style";
import React, { useState, useRef, useEffect } from "react";
import Txt from "../../components/Txt/txt";
import WeatherBasic from "../../components/WeatherBasic/WeatherBasic";
import WeatherAdvance from "../../components/WeatherAdvance/WeatherAdvance";
import BackgroundImg from "../../assets/background.png";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const Home = ({ weatherData, city, quarter, isFontLoaded }) => {
  const [isLoading, setIsLoading] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;

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
    <>
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
              <>
                <View style={styles.meteor_basic}>
                  <Animated.View
                    style={{ ...styles.contentContainer, opacity: fadeAnim }}
                  >
                    <WeatherBasic
                      weather={weatherData}
                      city={city}
                      quarter={quarter}
                    />
                  </Animated.View>
                </View>
                <View style={styles.searchBar_container}>
                  <Txt>Search bar</Txt>
                </View>
                <View style={styles.meteor_advance}>
                  <WeatherAdvance weatherDataAdvance={weatherData} />
                </View>
              </>
            )}
          </SafeAreaView>
        </SafeAreaProvider>
      </ImageBackground>
    </>
  );
};

export default Home;
