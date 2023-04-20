import React, { useState } from "react";
import * as Font from "expo-font";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import AppNavigator from './frontroutes/appnav';
import { createAppContainer } from 'react-navigation';


const AppContainer = createAppContainer(AppNavigator)

export default function App() {
  return (

    <AppContainer 
    
    
    />
  );
  }
