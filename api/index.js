import axios from "axios";
import { GOOGLE_API_KEY } from "../environments";

export default getPlacesData = async (location) => {
    try {
      const response = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
        params: {
          location: `${location.coords.latitude},${location.coords.longitude}`,
          radius: 5000, // radius in meters
          key: GOOGLE_API_KEY,
        },
      });
  
      return places = response.data.results;

    } catch (error) {
      console.error(error);
    }
  }