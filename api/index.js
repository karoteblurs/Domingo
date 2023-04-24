import axios from "axios";
import { GOOGLE_API_KEY } from "../environments";


export const getPlacesData = async (location) => {

    try {
      const response = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
        params: {
          location: `${location.coords.latitude},${location.coords.longitude}`,
          radius: 5000, // radius in meters
          key: GOOGLE_API_KEY,
          openNow: true,

          //add type?
        },
      });

      return places = response.data.results;

    } catch (error) {
      console.error(error);
    }
  }

  export const getPlaceTypes = async (place_id) => {
    try {
      const response = await axios.get('https://maps.googleapis.com/maps/api/place/details/json', {
        params: {
          place_id,
          key: GOOGLE_API_KEY,
          fields: 'types',
        },
      });
  
      return response.data.result.types;
  
    } catch (error) {
      console.error(error);
    }
  }