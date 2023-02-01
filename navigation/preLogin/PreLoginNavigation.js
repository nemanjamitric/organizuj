import {NavigationContainer} from "@react-navigation/native";
import WelcomeScreen from "../../screens/preLoginScreens/WelcomeScreen";
import {createDrawerNavigator} from "@react-navigation/drawer";
import CustomNavigationDrawer from "../../components/CustomNavigationDrawer";
import LoginStack from "./LoginStack";
import WelcomeStack from "./WelcomeStack";

const Drawer = createDrawerNavigator();

const PreLoginNavigation = (props) => {
    return(
        <NavigationContainer>
            <Drawer.Navigator
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName="Welcome Stack"
                drawerContent={(props) => <CustomNavigationDrawer {...props} />}
            >
                <Drawer.Screen name='Welcome Stack' component={WelcomeStack} />
                <Drawer.Screen name='Login Stack' component={LoginStack} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

export default PreLoginNavigation;