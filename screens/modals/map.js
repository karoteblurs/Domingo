import React from 'react';
import { StyleSheet, View, Dimensions, Button } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { GOOGLE_API_KEY } from "../../environments"
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Constants from 'expo-constants';
import { useSelector } from 'react-redux';



const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function Map({ initialRegion, onClose, }) {

  const places = useSelector(state => state.places);
  const locations = places.map(place => place.geometry.location)
  const photorefs = places.map(place => place.photo_reference)
  
  if (!initialRegion) {
    return null;
    //create a state for loading
  }

  return (
    <View style={styles.container}>
      <MapView style={styles.map} provider={PROVIDER_GOOGLE} initialRegion={initialRegion} showsUserLocation={true} userLocationAnnotationTitle='You are here' >
        {locations.map((location, index) => (
          <Marker
          coordinate={{ latitude: location.lat, longitude: location.lng }}
          title={places[index].name}
          rating={places[index].rating}
          description={places[index].vicinity}
          icon={{uri: places[index].icon}}
          
          key={index}

          />
        ))}
      </MapView>

      <View style={styles.searchContainer}>
        <GooglePlacesAutocomplete
          styles={{ textInput: styles.input }}
          placeholder="Looking for something specific?"
          onPress={(data, details = null) => {
            //autocomplete to be finished
          }}
          query={{
            key: GOOGLE_API_KEY,
            language: 'en',
          }}
        />
      </View>
      <View style={{ flex: 1 }}>
        <MapView style={{ flex: 1 }} initialRegion={initialRegion} />
        <Button title="Close" onPress={onClose} />
      </View>
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