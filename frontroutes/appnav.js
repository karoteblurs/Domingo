import { createStackNavigator } from 'react-navigation-stack';
import Home from "../screens/home";
import Categorylist from "../screens/categorylist";
import Entrydetails from "../screens/entrydetails";


const AppNavigator = createStackNavigator({
    Home: {
        screen: Home
    },
    Categorylist: {
        screen: Categorylist
    },
    Entrydetails: {
        screen: Entrydetails
    },
});

export default AppNavigator;