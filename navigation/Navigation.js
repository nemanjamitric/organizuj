import {NavigationContainer} from "@react-navigation/native";
import WelcomeScreen from "../screens/preLoginScreens/WelcomeScreen";
import {createDrawerNavigator} from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

const Navigation = (props) => {
    return(
        <NavigationContainer>
            <Drawer.Navigator>
                <Drawer.Screen name='WelcomeScreen' component={WelcomeScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;