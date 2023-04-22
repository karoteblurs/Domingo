import React from "react";
import { View, Text, FlatList, Button } from "react-native";
import { useSelector } from 'react-redux';

export default function PlaceTypesList({ navigation }) {
  const placeTypes = useSelector(state => state.placeTypes);
  const places = useSelector(state => state.places);

  if (!placeTypes) {
    return <Text style = {{textAlign: "center"}}>Loading...</Text>
  }

  // Use a Set to keep track of unique place types
  const uniquePlaceTypes = new Set();

  placeTypes.forEach(place => {
    place.types.forEach(type => {
      uniquePlaceTypes.add(type);
    })
  });

  // Convert Set back to an array for rendering
  const uniquePlaceTypesArray = Array.from(uniquePlaceTypes);

  const renderItem = ({ item }) => {
    // Get places that match the selected category
    const filteredPlaces = places.filter(place =>
      place.types.includes(item)
    );

    return (
      <View>
        <Text>{item}</Text>
        <Button
          title={`View ${filteredPlaces.length} Places`}
          onPress={() => navigation.navigate('PlaceList', { places: filteredPlaces })}
        />
      </View>
    );
  };

  return (
    <View style={{ height: '90%', overflow: 'scroll' }}>
      <FlatList
        data={uniquePlaceTypesArray}
        renderItem={renderItem}
        keyExtractor={item => item}
      />
    </View>
  );
}