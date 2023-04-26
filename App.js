import React from "react";
import AppNavigator from './frontroutes/appnav';
import { createAppContainer } from 'react-navigation';
import { store } from "./redux/store";
import { Provider } from "react-redux";


const AppContainer = createAppContainer(AppNavigator)

export default function App() {
  
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
  }
