import React, { useEffect } from "react";
import { StyleSheet, View, Text, Button, SafeAreaView, FlatList } from "react-native";

import { useSelector } from 'react-redux';


const DATA = [
    {},
    {},
    {},
]

const Item = () => {
    return (
        console.log("hi")
    )
}

const Categorylist = ( {navigation}) => {

    const placesWhatever = useSelector(state => state.places);

    useEffect(() => {
        console.log('places in categroy : ', places)
    }, [places])

    return ( 

        <SafeAreaView styles = {styles.container}>
        <View><Text>Category List</Text>
        <FlatList
        data = {DATA}
        />
        <Button title = "View entry" 
        onPress = {() => navigation.navigate("Entrydetails")}/>
        
        </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})


export default Categorylist;