import axios from "axios";

export const getSearchLocation = async (location) => {
  try {
    const response = await axios.get(
      `https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=1&language=en&format=json`
    );
    return response.data;
  } catch (error) {
    throw "Invalid City name";
  }
};
