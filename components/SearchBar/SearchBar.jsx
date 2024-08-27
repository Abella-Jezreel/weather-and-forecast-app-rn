import { TextInput } from "react-native";
import React, { useRef } from "react";
import { styles } from "./SearchBar.style";

const SearchBar = ({onSubmit}) => {

  return (
        <TextInput
          style={styles.input}
          placeholder="Enter your City..."
          onSubmitEditing={(e) => onSubmit(e.nativeEvent.text)}
        />
  );
};

export default SearchBar;