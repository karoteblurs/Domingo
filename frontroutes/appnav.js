import { createStackNavigator } from 'react-navigation-stack';
import Home from "../screens/home";
import Categorylist from "../screens/categorylist";
import Entrydetails from "../screens/entrydetails";
import RollingText from "react-native-rolling-text";
import { View } from "react-native"

const headerTitle = () => (
  //<View style={{ flex: 1, width: "80%", overflow: 'hidden', alignItems: "center"}}>
    <RollingText style={{ overflow: 'hidden', color: "white", fontFamily: "Arial Rounded MT Bold", textAlign: "center"}}>
      {"                                                                                               What are you looking for?                                   Que cherches-tu?                                   ¿Qué estás buscando?                                   Cosa stai cercando?                                   Waar ben je naar op zoek?                                   Что ты ищешь?"}
    </RollingText>
  //</View>
);

const AppNavigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      headerTitle,
      headerStyle: {
        backgroundColor: "black"
      },
      
    },
  },
  Categorylist: {
    screen: Categorylist,
    navigationOptions: {
      headerTitle,
      headerStyle: {
        backgroundColor: "black", 
       },
       headerLeft: () => null
    },
  },
  Entrydetails: {
    screen: Entrydetails,
    navigationOptions: {
      headerTitle,
    },
  },
});
// import { createStackNavigator } from '@react-navigation/stack';

// const { Navigator, Screen} = createStackNavigator();

// const AppNavigator = function () {
//     return (
//         <Navigator>
//             <Screen name='Home' component={Home} />
//             <Screen name='Categorylist' component={Categorylist} />
//             <Screen name='Entrydetails' component={Entrydetails} />
//         </Navigator>
//     )
// }

export default AppNavigator;