import {NavigationContainer} from "@react-navigation/native";
import {createDrawerNavigator} from "@react-navigation/drawer";
import CustomNavigationDrawer from "../../components/CustomNavigationDrawer";
import {large, useBreakpoint} from "../../hooks/useBreakpoint";
import HomeStack from "./HomeStack";
import {isBig} from "../../hooks/isBig";
import ProfileStack from "./ProfileStack";
import EventsStack from "./EventsStack";

const Drawer = createDrawerNavigator();

const InAppNavigation = (props) => {
    const breakpoint = useBreakpoint();

    const linking = {
        config: {
            screens: {
                initialRouteName: 'Home',
                Home:
                    {
                        initialRouteName: 'HomeScreen',
                        screens:
                            {
                                HomeScreen: '/home'
                            }
                    },
                Profile:
                    {
                        initialRouteName: 'ProfileScreen',
                        screens:
                            {
                                ProfileScreen: '/profile',
                            }
                    },
                Events:
                    {
                        initialRouteName: 'EventsScreen',
                        screens:
                            {
                                EventsScreen: '/events',
                                SingleEventScreen: '/event',
                                CreateEventScreen: '/createEvent',
                            }
                    }
            }
        }
    }

    return (
        <NavigationContainer linking={linking}>
            <Drawer.Navigator
                screenOptions={{
                    headerShown: false,
                    drawerPosition: 'right',
                    drawerType: isBig() ? 'permanent' : 'back'
                }}
                initialRouteName="Home"
                drawerContent={(props) => <CustomNavigationDrawer {...props} />}
            >
                <Drawer.Screen name='Home' component={HomeStack}/>
                <Drawer.Screen name='Profile' component={ProfileStack}/>
                <Drawer.Screen name='Events' component={EventsStack}/>
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

export default InAppNavigation;