import React from "react";
import { View, Text, FlatList } from "react-native";
import { useSelector } from 'react-redux';
import { useRoute } from "@react-navigation/native"

export default function Categorylist() {
  const route = useRoute();
  const type = route.params?.type
  const places = useSelector(state => state.places);

  // Filter places based on the selected type
  const filteredPlaces = places.filter(place =>
    place.types.includes(type)
  );

  const renderItem = ({ item }) => {
    return (
      <View>
        <Text>{item.name}</Text>
        <Text>{item.vicinity}</Text>
      </View>
    );
  };

  return (
    <View style={{ height: '90%', overflow: 'scroll' }}>
      <FlatList
        data={filteredPlaces}
        renderItem={renderItem}
        keyExtractor={item => item.place_id}
      />
    </View>
  );
}
