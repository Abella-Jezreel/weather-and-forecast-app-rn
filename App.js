import { styles } from "./App.style";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ImageBackground } from "react-native";
import ImageBackGround from "./assets/background.png"
import Home from "./pages/Home/Home";

export default function App() {
  return (
    <ImageBackground
      source={ImageBackGround}
      style={styles.imageBackGround}
      imageStyle={styles.imageStyle}
    >
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Home />
      </SafeAreaView>
    </SafeAreaProvider>
    </ImageBackground>
  );
}