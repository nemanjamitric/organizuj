import {NavigationContainer} from "@react-navigation/native";
import CustomNavigationDrawer from "../../components/CustomNavigationDrawer";
import WelcomeScreen from "../../screens/preLoginScreens/WelcomeScreen";
import LoginScreen from "../../screens/preLoginScreens/LoginScreen";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const LoginStack = () => {
    return(
            <Stack.Navigator
                initialRouteName="Welcome Screen"
                drawerContent={(props) => <CustomNavigationDrawer {...props} />}
            >
                <Stack.Screen name='Welcome Screen' component={WelcomeScreen} />
                <Stack.Screen name='Login Screen' component={LoginScreen} />
            </Stack.Navigator>
    )
}

export default LoginStack;