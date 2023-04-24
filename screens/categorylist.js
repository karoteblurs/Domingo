import React, {useState} from "react";
import { View, Text, FlatList, StyleSheet, ImageBackground, Image } from "react-native";
import { useSelector } from 'react-redux';
import { GOOGLE_API_KEY } from "../environments";

export default function Categorylist({ navigation }) {

    const [isBackgroundLoaded, setIsBackgroundLoaded] = useState(false);
  console.log("THIS", navigation.state.params.type)
  const { type } = navigation.state.params;
  const places = useSelector(state => state.places);

  // Filter places based on the selected type
  const filteredPlaces = places.filter(place =>
    place.types.includes(type)
  );

  const filteredUniquePlaces = filteredPlaces.reduce((acc, current) => {
    const x = acc.find(item => item.name === current.name);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

  const renderItem = ({ item }) => {
    const photo = item.photos && item.photos.length > 0 ? item.photos[0].photo_reference : null;
  const photoUrl = photo ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo}&key=${GOOGLE_API_KEY}` : null;
    return (
      <View style={styles.container}>
        {photoUrl && <Image source = {{ uri: photoUrl}} style={styles.photo} />}
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.rating}>Rating: {item.rating}</Text>
        <Text style={styles.address}>Address: {item.vicinity}</Text>
      </View>
    );
  };

  const onBackgroundLoad = () => {
    setIsBackgroundLoaded(true)
  };

  return (
    <ImageBackground source={{ uri: 'https://wallpapercave.com/wp/wp8798204.png' }} style={styles.background} onLoad={onBackgroundLoad}>
      {isBackgroundLoaded &&
      <FlatList
        data={filteredUniquePlaces}
        renderItem={renderItem}
        keyExtractor={item => item.place_id}
      />

    }
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  container: {
    backgroundColor: 'coral',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  rating: {
    color: 'gray',
  },
  address: {
    fontStyle: 'italic',
  },
  photo: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 5,
    marginBottom: 10,
  },
});