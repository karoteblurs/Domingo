import React from "react";
import { StyleSheet, View, Text, Button, SafeAreaView, FlatList } from "react-native";


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