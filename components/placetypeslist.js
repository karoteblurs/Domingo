import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useSelector } from 'react-redux';

export default function PlaceTypesList({ navigation, }) {
  const placeTypes = useSelector(state => state.placeTypes);
  const places = useSelector(state => state.places);
  

  // Use a Set to keep track of unique place types
  const uniquePlaceTypes = new Set();

  console.log(uniquePlaceTypes)
  
  placeTypes.forEach(place => {
    place.types.forEach(type => {
      uniquePlaceTypes.add(type);
      // console.log(type)
    })
  });

  // Convert Set back to an array for rendering
  const uniquePlaceTypesArray = Array.from(uniquePlaceTypes);
  const renderItem = ({ item }) => {
    const itemName = item.replace(/_/g, ' ');
    // Get places that match the selected category
      const filteredPlaces = places.filter(place => {
        return place.types.includes(item)})

       
    
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>{itemName}</Text>
        <TouchableOpacity
          style={styles.buttonContainer}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Categorylist', { type: item,})}
        >
          <Text style={styles.buttonText}>{`View ${filteredPlaces.length === 1 ? '1 Place' : `${filteredPlaces.length} Places`}`}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ height: '87%', overflow: 'scroll' }}>
      
      <FlatList
        data={uniquePlaceTypesArray}
        renderItem={renderItem}
        keyExtractor={item => item}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: 'black',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 2,
    elevation: 7,
    transform: [
      { perspective: 1000 },
      { rotateX: '-1deg' },
      { rotateY: '-0.2deg' },
    ],
  },
  itemText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(144,238,144)',
    borderRadius: 20,
    paddingVertical: 7,
    paddingHorizontal: 15,
    marginLeft: 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.05,
    fontFamily: 'System',
  },
});