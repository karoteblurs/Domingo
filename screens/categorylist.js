import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useSelector } from "react-redux";
import PlaceMap from "./modals/placemap";
import { GOOGLE_API_KEY } from "../environments";


export default function Categorylist({ navigation }) {
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isBackgroundLoaded, setIsBackgroundLoaded] = useState(false);
  const { type } = navigation.state.params;
  const places = useSelector((state) => state.places);

  // Filter places based on the selected type
  const filteredPlaces = places.filter((place) => place.types.includes(type));

  const filteredUniquePlaces = filteredPlaces.reduce((acc, current) => {
    const x = acc.find((item) => item.name === current.name);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

  const renderItem = ({ item }) => {
    console.log("ITEM", item)
    const photo =
      item.photos && item.photos.length > 0 ? item.photos[0].photo_reference : null;
    const photoUrl = photo
      ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo}&key=${GOOGLE_API_KEY}`
      : null;

    const onSearchInMapPress = () => {
      setSelectedPlace(item);
      setIsMapModalOpen(true);
    };

    return (
      <View style={styles.container}>
        {photoUrl && <Image source={{ uri: photoUrl }} style={styles.photo} />}
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.rating}>Rating: {item.rating}</Text>
        <Text style={styles.address}>Address: {item.vicinity}</Text>
        <TouchableOpacity onPress={onSearchInMapPress}>
          <Text style={styles.searchInMapButton}>Find in Map</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const onBackgroundLoad = () => {
    setIsBackgroundLoaded(true);
  };

  const onCloseMapModal = () => {
    setIsMapModalOpen(false);
    setSelectedPlace(null);
  };

  return (
    <ImageBackground
      source={{ uri: "https://wallpapercave.com/wp/wp8798204.png" }}
      style={styles.background}
      onLoad={onBackgroundLoad}
    >
      {isBackgroundLoaded && (
        <View style={styles.container}>
          <FlatList
            data={filteredUniquePlaces}
            renderItem={renderItem}
            keyExtractor={(item) => item.place_id}
          />
          <Modal visible={isMapModalOpen} animationType="slide">
            {selectedPlace && (
             <PlaceMap 
             initialRegion={{
               latitude: selectedPlace.geometry.location.lat,
               longitude: selectedPlace.geometry.location.lng,
             }}
             onClose={onCloseMapModal}
             item={selectedPlace}
           />
            )}
          </Modal>
        </View>
      )}
      </ImageBackground>
  )
            }
   
const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {

    alignItems: "center",
    backgroundColor: 'transparent',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    borderColor: "white",
    borderWidth: "1",
    width: "95%"
  },
  name: {
    fontWeight: '900',
    color: "white",
    fontSize: 16,
  },
  rating: {
    color: 'white',
    fontWeight: "700",
  },
  address: {
    fontStyle: 'italic',

    color: "white",
  },
  photo: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 5,
    marginBottom: 10,
  },
  searchInMapButton: {
    color: "white",
    fontWeight: "bold",
  }
});