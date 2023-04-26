import React from 'react';
import { StyleSheet, View, Dimensions, Button } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { GOOGLE_API_KEY } from "../../environments"
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Constants from 'expo-constants';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function PlaceMap({ item, onClose }) {
  console.log("fuck", item)
  const initialRegion = {
    latitude: item.geometry.location.lat,
    longitude: item.geometry.location.lng,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };

  console.log("FUCKER",initialRegion)
  console.log("BITCH", item.geometry.location.lat, item.geometry.location.lng)


  return (
    <View style={styles.container}>
      <MapView style={styles.map} provider={PROVIDER_GOOGLE} initialRegion={initialRegion} showsUserLocation={true} userLocationAnnotationTitle='You are here' >
        <Marker
          coordinate={{ latitude: item.geometry.location.lat, longitude: item.geometry.location.lng }}
          title={item.name}
          rating={item.rating}
          description={item.vicinity}
          icon={{uri: item.icon}}
        />
      </MapView>

      <View style={styles.searchContainer}>
        <GooglePlacesAutocomplete
          styles={{ textInput: styles.input }}
          placeholder="Looking for something specific?"
          onPress={(data, details = null) => {
            //console.log("MAPSTUFF", data, details);
          }}
          query={{
            key: GOOGLE_API_KEY,
            language: 'en',
          }}
        />
      </View>

      <Button title="Close" onPress={onClose} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  searchContainer: {
    position: 'absolute',
    width: '90%',
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    padding: 8,
    borderRadius: 8,
    top: Constants.statusBarHeight,
  },
  input: {
    borderColor: '#888',
    borderWidth: 1,
  },
});