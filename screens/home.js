import React, { useState, useEffect } from "react";
import { View, Text, Button, Modal, FlatList, SafeAreaView, } from "react-native";
import Map from "./modals/map";
import * as Location from 'expo-location';
import { useDispatch } from 'react-redux';
import { Dimensions } from "react-native";
import { setPlaceTypes, setPlaces } from "../redux/placesSlice";
import { getPlacesData, getPlaceTypes } from "../api/index.js";
import PlaceTypesList from "../components/placetypeslist";

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function Home({ navigation }) {
    
    const [isMapModalOpen, setIsMapModalOpen] = useState(false)
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [initialRegion, setInitialRegion] = useState(null);
    
    const dispatch = useDispatch();
    
    useEffect(() => {
        (async () => {
          
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
    
        })();
    }, []);
    
    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }
    useEffect(() => {
      if (location) {
  
    setInitialRegion ({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
    });
  
    getPlacesData(location)
    .then(async (data) => {
      dispatch(setPlaces(data));
  
      const types = [];
      for (const place of data) {
        
        const placeTypes = await getPlaceTypes(place.place_id);
        types.push({
          place_id: place.place_id,
          types: placeTypes,
        })
        console.log("place id:", place.place_id, "place types:", placeTypes)
        console.log("placeTypes:", placeTypes); // Log placeTypes to check that it's being returned correctly
        console.log("types:", types); // Log types to check that it's being populated correctly
      }
      dispatch(setPlaceTypes(types))
      console.log("these are the types:", types)
    })
    .catch((error) => {
      console.log("here", error)
    })
  
  }
    }, [location])



    return ( 
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Text style= {{textAlign: "center"}}>Search by Category</Text>
            <View>
              <PlaceTypesList navigation={navigation} />
            </View>
          </View>
          <SafeAreaView style={{ position: "absolute", bottom: 0 }}>
            <Button title="Search in the Map" onPress={() => setIsMapModalOpen(true)} />
          </SafeAreaView>
          <Modal visible={isMapModalOpen}>
            <Map location={location} initialRegion={initialRegion} style={{ flex: 1 }} />
            <Button title="Close Map" onPress={() => setIsMapModalOpen(false)} />
          </Modal>
        </View>
      );
}