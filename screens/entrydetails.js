//Can be expanded upon, currently not used


import React from "react";
import { View, Text, FlatList } from "react-native";

export default function PlaceList({ route }) {
  const { places } = route.params;

  return (
    <View>
      <FlatList
        data={places}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
          </View>
        )}
        keyExtractor={item => item.place_id}
      />
    </View>
  );
}