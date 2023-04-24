import axios from "axios";
import { GOOGLE_API_KEY } from "../environments";


export const getPlacesData = async (location, types) => {
  try {
      const promises = []

      for (let type of types){
      const response = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?rankby=distance&type=${type}`, {
        params: {
          location: `${location.coords.latitude},${location.coords.longitude}`,
          //radius: 5000, // radius in meters
          key: GOOGLE_API_KEY,
          openNow: true,

  

          //add type?
        },
      });
      promises.push(response.data.results)
      //console.log("PROM123", promises)
    };
      return places = await Promise.all(promises).then (((values) => {
        return values}))
      
    //let places =await Promise.all(promises) //.then(((values)  => { 
        //console.log("FUCK", values)
      //places = values}))
      //console.log(places)

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