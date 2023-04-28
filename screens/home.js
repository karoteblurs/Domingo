import React, { useState, useEffect } from "react";
import { View, Text, Modal, SafeAreaView, ActivityIndicator, ImageBackground } from "react-native";
import Map from "./modals/map";
import * as Location from 'expo-location';
import { useDispatch } from 'react-redux';
import { Dimensions } from "react-native";
import { setPlaceTypes, setPlaces } from "../redux/placesSlice";
import { getPlacesData, getPlaceTypes } from "../api/index.js";
import PlaceTypesList from "../components/placetypeslist";
import ThemedButton from "react-native-really-awesome-button"

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function Home({ navigation, route }) {
    
    const [isMapModalOpen, setIsMapModalOpen] = useState(false)
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [initialRegion, setInitialRegion] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
    
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

        setInitialRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        });

        const types = ["pharmacy"]//["restaurant", "bar", "supermarket", "pharmacy", "cafe",] //"store", "museum", "night_club","shopping_mall","shoe_store", "zoo", "gym", "drugstore", "convenience_store"]
    getPlacesData(location, types)
    .then(async (data) => {

        const types = [];
        const places = [];
        for (let t of data) {
            places.push(...t)
            for (const place of t) {
                
                const placeTypes = await getPlaceTypes(place.place_id);
                types.push({
                    place_id: place.place_id,
                    types: placeTypes,
                })
                // console.log("place id:", place.place_id, "place types:", placeTypes)
                // console.log("placeTypes:", placeTypes); // Log placeTypes to check that it's being returned correctly
                // console.log("types:", types); // Log types to check that it's being populated correctly
            }
        }
    dispatch(setPlaces(places));
    dispatch(setPlaceTypes(types))
    setIsLoading(false);
    //   console.log("these are the types:", types)
    })
    .catch((error) => {
      console.log("here", error)
    })
  
  }
    }, [location])


    return (
        <ImageBackground source={{ uri: 'https://wallpapercave.com/wp/wp8798204.png' }} style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Text style={{ color: "white", textAlign: "center", fontSize: 30, fontWeight: "bold", marginBottom: 20, marginTop: 30, }}>DOMINGO</Text>
            <View>
              <PlaceTypesList navigation={navigation} route={route} />
            </View>
          </View>
          <SafeAreaView style={{ position: "absolute", bottom: 0, width: "100%", alignItems: "center" }}>
            <ThemedButton type="secondary" onPress={() => setIsMapModalOpen(true)}>Search in the Map</ThemedButton>
            <Modal visible={isMapModalOpen}>
              <Map location={location} initialRegion={initialRegion} style={{ flex: 1, height: "100%" }} />
              <View style={{ alignItems: "center", paddingBottom: 30 }}>
                <ThemedButton type="secondary" onPress={() => setIsMapModalOpen(false)}>Close Map</ThemedButton>
              </View>
            </Modal>
          </SafeAreaView>
          {/* {isLoading && (
            <View style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0, backgroundColor: "rgba(100, 255, 255, 0.5)", justifyContent: "center", alignItems: "center" }}>
              <ActivityIndicator size="large" color="white" />
              <Text style={{ color: "white", marginTop: 10 }}>Finding places near you...</Text>
            </View>
          )} */}
        </ImageBackground>
      );
}