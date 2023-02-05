import {createNativeStackNavigator} from "@react-navigation/native-stack";
import CustomNavigationBar from "../../components/CustomNavigationBar";
import HomeScreen from "../../screens/userScreens/HomeScreen";
import SingleEventScreen from "../../screens/userScreens/SingleEventScreen";
import CreateEventScreen from "../../screens/userScreens/CreateEventScreen";
import EventsScreen from "../../screens/userScreens/EventsScreen";

const Stack = createNativeStackNavigator();

const EventsStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="EventsScreen"
            screenOptions={{
                header: props => <CustomNavigationBar {...props} />
            }}
        >
            <Stack.Screen
                name='EventsScreen'
                component={EventsScreen}
                options={{title: "Events"}}
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

export default EventsStack;