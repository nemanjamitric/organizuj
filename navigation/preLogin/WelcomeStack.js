import CustomNavigationDrawer from "../../components/CustomNavigationDrawer";
import WelcomeScreen from "../../screens/preLoginScreens/WelcomeScreen";
import LoginScreen from "../../screens/preLoginScreens/LoginScreen";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import CustomNavigationBar from "../../components/CustomNavigationBar";

const Stack = createNativeStackNavigator();

const WelcomeStack = () => {
    return(
        <Stack.Navigator
            initialRouteName="Welcome Screen"
            screenOptions={{
                header: props => <CustomNavigationBar {...props} />
            }}
        >
            <Stack.Screen
                name='WelcomeScreen'
                component={WelcomeScreen}
                options={{title: "Welcome Screen"}}
            />
            <Stack.Screen
                name='LoginScreen'
                component={LoginScreen}
                options={{title: "Welcome Screen"}}
            />
        </Stack.Navigator>
    )
}

export default WelcomeStack;