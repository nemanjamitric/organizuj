import {createNativeStackNavigator} from "@react-navigation/native-stack";
import CustomNavigationBar from "../../components/CustomNavigationBar";
import HomeScreen from "../../screens/userScreens/HomeScreen";
import SingleEventScreen from "../../screens/userScreens/SingleEventScreen";
import CreateEventScreen from "../../screens/userScreens/CreateEventScreen";

const Stack = createNativeStackNavigator();

const WelcomeStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="HomeScreen"
            screenOptions={{
                header: props => <CustomNavigationBar {...props} />
            }}
        >
            <Stack.Screen
                name='HomeScreen'
                component={HomeScreen}
                options={{title: "Home"}}
            />
            <Stack.Screen
                name='SingleEventScreen'
                component={SingleEventScreen}
                options={{title: "Događaj"}}
            />
            <Stack.Screen
                name='CreateEventScreen'
                component={CreateEventScreen}
                options={{title: "Kreiraj događaj"}}
            />
        </Stack.Navigator>
    )
}

export default WelcomeStack;