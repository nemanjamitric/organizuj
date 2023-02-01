import {NavigationContainer} from "@react-navigation/native";
import WelcomeScreen from "../screens/preLoginScreens/WelcomeScreen";
import {createDrawerNavigator} from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

const LoginNavigation = (props) => {
    return(
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="WelcomeScreen">
                <Drawer.Screen name='WelcomeScreen' component={WelcomeScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

export default LoginNavigation;