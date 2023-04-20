import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button, Modal } from "react-native";
import MapView from "react-native-maps";
import Map from "./modals/map";
import * as Location from 'expo-location';

export default function Home({ navigation }) {
    
    const [isMapModalOpen, setIsMapModalOpen] = useState(false)
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

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

    return ( 
        <View><Text>What are you looking for?</Text>
            <Button title="Search by Category" onPress={() => navigation.navigate("Categorylist")} />
            <Button title="Search in the Map" onPress={() => setIsMapModalOpen(true)} />
            <Modal visible={isMapModalOpen}>
                <Map location={location} style={{ flex: 1 }} />
                <Button title="Close Map" onPress={() => setIsMapModalOpen(false)} />
            </Modal>
        </View>
    )
}