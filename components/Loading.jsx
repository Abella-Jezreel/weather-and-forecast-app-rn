import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import LoadingImg from "../assets/Load4.gif";

const Loading = () => {
  return (
    <View style={styles.container}>
      <Image
        source={LoadingImg} // Ensure this path is correct
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent', 
  },
  image: {
    width: 100, // Adjust the width as needed
    height: 100, // Adjust the height as needed
    borderRadius: '50%', // Adjust the borderRadius as needed
  },
});

export default Loading;